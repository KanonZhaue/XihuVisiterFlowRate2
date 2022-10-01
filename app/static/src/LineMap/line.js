var LineSvg = d3.select("#linesSvg")


function DrawLineMap(index1){
d3.dsv(',','./data/checkdata4.csv',function(data){return data})
.then(function(alldata){
    console.log(alldata)
    data = alldata.filter(item => item.tp == Object.keys(xihushijing)[index1])
    console.log(data)
    var scaleLength = 340,scaleSpace=160,colorBarWidth=40,scaleTop=20,LineBarWidth=scaleLength/200;
    var LineColorScaleAlpha = d3.scaleLinear()
        .domain([0, 0.5, 1])
        .range(['rgba(0,255,0,0.1)', 'rgba(255,140,0,0.1)', 'rgba(255,215,0,0.1)'])
    var LineColorScale = d3.scaleLinear()
        .domain([0, 0.5, 1])
        .range(['rgba(0,255,0,1)', 'rgba(255,140,0,1)', 'rgba(255,215,0,1)'])
    var LineSexScale = d3.scaleBand()
        .domain(['M','F'])
        .range([scaleLength, 0])

    var LineEduScale = d3.scaleBand()
        .domain(['初中','高中','大学','大学及以上'])
        .range([scaleLength, 0])


    var LineIncomeScale = d3.scaleLinear()
        .domain([0, 50000])
        .range([scaleLength, 0])


    var LinePiPeiScale = d3.scaleLinear()
        .domain([0,1])
        .range([scaleLength, 0])

    var LineSexAxis = d3.axisRight(LineSexScale)
    var LineEduAxis = d3.axisRight(LineEduScale)
    var LineIncomeAxis = d3.axisRight(LineIncomeScale)
    var LinePipeiAxis = d3.axisRight(LinePiPeiScale)
    
    var gLineSexAxis = LineSvg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${colorBarWidth + scaleSpace * 0},${scaleTop})`)
        .call(LineSexAxis)
    var gLineEduAxis = LineSvg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${colorBarWidth + scaleSpace * 1},${scaleTop})`)
        .call(LineEduAxis)
    var gLineIncomeAxis = LineSvg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${colorBarWidth + scaleSpace * 2},${scaleTop})`)
        .call(LineIncomeAxis)
    var gLinePipeiAxis = LineSvg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${colorBarWidth + scaleSpace * 3},${scaleTop})`)
        .call(LinePipeiAxis)
    var LineColorBar = LineSvg.selectAll('.LineColorBar')
        .data(new Array(200))
        .join('line')
        .attr('class', 'LineColorBar')
        .attr('x1', 5)
        .attr('x2', 35)
        .attr('y1', function (d, i) {
            return i * LineBarWidth + scaleTop
        })
        .attr('y2', function (d, i) {
            return i * LineBarWidth + scaleTop
        })
        // .attr('')
        .attr('stroke', function (d, i) {
            return LineColorScale(1-i/200)
        })
        var LinePath = LineSvg.selectAll('.LinePath')
            .data(data)
            .join('path')
            .attr('class', 'LinePath')
            .attr('d', function (d, i) {
                return `M${colorBarWidth + scaleSpace * 0} ${LineSexScale(d['sex']) + scaleTop+85} L${colorBarWidth + scaleSpace * 1} ${LineEduScale(d['edu']) + scaleTop+45 } L${colorBarWidth + scaleSpace * 2} ${LineIncomeScale(parseFloat(d['income'])) + scaleTop} L${colorBarWidth + scaleSpace * 3} ${LinePiPeiScale(parseFloat(d['pipei'])) + scaleTop} `
            })
            .attr('stroke-width', 1)
            .attr('fill', 'none')
            .attr('stroke', function (d, i) {
                return LineColorScaleAlpha((parseFloat(d['pipei'])))
            })
} )
    
}
DrawLineMap()