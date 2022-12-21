var PointSvg = d3.select("#PointSvg")

function DrawPointsMap() {
    var data = {
        data: JSON.stringify(UIDataList)
    }
    $.ajax({
        type: "POST",
        url: "/getPointsData",
        dataType: "json",
        data: data,
        success: function (d) {
            console.log(d)
            var pointdata = d
            var XscaleLen = 400, YscaleLen = 400, MapTop = 50, MapLeft = 50
            var PointsXscale = d3.scaleLinear()
                .domain([
                    Math.min.apply(Math, pointdata.map(item => { return item.x })),
                    Math.max.apply(Math, pointdata.map(item => { return item.x }))])
                .range([0, XscaleLen])
            var PointsYscale = d3.scaleLinear()
                .domain([
                    Math.max.apply(Math, pointdata.map(item => { return item.y })),
                    Math.min.apply(Math, pointdata.map(item => { return item.y }))])
                .range([0, YscaleLen])
            var PointXAxis = d3.axisBottom(PointsXscale)
            var PointYAxis = d3.axisLeft(PointsYscale)
            var gPointXAxis = PointSvg.append("g")
                .attr("class", 'axis')
                .attr('transform', `translate(${MapLeft},${MapTop + YscaleLen})`)
                .call(PointXAxis)
            var gPointYAxis = PointSvg.append("g")
                .attr("class", 'axis')
                .attr('transform', `translate(${MapLeft},${MapTop})`)
                .call(PointYAxis)
            var TypeColor = ['rgba(255,140,0,1)', 'rgba(255,215,0,1)', 'rgba(128,0,128)', 'rgba(255,0,0,1)', 'rgba(0,255,255,1)', 'rgba(60,179,13)', 'rgba(20,144,255)']
            var TypeText = ['Classic sights', 'Museum', 'temples', 'mountain', 'Modern landscape', 'Art Gallery', 'Park']

            for (i = 0; i < pointdata.length; i++) {
                PointSvg.append("circle")
                    .attr('class', 'pointCircles')

                    .attr('id',`${i}`)
                    .attr('cx', `${PointsXscale(pointdata[i].x) + MapLeft}`)
                    .attr('cy', `${PointsYscale(pointdata[i].y) + MapTop}px`)
                    .attr('r', '5px')
                    .attr('fill', TypeColor[parseInt(pointdata[i].label) - 1])
                    .text(i)
                    .on('click',function(d){
                        let clickName = pointdata[parseInt(d['path'][0]['id'])].name
                        let indexss = Object.keys(sight2).indexOf(clickName)
                        UIDataList.RadarIndex = indexss
                        DrawRadarMap(indexss)
                    })

                console.log(pointdata[i].name)
            }
            for (i = 0; i < TypeColor.length; i++) {
                PointSvg.append('rect')
                    .attr('class', 'pointRects')
                    .attr('x', `${480}px`)
                    .attr('y', `${i * 30 + 190}px`)
                    .attr('width', '10px')
                    .attr('height', '10px')
                    .attr('fill', TypeColor[i])
                PointSvg.append('text')
                    .attr('class', 'pointTexts')
                    .attr('x', `${500}px`)
                    .attr('y', `${i * 30 + 200}px`)
                    .text(() => {
                        return TypeText[i]
                    })
            }
        }
    })


    // d3.dsv(",","./data/points.csv",function(data){return data})
    // .then(function(pointdata){


    //     }

    // })
}
DrawPointsMap()