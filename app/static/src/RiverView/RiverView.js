function DrawRiverView() {
    var RiverViewSvg = d3.select('#stackSvg')
    var stack = d3.stack()
    d3.dsv(',', './data/RiverData.csv', function (data) { return data })
        .then(function (data) {
            console.log(data)
            var max = 0
            for(j=0;j<data.length;j++){
                total=0
                for (i = 0; i < 36; i++) {

                    total+=parseFloat(data[j][i+1])
                }
                if(total>max)
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
                .call(d3.axisBottom(RiverXScale));

            RiverViewSvg.append("g")
                .attr("transform", "translate(50,50)")
                .call(d3.axisLeft(RiverYScale));

for (i=0;i<36;i++){
    var RiverGenerator = d3.area()
        .x((p) => RiverXScale(parseInt(p['index'])))
        .y0((p) => {
            returnData = 0
                for(j=1;j<=i;j++){
                    returnData+=(parseFloat(p[(j)]))
                }
            return RiverYScale(returnData)
            })
        .y1((p) => {
            returnData = 0
                for(j=1;j<=i+1;j++){
                    returnData+=(parseFloat(p[(j)]))
                }
            return RiverYScale(returnData)
        })
    console.log(RiverGenerator(data))
    RiverViewSvg.append('path')
        .attr('d', RiverGenerator(data))
        .attr('fill', sight2[Object.keys(sight2)[i]].color)
        .attr('transform', 'translate(50,50)')

}
                
        
                
        
})
}


DrawRiverView()