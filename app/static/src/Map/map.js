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
                    ['interpolate', ['linear'], ['get', 'dbh'], 1, 1, 300, 4],
                    15,
                    ['interpolate', ['linear'], ['get', 'dbh'], 1, 1, 300, 14]
                ],
                // Color circle by earthquake magnitude
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'dbh'],
                    0,
                    'rgba(33,102,172,0)',
                    60,
                    'rgb(103,169,207)',
                    120,
                    'rgb(209,229,240)',
                    180,
                    'rgb(253,219,199)',
                    240,
                    'rgb(239,138,98)',
                    350,
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
