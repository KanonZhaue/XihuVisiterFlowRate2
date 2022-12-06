var rectSvg = d3.select('#rectSvg')
const NameList = [],valueLists = []

function DrawRectMap(){
    d3.csv('./data/FavRanking.csv').then( val => {
    RectData = val.columns
    console.log(RectData)
    RectData2 = []
    for(let i=0;i<RectData.length;i++){
        RectData2.push({"index":i,"rectValue":RectData[i]})
    }
    console.log(RectData2)
    var TopData = Object.keys(RectData2).sort(function(a,b){
        return parseFloat(RectData2[b].rectValue)-parseFloat(RectData2[a].rectValue)
    })
    var Top5Data = TopData.splice(0,5)
    console.log(Top5Data)
    for(i=0;i<Top5Data.length;i++){
        NameList.push(Object.keys(sight2)[Top5Data[i]-1])
        valueLists.push(RectData2[Top5Data[i]].rectValue)
    }
    console.log(NameList,valueLists)
    var XscaleLen = 300,YscaleLen = 300,MapTop = 30 ,RectMapLeft =30
    var RectsXscale = d3.scaleLinear()
        .domain([
            0,
            Math.max.apply(Math,valueLists.map(item => { return item }))])
        .range([0,XscaleLen])
    var RectsYscale = d3.scaleBand()
        .domain(new Array(NameList.length))
        .range([0,YscaleLen])
            console.log(valueLists)
    var RectXAxis = d3.axisTop(RectsXscale)
    var RectYAxis = d3.axisLeft(RectsYscale)
    var gRecttXAxis = rectSvg.append("g")
            .attr("class",'axis')
            .attr('transform',`translate(${RectMapLeft},${MapTop})`)
            .call(RectXAxis)
    var gRectYAxis = rectSvg.append("g")
            .attr("class",'axis')
            .attr('transform',`translate(${RectMapLeft},${MapTop})`)
            .call(RectYAxis)
    
     console.log(valueLists)

    for(let i=0;i<5;i++){
        rectSvg.append("rect")
        .attr('x',`${MapTop+1}px`)
        .attr('y',`${(30+300*i/5)}px`)
        .attr('width',`${(parseFloat(RectsXscale(valueLists[i])))}px`)
        .attr("height",`${300*1/5-10}`)
        .attr('fill',sight2[(NameList[i])].color)
        rectSvg.append('text')
            .attr('class','RectTexts')
            .attr('x',`${MapTop+1}px`)
        .attr('y',`${(60+300*i/5)}px`)
            .text(()=>{
                return NameList[i]
            })
    
        }
       
    })
        

}
DrawRectMap()