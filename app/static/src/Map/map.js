mapboxgl.accessToken = 'pk.eyJ1IjoiamltbXloYW5hIiwiYSI6ImNsODA2bnljcjAzNzczdW1rZW96NXZ1bmoifQ.JtU01Cs6q61jWagJGGpluA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [120.14, 30.246], // starting position [lng, lat]
    zoom: 12.5,// starting zoom
    // projection: 'globe' // display the map as a 3D globe
});

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style


    for(i=0;i<Object.keys(xihushijing).length;i++){
        positions = new mapboxgl.Marker({color:xihushijing[Object.keys(xihushijing)[i]].color,scale:0.6})
        .setLngLat(xihushijing[Object.keys(xihushijing)[i]].position)
        .addTo(map)
            positions.onclick = function(d,i){
        }
    }
});
map.on('load', function () {
    // Add a geojson point source.
    // Heatmap layers also work with a vector tile source.
    map.addSource('FlowRate', {
        'type': 'geojson',
        'data':
            './data/checkMapData.geojson'
    });

    map.addLayer(
        {
            'id': 'heatMap1',
            'type': 'heatmap',
            'source': 'FlowRate',
            'maxzoom': 16,
            'paint': {
                // Increase the heatmap weight based on frequency and property magnitude
                'heatmap-weight': [
                    'interpolate',
                    ['linear'],
                    ['get', 'dbh'],
                    0,
                    0,
                    1,
                    1
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                'heatmap-intensity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    1,
                    9,
                    3
                ],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0,
                    'rgba(33,102,172,0)',
                    0.2,
                    'rgb(103,169,207)',
                    0.4,
                    'rgb(209,229,240)',
                    0.6,
                    'rgb(253,219,199)',
                    0.8,
                    'rgb(239,138,98)',
                    1,
                    'rgb(178,24,43)'
                ],
                // Adjust the heatmap radius by zoom level
                'heatmap-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    0,
                    2,
                    9,
                    20
                ],
                // Transition from heatmap to circle layer by zoom level
                'heatmap-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    1,
                    9,
                    0
                ]
            }
        },
        'waterway-label'
    );

    map.addLayer(
        {
            'id': 'heatmap-point',
            'type': 'circle',
            'source': 'FlowRate',
            'minzoom': 1,
            'paint': {
                // Size circle radius by earthquake magnitude and zoom level
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    1,
                    ['interpolate', ['linear'], ['get', 'dbh'], 1, 1, 6, 6],
                    13,
                    ['interpolate', ['linear'], ['get', 'dbh'], 1, 1, 6, 10]
                ],
                // Color circle by earthquake magnitude
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'dbh'],
                    1,
                    'rgba(33,102,172,0)',
                    2,
                    'rgb(103,169,207)',
                    3,
                    'rgb(209,229,240)',
                    4,
                    'rgb(253,219,199)',
                    5,
                    'rgb(239,138,98)',
                    6,
                    'rgb(178,24,43)'
                ],
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                // Transition from heatmap to circle layer by zoom level
                'circle-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    7,
                    0,
                    8,
                    1
                ]
            }
        },
        'waterway-label'
    );
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
            .datum(i)
            .attr('d', arc())
            
            .attr('class', 'piePaths')
            .attr('fill', xihushijing[Object.keys(xihushijing)[i]].color)
            .attr('transform', 'translate(200,200)')
            .on('click',function(a){
                console.log(a.path[0].__data__)
                DrawLineMap(a.path[0].__data__)
            })
            

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
    const clickSight = map.queryRenderedFeatures(e.point,{
        // layers:
    })


    // .innerRadius(function(){console.log(1)})
});


var xihushijing = {
    '苏提春晓': { position: [120.13404991991972, 30.246197028396097], color: 'rgba(255,0,0)' },
    '曲院风荷': { position: [120.12858821991972, 30.251625228396097], color: 'rgba(255,165,0)' },
    '平湖秋月': { position: [120.14120041991971, 30.254620028396097], color: 'rgba(255,255,0)' },
    '断桥残雪': { position: [120.14641061991972, 30.260016528396097], color: 'rgba(0,255,0)' },//t
    '花港观鱼': { position: [120.13746351991972, 30.234154128396096], color: 'rgba(0,255,255)' },
    '柳浪闻莺': { position: [120.15176451991972, 30.241642128396098], color: 'rgba(0,0,255)' },//r
    '三潭印月': { position: [120.14089070668666, 30.241312057137563], color: 'rgba(128,0,128)' },
    '双峰插云': { position: [120.11773671991972, 30.2497535283961], color: 'rgba(255,192,203)' },//l
    '雷峰夕照': { position: [120.14537761991971, 30.233608128396096], color: 'rgba(192,192,192)' },
    '南屏晚钟': { position: [120.14517101991972, 30.231338228396098], color: 'rgba(128,128,128)' },//b
}