var RiverData



function DrawRiverView() {
    var RiverViewSvg = d3.select('#stackSvg')
    RiverViewSvg.selectAll(".riverPaths").remove()
    RiverViewSvg.selectAll('.axis').remove()

    var stack = d3.stack()
    var data = {
        data: JSON.stringify(UIDataList)
    }
    $.ajax({
        type: "POST",
        url: "/getRiverData",
        dataType: "json",
        data: data,
        success: function (d) {
            console.log(d)
            RiverData = d.data
            data = d.data
            var max = 0
            for (j = 0; j < data.length; j++) {
                total = 0
                for (i = 0; i < 36; i++) {
                    total += parseFloat(data[j][i + 1])
                }
                if (total > max)
                    max = total
            }
            console.log(max)
            var RiverXScale = d3.scaleLinear()
                .domain([1, data.length])
                .range([0, 700])
            var RiverYScale = d3.scaleLinear()
                .domain([0, max])
                .range([300, 0])
            RiverViewSvg.append("g")
                .attr("transform", "translate(50,350)")
                .attr('class','axis')
                .call(d3.axisBottom(RiverXScale));

            RiverViewSvg.append("g")
                .attr('class','axis')
                .attr("transform", "translate(50,50)")
                .call(d3.axisLeft(RiverYScale));

            for (i = 0; i < 36; i++) {
                var RiverGenerator = d3.area()
                    .x((p) => RiverXScale(parseInt(p[0])))
                    .y0((p) => {
                        returnData = 0
                        for (j = 1; j <= i; j++) {
                            returnData += (parseFloat(p[(j)]))
                        }
                        return RiverYScale(returnData)
                    })
                    .y1((p) => {
                        returnData = 0
                        for (j = 1; j <= i + 1; j++) {
                            returnData += (parseFloat(p[(j)]))
                        }
                        return RiverYScale(returnData)
                    })
                RiverViewSvg.append('path')
                    .attr('d', RiverGenerator(data))
                    .attr('class','riverPaths')
                    .attr('fill', sight2[Object.keys(sight2)[i]].color)
                    .attr('transform', 'translate(50,50)')
                
                

                
            }
            for(let i=0;i<data.length;i++){
                RiverViewSvg.append("line")
                    .attr('x1',700/data.length*i+50)
                    .attr('x2',700/data.length*i+50)
                    .attr('y1',50)
                    .attr('y2',350)
                    .attr('class','River2MapLines')
                    .attr('stroke','white')
                    .attr("lineIndex",i)
                    .attr('opacity',0)
                    .attr('stroke-width','3px')
                    // .attr('visibility','hidden')
                    .on('mouseover',function(e){
                        
                        console.log(e,this)
                        let indexZja = e.target.attributes.lineIndex.value
                        console.log(indexZja)
                        console.log(RiverData[indexZja])
                       
                        console.log(map.getSource("FlowRate")._data);
                        var RiverReturnData = map.getSource("FlowRate")._data
                        for(let i=1;i<RiverData[indexZja].length;i++){
                            RiverReturnData.features[i-1].properties.dbh = RiverData[indexZja][i]
                        }
                        console.log(RiverReturnData)
                        map.getSource("FlowRate").setData(RiverReturnData)

                        this.setAttribute('opacity','1')
                    })
                    .on('mouseout',function(){
                        this.setAttribute('opacity',"0")
                    })

            }
        }
    })





}



DrawRiverView()