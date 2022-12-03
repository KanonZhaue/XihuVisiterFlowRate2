var PointSvg = d3.select("#PointSvg")

function DrawPointsMap(){
    d3.dsv(",","./data/points.csv",function(data){return data})
    .then(function(pointdata){
        console.log(pointdata);
        var XscaleLen = 500,YscaleLen = 400,MapTop = 50,MapLeft =50
        var PointsXscale = d3.scaleLinear()
            .domain([
                Math.min.apply(Math,pointdata.map(item => { return item.x })),
                Math.max.apply(Math,pointdata.map(item => { return item.x }))])
            .range([0,XscaleLen])
        var PointsYscale = d3.scaleLinear()
            .domain([
                Math.max.apply(Math,pointdata.map(item => { return item.y })),
                Math.min.apply(Math,pointdata.map(item => { return item.y }))])
            .range([0,YscaleLen])
        var PointXAxis = d3.axisBottom(PointsXscale)
        var PointYAxis = d3.axisLeft(PointsYscale)
        var gPointXAxis = PointSvg.append("g")
                .attr("class",'axis')
                .attr('transform',`translate(${MapLeft},${MapTop+YscaleLen})`)
                .call(PointXAxis)
        var gPointYAxis = PointSvg.append("g")
                .attr("class",'axis')
                .attr('transform',`translate(${MapLeft},${MapTop})`)
                .call(PointYAxis)
        var TypeColor = ['rgba(255,140,0,1)','rgba(255,215,0,1)','rgba(128,0,128)','rgba(255,0,0,1)','rgba(0,255,255,1)','rgba(60,179,13)','rgba(20,144,255)']
        for(i=0;i<pointdata.length;i++){
            PointSvg.append("circle")
                .attr('class','pointCircles')
                .attr('cx',`${PointsXscale(pointdata[i].x)+MapLeft}`)
                .attr('cy',`${PointsYscale(pointdata[i].y)+MapTop}px`)
                .attr('r','5px')
                .attr('fill',TypeColor[parseInt(pointdata[i].label)])
        }

    })
}
DrawPointsMap()