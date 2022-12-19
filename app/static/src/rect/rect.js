var rectSvg = d3.select('#rectSvg')
const NameList = [], valueLists = []

function DrawRectMap() {
    rectSvg.selectAll('.axis').remove()
    rectSvg.selectAll('rect').remove()
    rectSvg.selectAll('text').remove()
    var data = {
        data: JSON.stringify(UIDataList)
    }
    $.ajax({
        type: "POST",
        url: "/getRectData",
        dataType: "json",
        data: data,
        success: function (d) {
            console.log(d)
            RectData = d.data
            console.log(RectData)
            RectData2 = []
            var columnsss = 8
            for (let i = 0; i < RectData.length; i++) {
                RectData2.push({ "index": i, "rectValue": RectData[i] })
            }
            console.log(RectData2)
            var TopData = Object.keys(RectData2).sort(function (a, b) {
                return parseFloat(RectData2[b].rectValue) - parseFloat(RectData2[a].rectValue)
            })
            var Top5Data = TopData.splice(0, columnsss)
            console.log(Top5Data)
            for (i = 0; i < Top5Data.length; i++) {
                NameList.push(Object.keys(sight2)[Top5Data[i]])
                valueLists.push(RectData2[Top5Data[i]].rectValue)
            }
            console.log(NameList, valueLists)
            var XscaleLen = 300, YscaleLen = 300, MapTop = 30, RectMapLeft = 30
            var RectsXscale = d3.scaleLinear()
                .domain([
                    0,
                    Math.max.apply(Math, valueLists.map(item => { return item }))])
                .range([0, XscaleLen])
            var RectsYscale = d3.scaleBand()
                .domain(new Array(NameList.length))
                .range([0, YscaleLen])
            console.log(valueLists)
            var RectXAxis = d3.axisTop(RectsXscale)
            var RectYAxis = d3.axisLeft(RectsYscale)
            var gRecttXAxis = rectSvg.append("g")
                .attr("class", 'axis')
                .attr('transform', `translate(${RectMapLeft},${MapTop})`)
                .call(RectXAxis)
            var gRectYAxis = rectSvg.append("g")
                .attr("class", 'axis')
                .attr('transform', `translate(${RectMapLeft},${MapTop})`)
                .call(RectYAxis)

            console.log(valueLists)

            for (let i = 0; i < columnsss; i++) {
                rectSvg.append("rect")
                    .attr('x', `${MapTop + 1}px`)
                    .attr('y', `${(30 + 300 * i / columnsss)}px`)
                    .attr('width', `${(parseFloat(RectsXscale(valueLists[i])))}px`)
                    .attr("height", `${300 * 1 / columnsss - 10}`)
                    .attr('fill', sight2[(NameList[i])].color)
                rectSvg.append('text')
                    .attr('class', 'RectTexts')
                    .attr('x', `${MapTop + 1}px`)
                    .attr('y', `${(50 + 300 * i / columnsss)}px`)
                    .text(() => {
                        return NameList[i]
                    })

            }

        }
    })



}
DrawRectMap()