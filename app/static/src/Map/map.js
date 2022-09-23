mapboxgl.accessToken = 'pk.eyJ1IjoiamltbXloYW5hIiwiYSI6ImNsODA2bnljcjAzNzczdW1rZW96NXZ1bmoifQ.JtU01Cs6q61jWagJGGpluA';
const map = new mapboxgl.Map({
    container: 'mapBox', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [120.14, 30.246], // starting position [lng, lat]
    zoom: 12.5,// starting zoom
    // projection: 'globe' // display the map as a 3D globe
});

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style


    for(i=0;i<Object.keys(xihushijing).length;i++){
        positions = new mapboxgl.Marker({color:xihushijing[Object.keys(xihushijing)[i]].color})
        .setLngLat(xihushijing[Object.keys(xihushijing)[i]].position)
        .addTo(map);
    }
});
map.on("click", (e) => {
    console.log(e)
    var clickPosition = [e.lngLat.lng, e.lngLat.lat]
    console.log(clickPosition)
    var distances = []
    console.log(Object.keys(xihushijing))
    for (let i = 0; i < Object.keys(xihushijing).length; i++) {
        distances.push(((xihushijing[Object.keys(xihushijing)[i]].position[0] - clickPosition[0]) ** 2 + (xihushijing[Object.keys(xihushijing)[i]].position[1] - clickPosition[1]) ** 2) ** 1 / 2)
    }
    console.log(distances)
    try{
        yourposition.remove()
    }
    catch(error){

    }
    

    
  yourposition = new mapboxgl.Marker()
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .addTo(map);



    var pieSvg = d3.select('#pieSvg')
    d3.selectAll('.piePaths').remove()
    d3.selectAll('.piePathTips').remove()

    var pieScale = d3.scaleLinear()
        .domain([0, d3.max(distances)])
        .range([0, 1])
    for (i = 0; i < distances.length; i++) {
        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(140 * pieScale(distances[i]))
            .startAngle(Math.PI * 2 / distances.length * i)
            .endAngle(Math.PI * 2 / distances.length * (i + 1));
        pieSvg.append('path')
            .attr('d', arc())
            .attr('class', 'piePaths')
            .attr('fill', xihushijing[Object.keys(xihushijing)[i]].color)
            .attr('transform', 'translate(200,200)')

    }
    for (i = 0; i < distances.length; i++) {
        var arc = d3.arc()
            .innerRadius(145)
            .outerRadius(150)
            .cornerRadius(5)
            .startAngle(Math.PI * 2 / distances.length * i + 3 / 360 * 2 * Math.PI)
            .endAngle(Math.PI * 2 / distances.length * (i + 1) - 3 / 360 * 2 * Math.PI);
        pieSvg.append('path')
            .attr('d', arc())
            .attr('class', 'piePathTips')
            .attr('fill', xihushijing[Object.keys(xihushijing)[i]].color)
            .attr('transform', 'translate(200,200)')

    }
    for (i = 0; i < distances.length; i++) {
        pieSvg.append('text')
            .text(Object.keys(xihushijing)[i])
            .attr('x', 170)
            .attr('y', 40)
            .attr('transform', `rotate(${360 / 20 * (2 * i + 1)},200,200)`)

    }



    // .innerRadius(function(){console.log(1)})
});


var xihushijing = {
    '苏提春晓': { position: [120.1450619-0.011011980080283479, 30.2500358-0.0038387716039025577], color: 'rgba(255,0,0)' },
    '曲院风荷': { position: [120.1396002-0.011011980080283479, 30.2554640-0.0038387716039025577], color: 'rgba(255,165,0)' },
    '平湖秋月': { position: [120.1522124-0.011011980080283479, 30.2584588-0.0038387716039025577], color: 'rgba(255,255,0)' },
    '断桥残雪': { position: [120.1574226-0.011011980080283479, 30.2638553-0.0038387716039025577], color: 'rgba(0,255,0)' },//t
    '花港观鱼': { position: [120.1484755-0.011011980080283479, 30.2379929-0.0038387716039025577], color: 'rgba(0,255,255)' },
    '柳浪闻莺': { position: [120.1627765-0.011011980080283479, 30.2454809-0.0038387716039025577], color: 'rgba(0,0,255)' },//r
    '三潭印月': { position: [120.14089070668666, 30.241312057137563], color: 'rgba(128,0,128)' },
    '双峰插云': { position: [120.1287487-0.011011980080283479, 30.2535923-0.0038387716039025577], color: 'rgba(255,192,203)' },//l
    '雷峰夕照': { position: [120.1563896-0.011011980080283479, 30.2374469-0.0038387716039025577], color: 'rgba(192,192,192)' },
    '南屏晚钟': { position: [120.1561830-0.011011980080283479, 30.2351770-0.0038387716039025577], color: 'rgba(128,128,128)' },//b
}