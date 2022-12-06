mapboxgl.accessToken = 'pk.eyJ1IjoiamltbXloYW5hIiwiYSI6ImNsODA2bnljcjAzNzczdW1rZW96NXZ1bmoifQ.JtU01Cs6q61jWagJGGpluA';
const map = new mapboxgl.Map({
    container: 'mapBox', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [120.14, 30.246], // starting position [lng, lat]
    zoom: 12.5,// starting zoom
    // projection: 'globe' // display the map as a 3D globe
});
const positions = []
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
    for(i=0;i<Object.keys(sight2).length;i++){
        positions[i] = new mapboxgl.Marker({color:sight2[Object.keys(sight2)[i]].color,scale:0.6})
        .setLngLat(sight2[Object.keys(sight2)[i]].position)
        .addTo(map)
        
    }
    positions.forEach(element => {
        element.getElement().addEventListener('click',(e)=>{
            console.log(positions.indexOf(element))
            DrawRadarMap(positions.indexOf(element))
        })
    });
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
                    1,
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
                    15,
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
    map.addLayer({
        'id': 'FlowRate',
        'type': 'symbol',
        'source': 'FlowRate',
        'layout': {
        'icon-image': ['get', 'icon'],
        'icon-allow-overlap': true
        }
        });
});
map.on('click','FlowRate',(e)=>{
    console.log(e)
})
map.on('mouseenter', 'FlowRate', () => {
map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'FlowRate', () => {
map.getCanvas().style.cursor = '';
});
var sight2 = {
    "平湖秋月":{position:[120.139,30.253],color:'#336633'},
    "锦带桥":{position:[120.141,30.255],color:'#0099CC'},
    "白堤":{position:[120.143,30.257],color:'#FF8C00'},
    "断桥残雪":{position:[120.145,30.259],color:'#FFD700'},
    "抱朴道院":{position:[120.147,30.261],color:'#556B2F'},
    "沙孟海旧居":{position:[120.143,30.263],color:'#7FFF00'},
    "集贤亭":{position:[120.142,30.263],color:'#008000'},
    "钱王祠":{position:[120.138,30.262],color:'#00FA9A'},
    "柳浪闻莺":{position:[120.154, 30.264],color:'#008080'},
    "万松书院":{position:[120.156, 30.256],color:'#00FFFF'},
    "雷锋夕照":{position:[120.158, 30.253],color:'#4682B4'},
    "花港观鱼":{position:[120.155, 30.250],color:'#8A2BE2'},
    "苏堤春晓":{position:[120.153, 30.245],color:'#8B008B'},
    "茅家埠":{position:[120.153, 30.244],color:'#BA55D3'},
    "三潭印月":{position:[120.152, 30.242],color:'#D8BFD8'},
    "杨公堤":{position:[120.150,30.235],color:'#FF00FF'},
    "郭庄":{position:[120.151, 30.234],color:'#FF1493'},
    "金溪山庄":{position:[120.156, 30.230],color:'#FFB6C1'},
    "曲院风荷":{position:[120.144, 30.234],color:'#F5DEB3'},
    "苏小小之墓":{position:[120.144, 30.232],color:'#8B4513'},
    "双峰插云":{position:[120.138, 30.229],color:'#D2691E'},
    "浙江省博物馆":{position:[120.137, 30.234],color:'#BC8F8F'},
    "西湖博物馆":{position:[120.136, 30.239],color:'#F0FFF0'},
    "岳王庙":{position:[120.127, 30.238],color:'#006400'},
    "灵隐寺":{position:[120.122, 30.242],color:'#1E90FF'},
    "净慈寺":{position:[120.140, 30.240],color:'#9400D3'},
    "保俶塔":{position:[120.127, 30.243],color:'#808000'},
    "丁家山":{position:[120.127, 30.246],color:'#FFFF00'},
    "九里松":{position:[120.126, 30.248],color:'#000080'},
    "宝石山":{position:[120.126, 30.251],color:'#FF0000'},
    "西湖音乐喷泉":{position:[120.128, 30.254],color:'rgb(101, 103, 171)'},
    "西湖天地":{position:[120.130, 30.254],color:'rgb(178, 111, 73)'},
    "杭州花圃":{position:[120.134, 30.254],color:'rgb(255, 107, 106)'},
    "浙江美术馆":{position:[120.118, 30.252],color:'rgb(175, 150, 134)'},
    "长桥公园":{position:[120.108, 30.247],color:'rgb(78, 155 , 109)'},
    "太子湾公园":{position:[120.101, 30.243],color:'rgb(88, 204, 254)'},
}