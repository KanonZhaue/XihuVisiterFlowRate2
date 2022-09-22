function DrawRiverView() {
    var RiverViewSvg = d3.select('#RiverViewSvg')
    var stack = d3.stack()
    d3.csv('./data/checkdata.csv', function (error, data) {
        console.log(data)
        var riverData = [],max=0

        var startTime = new Date(UIList.startTime).setHours(new Date(UIList.startTime).getHours() + new Date(UIList.startTime).getTimezoneOffset() / 60)
        var endTime = new Date(new Date(UIList.endTime).setDate(new Date(UIList.endTime).getDate() + 1)).setHours(new Date(UIList.endTime).getHours() + new Date(UIList.endTime).getTimezoneOffset() / 60)
        for (i = 0; i < data.length; i++) {
            if (new Date(data[i].time) <= endTime && new Date(data[i].time) >= startTime){

                total = parseFloat(data[i].ren1)+parseFloat(data[i].ren2)+parseFloat(data[i].ren3)+parseFloat(data[i].ren4)+parseFloat(data[i].ren5)+parseFloat(data[i].ren6)
                if(max<total)
                    max = total
                riverData.push(data[i])
            }
                
        }
        var RiverXScale = d3.scaleTime()
            .domain([startTime, endTime])
            .range([0, 700])
        var RiverYScale = d3.scaleLinear()
            .domain([0, max])
            .range([200, 0])
        RiverViewSvg.append("g")
            .attr("transform", "translate(50,250)")
            .call(d3.axisBottom(RiverXScale));

        RiverViewSvg.append("g")
            .attr("transform", "translate(50,50)")
            .call(d3.axisLeft(RiverYScale));

        var RiverGenerator1 = d3.area()
            .x((p) => RiverXScale(new Date(p.time)))
            .y0((p) => RiverYScale(0))
            .y1((p) => RiverYScale(parseFloat(p.ren1)))
        var RiverGenerator2 = d3.area()
            .x((p) => RiverXScale(new Date(p.time)))
            .y0((p) => RiverYScale(parseFloat(p.ren1)))
            .y1((p) => RiverYScale(parseFloat(p.ren1) + parseFloat(p.ren2)))
        var RiverGenerator3 = d3.area()
            .x((p) => RiverXScale(new Date(p.time)))
            .y0((p) => RiverYScale(parseFloat(p.ren1) + parseFloat(p.ren2)))
            .y1((p) => RiverYScale(parseFloat(p.ren1) + parseFloat(p.ren2) + parseFloat(p.ren3)))
            var RiverGenerator4 = d3.area()
            .x((p) => RiverXScale(new Date(p.time)))
            .y0((p) => RiverYScale(parseFloat(p.ren1) + parseFloat(p.ren2) + parseFloat(p.ren3)))
            .y1((p) => RiverYScale(parseFloat(p.ren1) + parseFloat(p.ren2) + parseFloat(p.ren3) + parseFloat(p.ren4)))
            var RiverGenerator5 = d3.area()
            .x((p) => RiverXScale(new Date(p.time)))
            .y0((p) => RiverYScale(parseFloat(p.ren1) + parseFloat(p.ren2) + parseFloat(p.ren3)+ parseFloat(p.ren4)))
            .y1((p) => RiverYScale(parseFloat(p.ren1) + parseFloat(p.ren2) + parseFloat(p.ren3) + parseFloat(p.ren4)+ parseFloat(p.ren5)))

            var RiverGenerator6 = d3.area()
            .x((p) => RiverXScale(new Date(p.time)))
            .y0((p) => RiverYScale(parseFloat(p.ren1) + parseFloat(p.ren2) + parseFloat(p.ren3)+ parseFloat(p.ren4)+ parseFloat(p.ren5)))
            .y1((p) => RiverYScale(parseFloat(p.ren1) + parseFloat(p.ren2) + parseFloat(p.ren3) + parseFloat(p.ren4)+ parseFloat(p.ren5)+ parseFloat(p.ren6)))





        var River1 = RiverViewSvg.append('path')
            .attr('d', RiverGenerator1(riverData))
            .attr('fill', 'rgba(255,0,0,0.2)')
            .attr('transform', 'translate(50,50)')
            .on('mouseover',function(){
                console.log(1)
            })

        var River2 = RiverViewSvg.append('path')
            .attr('d', RiverGenerator2(riverData))
            .attr('fill', 'rgba(255,165,0,0.2)')
            .attr('transform', 'translate(50,50)')
        var River3 = RiverViewSvg.append('path')
            .attr('d', RiverGenerator3(riverData))
            .attr('fill', 'rgba(255,255,0,0.2)')
            .attr('transform', 'translate(50,50)')
        var River4 = RiverViewSvg.append('path')
            .attr('d', RiverGenerator4(riverData))
            .attr('fill', 'rgba(0,255,0,0.2)')
            .attr('transform', 'translate(50,50)')
        var River5 = RiverViewSvg.append('path')
            .attr('d', RiverGenerator5(riverData))
            .attr('fill', 'rgba(0,0,255,0.2)')
            .attr('transform', 'translate(50,50)')
        var River6 = RiverViewSvg.append('path')
            .attr('d', RiverGenerator6(riverData))
            .attr('fill', 'rgba(128,0,128,0.2)')
            .attr('transform', 'translate(50,50)')
        for(i=0;i<riverData.length-1;i++){
            RiverViewSvg
            .append('line')
            .attr('class','RiverLines1')
            .attr('x1',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('x2',function(){return RiverXScale(new Date(riverData[i+1].time))+50})
            .attr('y1',function(){return RiverYScale(parseFloat(riverData[i  ].ren1))+50})
            .attr('y2',function(){return RiverYScale(parseFloat(riverData[i+1].ren1))+50})
            .attr('stroke-width','2px')
            .attr('stroke','rgba(255,0,0,1)')
            RiverViewSvg
            .append('line')
            .attr('class','RiverLines2')
            .attr('x1',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('x2',function(){return RiverXScale(new Date(riverData[i+1].time))+50})
            .attr('y1',function(){return RiverYScale(parseFloat(riverData[i  ].ren2)+parseFloat(riverData[i  ].ren1))+50})
            .attr('y2',function(){return RiverYScale(parseFloat(riverData[i+1].ren2)+parseFloat(riverData[i+1].ren1))+50})
            .attr('stroke-width','2px')
            .attr('stroke','rgba(255,165,0)')
            RiverViewSvg
            .append('line')
            .attr('class','RiverLines3')
            .attr('x1',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('x2',function(){return RiverXScale(new Date(riverData[i+1].time))+50})
            .attr('y1',function(){return RiverYScale(parseFloat(riverData[i  ].ren3)+parseFloat(riverData[i  ].ren2)+parseFloat(riverData[i  ].ren1))+50})
            .attr('y2',function(){return RiverYScale(parseFloat(riverData[i+1].ren3)+parseFloat(riverData[i+1].ren2)+parseFloat(riverData[i+1].ren1))+50})
            .attr('stroke-width','2px')
            .attr('stroke','rgba(255,255,0)')
            RiverViewSvg
            .append('line')
            .attr('class','RiverLines4')
            .attr('x1',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('x2',function(){return RiverXScale(new Date(riverData[i+1].time))+50})
            .attr('y1',function(){return RiverYScale(parseFloat(riverData[i  ].ren4)+parseFloat(riverData[i  ].ren3)+parseFloat(riverData[i  ].ren2)+parseFloat(riverData[i  ].ren1))+50})
            .attr('y2',function(){return RiverYScale(parseFloat(riverData[i+1].ren4)+parseFloat(riverData[i+1].ren3)+parseFloat(riverData[i+1].ren2)+parseFloat(riverData[i+1].ren1))+50})
            .attr('stroke-width','2px')
            .attr('stroke','rgba(0,255,0)')
            RiverViewSvg
            .append('line')
            .attr('class','RiverLines5')
            .attr('x1',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('x2',function(){return RiverXScale(new Date(riverData[i+1].time))+50})
            .attr('y1',function(){return RiverYScale(parseFloat(riverData[i  ].ren5)+parseFloat(riverData[i  ].ren4)+parseFloat(riverData[i  ].ren3)+parseFloat(riverData[i  ].ren2)+parseFloat(riverData[i  ].ren1))+50})
            .attr('y2',function(){return RiverYScale(parseFloat(riverData[i+1].ren5)+parseFloat(riverData[i+1].ren4)+parseFloat(riverData[i+1].ren3)+parseFloat(riverData[i+1].ren2)+parseFloat(riverData[i+1].ren1))+50})
            .attr('stroke-width','2px')
            .attr('stroke','rgba(0,0,255)')
            RiverViewSvg
            .append('line')
            .attr('class','RiverLines6')
            .attr('x1',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('x2',function(){return RiverXScale(new Date(riverData[i+1].time))+50})
            .attr('y1',function(){return RiverYScale(parseFloat(riverData[i  ].ren6)+parseFloat(riverData[i  ].ren5)+parseFloat(riverData[i  ].ren4)+parseFloat(riverData[i  ].ren3)+parseFloat(riverData[i  ].ren2)+parseFloat(riverData[i  ].ren1))+50})
            .attr('y2',function(){return RiverYScale(parseFloat(riverData[i+1].ren6)+parseFloat(riverData[i+1].ren5)+parseFloat(riverData[i+1].ren4)+parseFloat(riverData[i+1].ren3)+parseFloat(riverData[i+1].ren2)+parseFloat(riverData[i+1].ren1))+50})
            .attr('stroke-width','2px')
            .attr('stroke','rgba(128,0,128)')
        }
        for(i=0;i<riverData.length;i++){
            RiverViewSvg
            .append('circle')
            .attr('class','RiverCircle1')
            .attr('cx',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('cy',function(){return RiverYScale(parseFloat(riverData[i  ].ren1))+50})
            .attr('r','3px')
            .attr('stroke-width','2px')
            .attr('fill','white')
            .attr('stroke','rgba(255,0,0,1)')
            RiverViewSvg
            .append('circle')
            .attr('class','RiverCircle2')
            .attr('cx',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('cy',function(){return RiverYScale(parseFloat(riverData[i  ].ren2)+parseFloat(riverData[i  ].ren1))+50})
            .attr('r','3px')
            .attr('fill','white')
            .attr('stroke-width','2px')
            .attr('stroke','rgba(255,165,0)')
            RiverViewSvg
            .append('circle')
            .attr('class','RiverCircle3')
            .attr('cx',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('cy',function(){return RiverYScale(parseFloat(riverData[i  ].ren3)+parseFloat(riverData[i  ].ren2)+parseFloat(riverData[i  ].ren1))+50})
            .attr('r','3px')
            .attr('fill','white')
            .attr('stroke-width','2px')
            .attr('stroke','rgba(255,255,0)')
            RiverViewSvg
            .append('circle')
            .attr('class','RiverCircle4')
            .attr('cx',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('cy',function(){return RiverYScale(parseFloat(riverData[i  ].ren4)+parseFloat(riverData[i  ].ren3)+parseFloat(riverData[i  ].ren2)+parseFloat(riverData[i  ].ren1))+50})
            .attr('r','3px')
            .attr('stroke-width','2px')
            .attr('fill','white')
            .attr('stroke','rgba(0,255,0)')
            RiverViewSvg
            .append('circle')
            .attr('class','RiverCircle5')
            .attr('cx',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('cy',function(){return RiverYScale(parseFloat(riverData[i  ].ren5)+parseFloat(riverData[i  ].ren4)+parseFloat(riverData[i  ].ren3)+parseFloat(riverData[i  ].ren2)+parseFloat(riverData[i  ].ren1))+50})
            .attr('r','3px')
            .attr('stroke-width','2px')
            .attr('fill','white')
            .attr('stroke','rgba(0,0,255)')
            RiverViewSvg
            .append('circle')
            .attr('class','RiverCircle6')
            .attr('cx',function(){return RiverXScale(new Date(riverData[i].time))+50})
            .attr('cy',function(){return RiverYScale(parseFloat(riverData[i  ].ren6)+parseFloat(riverData[i  ].ren5)+parseFloat(riverData[i  ].ren4)+parseFloat(riverData[i  ].ren3)+parseFloat(riverData[i  ].ren2)+parseFloat(riverData[i  ].ren1))+50})
            .attr('r','3px')
            .attr('stroke-width','2px')
            .attr('fill','white')
            .attr('stroke','rgba(128,0,128)')
        }
        
    })
}

DrawRiverView()