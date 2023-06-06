var RadarSvg = d3.select("#RadarSvg")
//生成背景多边形的顶点的函数      数据个数，半径，尺度个数
function getPolygonPoints(datanum, radius, ticknum) {

    const points = [];
    let polygon;
    //  数据个数
    if (datanum < 3) return points;

    const anglePiece = Math.PI * 2 / datanum;     //  2pi / 6
    const radiusReduce = radius / ticknum;     //  最小半径(半径 / 标度个数

    for (let r = radius; r > 0; r -= radiusReduce) {
        polygon = [];
        for (let i = 0; i < datanum; i++) {
            polygon.push(
                Math.cos(i * anglePiece) * r + ',' + Math.sin(i * anglePiece) * r);
        }
        points.push(polygon.join(' '));
    }

    return points;
}
const axes = RadarSvg.append('g')
    .attr('class', 'axes')
    .selectAll('axisRadar')
    .data(getPolygonPoints(5, 100, 5));

axes
    .join('polygon')
    .attr('class', 'axisRadar')
    .merge(axes)
    .attr('points', (d, i) => {
        return d

    })
    .attr('fill', (d, i) => i % 2 === 0 ? "white" : "#ddd")
    .attr('stroke', "gray")
    .attr('transform', 'translate(110,200)')

axes
    .join('polygon')
    .attr('class', 'axisRadar')
    .merge(axes)
    .attr('points', (d, i) => {
        return d

    })
    .attr('fill', (d, i) => i % 2 === 0 ? "white" : "#ddd")
    .attr('stroke', "gray")
    .attr('transform', 'translate(410,200)')




//画标签
nameset = ['age', 'sex', 'cost', 'exerciseAbility', 'travelType']
let anglePiece = 2 * Math.PI / nameset.length
let texts = RadarSvg.append('g')
x1=[-70,-180,-160,-50,50]
y1=[100,70,-70,-100,0]

for(let i=0;i<5;i++){
    texts
    .append('text')
    .attr('class', 'radarText')
    .attr('x', x1[i])
    .attr('y', y1[i])
    .text(nameset[i])
    .attr('text-anchor', function(){
        if (i == 0) return 'start'
        else if (i == 2) return 'end'
        else return 'middle'
    })
    .attr('dy', 6.5)
    .attr('transform', 'translate(200,200)')


    texts
    .append('text')
    .attr('class', 'radarText')
    .attr('x', x1[i]+300)
    .attr('y', y1[i])
    .text(nameset[i])
    .attr('text-anchor', function(){
        if (i == 0) return 'start'
        else if (i == 2) return 'end'
        else return 'middle'
    })
    .attr('dy', 6.5)
    .attr('transform', 'translate(200,200)')
}
texts.append('text')
    .attr('x', 0)
    .attr('y', 0)
    .text('scene tourist average portrait')
    .attr('font-size','16px')
    .attr('font-weight','bold')
    .attr('transform','translate(10,60)')

texts.append('text')
    .attr('x', 0)
    .attr('y', 0)
    .text('tourist portrait')
    .attr('font-size','16px')
    .attr('font-weight','bold')
    .attr('transform','translate(350,60)')

function DrawRadarMap(index) {
    d3.selectAll(".polygons").remove()
    d3.selectAll('.labelText').remove()
    d3.selectAll('.labelRect').remove()
    const conf3 = {
        margins: { top: 80, left: 80, bottom: 50, right: 80 },
        textColor: 'black',
        radius: 100,
        animateDuration: 1000,
        tickNum: 6,
        axisfillColor: ['white', '#ddd'],
        axisStrokeColor: 'gray',
        pointsColor: 'white',
        pointsSize: 3,
        // width : document.getElementById('radar_svg').getBoundingClientRect().width,
        // height : document.getElementById('radar_svg').getBoundingClientRect().height,
        polygon1: {
            strokeWidth: 2,
            fill: 'rgb(150, 245, 150)',
            stroke: "green",
            opacity: 0.7
        }, polygon2: {
            strokeWidth: 2,
            fill: 'rgb(255, 107, 106)',
            stroke: "red",
            opacity: 0.7
        },
        textdr: 18
    }
    console.log(index)

    var data = {
        data: JSON.stringify(UIDataList)
    }
    $.ajax({
        type: "POST",
        url: "/getPolygonData",
        dataType: "json",
        data: data,
        success: function (d) {

            console.log(d)
            data = d
            //绘制数据多边形
            // if (UIDataList.redRadarIndex != -1) {

            //     var clickData
            //     for (i = 0; i < data.length; i++) {
            //         if (data[i].id == UIDataList.redRadarIndex) {
            //             console.log(data[i])
            //             clickData = data[i]
            //         }
            //     }
            //     let data1 = dataPolygonPoints(clickData)
            //     let polygon = RadarSvg.append('g')
            //     polygon
            //         .append('polygon')
            //         .attr('points', data1)
            //         .attr('class', 'polygons')
            //         .attr('stroke-width', conf3.polygon2.strokeWidth)
            //         .attr('stroke', conf3.polygon2.stroke)
            //         .attr('fill', conf3.polygon2.fill)
            //         .attr('opacity', conf3.polygon2.opacity)
            //         .attr('transform', 'translate(200,200)')
            //     polygon.append('rect')
            //         .attr('class', 'labelRect')
            //         .attr('width', 10)
            //         .attr('height', 10)
            //         .attr('x', 400)
            //         .attr('y', 200)
            //         .attr('fill', conf3.polygon2.fill)
            //     polygon.append('text')
            //         .attr('class', 'labelText')
            //         .attr('x', 410)
            //         .attr('y', 209)
            //         .text(function () {
            //             console.log(Object.keys(sight2))
            //             return Object.keys(sight2)[UIDataList.redRadarIndex]
            //         })
            //         .attr('font-size','10px')
            // }
            // if (UIDataList.greenRadarIndex != -1) {
                data = d
                var clickData
                // for (i = 0; i < data.length; i++) {
                //     if (data[i].id == UIDataList.RadarIndex) {
                //         console.log(data[i])
                //         clickData = data[i]
                //     }
                // }
                clickData = data[UIDataList.RadarIndex]
                let data1 =  dataPolygonPoints(clickData)
                let polygon = RadarSvg.append('g')
                polygon
                    .append('polygon')
                    .attr('points', data1)
                    .attr('class', 'polygons')
                    .attr('stroke-width', conf3.polygon1.strokeWidth)
                    .attr('stroke', conf3.polygon1.stroke)
                    .attr('fill', conf3.polygon1.fill)
                    .attr('opacity', conf3.polygon1.opacity)
                    .attr('transform', 'translate(110,200)')
                polygon.append('rect')
                    .attr('class', 'labelRect')
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('x', 200)
                    .attr('y', 150)
                    .attr('fill', conf3.polygon1.fill)
                polygon.append('text')
                    .attr('class', 'labelText')
                    .attr('x', 210)
                    .attr('y', 159)
                    .text(function () {
                        console.log(Object.keys(sight2))
                        return Object.keys(sight2)[UIDataList.RadarIndex]
                    })
                    .attr('font-size','10px')
            }



        // }
    })
    // d3.dsv(',', './data/radar.csv', function (data) { return data })
    //     .then(function (data) {

    //     })


    //制作tooplip
    let tooltip = d3.select('body').append('div').attr('class', 'tooltip')
        .attr('opacity', 0.0)

    ///添加鼠标交互事件 

    d3.selectAll('.polygons')
        .on('mouseover', e => {
            console.log(e)
            d3.select(e.target)
                .attr('stroke-width', '4');
            console.log(e)
            tooltip.html("<li/>" + data1.sex + "<br/>" + "<li/>" + data1.age)
                .style('left', function () {
                    return `${e.pageX + 20}px`
                })
                .style('top', (e.pageY + 'px'))
                .style('opacity', 0.8)

        })
        .on('mouseout', e => {
            d3.select(e.target)
                .attr('stroke-width', '2');
            tooltip.style('opacity', 0.0);
        })



}


function DrawRadar2Map() {
    d3.selectAll(".polygons2").remove()
    d3.selectAll('.labelText2').remove()
    d3.selectAll('.labelRect2').remove()
    const conf3 = {
        margins: { top: 80, left: 80, bottom: 50, right: 80 },
        textColor: 'black',
        radius: 100,
        animateDuration: 1000,
        tickNum: 6,
        axisfillColor: ['white', '#ddd'],
        axisStrokeColor: 'gray',
        pointsColor: 'white',
        pointsSize: 3,
        // width : document.getElementById('radar_svg').getBoundingClientRect().width,
        // height : document.getElementById('radar_svg').getBoundingClientRect().height,
        polygon1: {
            strokeWidth: 2,
            fill: 'rgb(150, 245, 150)',
            stroke: "green",
            opacity: 0.7
        }, polygon2: {
            strokeWidth: 2,
            fill: 'rgb(255, 107, 106)',
            stroke: "red",
            opacity: 0.7
        },
        textdr: 18
    }

    var data = {
        data: JSON.stringify(UIDataList)
    }
    $.ajax({
        type: "POST",
        url: "/getPolygon2Data",
        dataType: "json",
        data: data,
        success: function (d) {

            console.log(d)
                data = d
                
                let data1 =  dataPolygon2Points(data)
                let polygon = RadarSvg.append('g')
                polygon
                    .append('polygon')
                    .attr('points', data1)
                    .attr('class', 'polygons2')
                    .attr('stroke-width', conf3.polygon1.strokeWidth)
                    .attr('stroke', conf3.polygon1.stroke)
                    .attr('fill', conf3.polygon1.fill)
                    .attr('opacity', conf3.polygon1.opacity)
                    .attr('transform', 'translate(410,200)')
                polygon.append('rect')
                    .attr('class', 'labelRect2')
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('x', 500)
                    .attr('y', 150)
                    .attr('fill', conf3.polygon1.fill)
                polygon.append('text')
                    .attr('class', 'labelText2')
                    .attr('x', 510)
                    .attr('y', 159)
                    .text(function () {
                        return UIDataList["inputId"]
                    })
                    .attr('font-size','10px')
            }
    })


}


function dataPolygonPoints(dataset) {
    let radius =100
    let c1 = d3.scaleLinear()
        .domain([0, 50])
        .range([0, radius])
    let c2 = d3.scaleLinear()
        .domain([0, 5])
        .range([0, radius])
    let c3 = d3.scaleLinear()
        .domain([0, 5])
        .range([0, radius])
    let c4 = d3.scaleLinear()
        .domain([0, 5])
        .range([0, radius])
    let c5 = d3.scaleLinear()
        .domain([0, 5])
        .range([0, radius])



    const points = [];

    const anglePiece = Math.PI * 2 / dataset.length;     //  2pi / 6

    let r;
    console.log(dataset)
    r = c1(parseFloat(dataset.age))
    points.push(r * Math.cos(Math.PI * 2 / 5), r * Math.sin(Math.PI * 2 / 5))
    r = c2(parseFloat(dataset.sex))
    points.push(r * Math.cos(Math.PI * 4 / 5), r * Math.sin(Math.PI * 4 / 5))
    r = c3(parseFloat(dataset.cost))
    points.push(r * Math.cos(Math.PI * 6 / 5), r * Math.sin(Math.PI * 6 / 5))
    r = c4(parseFloat(dataset.exerciseAbility))
    points.push(r * Math.cos(Math.PI * 8 / 5), r * Math.sin(Math.PI * 8 / 5))
    r = c5(parseFloat(dataset.travelType))
    points.push(r * Math.cos(Math.PI * 2), r * Math.sin(Math.PI * 2))

    return points;
}
function dataPolygon2Points(dataset) {
    let radius =100
    let c1 = d3.scaleLinear()
    .domain([-10,10])
    .range([0, radius])
    let c2 = d3.scaleLinear()
    .domain([-10,10])
    .range([0, radius])
    let c3 = d3.scaleLinear()
    .domain([-10,10])
    .range([0, radius])
    let c4 = d3.scaleLinear()
    .domain([-10,10])
    .range([0, radius])
    let c5 = d3.scaleLinear()
    .domain([-10,10])
    .range([0, radius])



    const points = [];

    const anglePiece = Math.PI * 2 / dataset.length;     //  2pi / 6

    let r;
    console.log(dataset)
    r = c1(parseFloat(dataset[0]))
    points.push(r * Math.cos(Math.PI * 2 / 5), r * Math.sin(Math.PI * 2 / 5))
    r = c2(parseFloat(dataset[1]))
    points.push(r * Math.cos(Math.PI * 4 / 5), r * Math.sin(Math.PI * 4 / 5))
    r = c3(parseFloat(dataset[2]))
    points.push(r * Math.cos(Math.PI * 6 / 5), r * Math.sin(Math.PI * 6 / 5))
    r = c4(parseFloat(dataset[3]))
    points.push(r * Math.cos(Math.PI * 8 / 5), r * Math.sin(Math.PI * 8 / 5))
    r = c5(parseFloat(dataset[4]))
    points.push(r * Math.cos(Math.PI * 2), r * Math.sin(Math.PI * 2))

    return points;
}






