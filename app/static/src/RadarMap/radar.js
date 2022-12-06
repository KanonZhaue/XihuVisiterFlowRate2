var RadarSvg = d3.select("#RadarSvg")
//生成背景多边形的顶点的函数      数据个数，半径，尺度个数
function getPolygonPoints(datanum,radius,ticknum)
    {
        
        const points = [];
        let polygon;
        //  数据个数
        if (datanum < 3) return points;

        const anglePiece = Math.PI * 2 / datanum;     //  2pi / 6
        const radiusReduce = radius / ticknum;     //  最小半径(半径 / 标度个数

        for (let r=radius; r>0; r-=radiusReduce){
        polygon = [];             
            for (let i=0; i<datanum; i++){
                polygon.push(
                    Math.cos(i * anglePiece) * r + ',' +Math.sin(i * anglePiece) * r  );
            }
            points.push(polygon.join(' '));
        }
                
        return points;
}
const axes = RadarSvg.append('g')
.attr('class', 'axes')
.selectAll('axisRadar')
.data(getPolygonPoints(5,150,5));

axes
.join('polygon')
.attr('class', 'axisRadar')
.merge(axes)
.attr('points', (d,i) => {
    return d

})
.attr('fill', (d,i) => i%2 === 0?"white":"#ddd")
.attr('stroke', "gray")
.attr('transform','translate(300,200)')
 //画标签
 nameset = ['age','sex','cost','exerciseAbility','travelType']
 let anglePiece = 2 * Math.PI /nameset.length
         let texts = RadarSvg.append('g')
         texts.selectAll('text')
             .data(nameset)
             .join('text')
             .attr('class','radarText')
             .attr('x',(d,i)=>{  
                 let dx = Math.cos(anglePiece * i) * (150 + 13)
                 return dx
             })
             .attr('y',(d,i)=>{
                 let dy = Math.sin(anglePiece * i) * (150 + 13)
                 return dy
             } )
             .text( (d,i) =>{    //坐标轴的名字
                 return d
             })
             .attr('text-anchor',(d,i) =>{
                 if(i==0)return 'start'
                 else if(i==2) return 'end'
                 else return 'middle'
             })
             .attr('dy',6.5)
     .attr('transform','translate(300,200)')




function DrawRadarMap(index){
    d3.select(".polygons").remove()
    const conf3 = {
        margins: {top: 80, left: 80, bottom: 50, right: 80},
        textColor: 'black',
        radius: 150,
        animateDuration: 1000,
        tickNum: 6,
        axisfillColor: ['white','#ddd'],
        axisStrokeColor: 'gray',
        pointsColor: 'white',
        pointsSize: 3,
        // width : document.getElementById('radar_svg').getBoundingClientRect().width,
        // height : document.getElementById('radar_svg').getBoundingClientRect().height,
        polygon:{
            strokeWidth : 2,
            fill: 'rgb(150, 245, 150)',
            stroke: "green",
            opacity:0.7
        },
        textdr :18
    }
    console.log(index)
    d3.dsv(',', './data/radar.csv', function (data) { return data })
    .then(function (data) {
        console.log(data)
        var clickData
        for(i=0;i<data.length;i++){
            if(data[i].id==index){
                console.log(data[i])
                clickData = data[i]
            }
        }
        let data1 = dataPolygonPoints(clickData)
        //绘制数据多边形
    let polygon = RadarSvg.append('g')
    polygon
        .append('polygon')
        .attr('points',data1)
        .attr('class','polygons')
        .attr('stroke-width', conf3.polygon.strokeWidth)
        .attr('stroke',conf3.polygon.stroke)
        .attr('fill',conf3.polygon.fill)
        .attr('opacity',conf3.polygon.opacity)
        .attr('transform','translate(300,200)')
    })
   

        //制作tooplip
        let tooltip = d3.select('body').append('div').attr('class','tooltip')
        .attr('opacity',0.0)
    
        ///添加鼠标交互事件 
    
        d3.selectAll('.polygons')
        .on('mouseover', e =>{
            console.log(e)
            d3.select(e.target)
            .attr('stroke-width', '4');
            console.log(e)
            tooltip.html("<li/>"+data1.sex+"<br/>"+"<li/>"+data1.age)
            .style('left',function(){
                return `${e.pageX+20}px`
            })
            .style('top',(e.pageY+'px'))
            .style('opacity',0.8)
    
        })
        .on('mouseout',e =>{
            d3.select(e.target)
            .attr('stroke-width', '2');
            tooltip.style('opacity',0.0);
        })
        

    
}


function dataPolygonPoints(dataset)
        {
            let c1 = d3.scaleLinear()
            .domain([0,50])
            .range([0,150])
            let c2 = d3.scaleLinear()
            .domain([0,5])
            .range([0,150])
            let c3 = d3.scaleLinear()
            .domain([0,5])
            .range([0,150])
            let c4 = d3.scaleLinear()
            .domain([0,5])
            .range([0,150])
            let c5 = d3.scaleLinear()
            .domain([0,5])
            .range([0,150])
        
            
            
            const points = [];
    
            const anglePiece = Math.PI * 2 / dataset.length;     //  2pi / 6
    
            let r;
            r = c1(parseFloat(dataset.age))
            points.push(r*Math.cos(Math.PI*2/5),r*Math.sin(Math.PI*2/5))
            r = c2(parseFloat(dataset.sex))
            points.push(r*Math.cos(Math.PI*4/5),r*Math.sin(Math.PI*4/5))
            r = c3(parseFloat(dataset.cost))
            points.push(r*Math.cos(Math.PI*6/5),r*Math.sin(Math.PI*6/5))
            r = c4(parseFloat(dataset.exerciseAbility))
            points.push(r*Math.cos(Math.PI*8/5),r*Math.sin(Math.PI*8/5))
            r = c5(parseFloat(dataset.travelType))
            points.push(r*Math.cos(Math.PI*2),r*Math.sin(Math.PI*2))
      
            return points;
}
        


    
    
    
