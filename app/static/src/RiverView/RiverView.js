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
        }
    })





}



DrawRiverView()