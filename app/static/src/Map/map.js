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
            UIDataList.RadarIndex = positions.indexOf(element)
            DrawRadarMap(positions.indexOf(element))
        })
    });
});
map.on('load', function () {
    // Add a geojson point source.
    // Heatmap layers also work with a vector tile source.
    map.addSource('FlowRate', {
        'type': 'geojson',//下面data建议缩进，400行都是数据
        'data':{
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 7,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.139,30.253]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 15,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.141,30.255]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 17,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.143,30.257]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 33,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.145,30.259]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 42,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.147,30.261]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 44,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.143,30.263]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 64,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.142,30.263]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 61,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.138,30.262]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 71,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.154, 30.264]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 82,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.156, 30.256]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 80,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.158, 30.253]
                    }
                }
                ,
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 92,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.155, 30.250]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 86,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.153, 30.245]
                    }
                }
                ,
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 104,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.153, 30.244]
                    }
                }
                ,
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 119,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.152, 30.242]
                    }
                }
                ,
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 116,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.150,30.235]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 123,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.151, 30.234]
                    }
                }
                ,
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 155,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.156, 30.230]
                    }
                }
        
                ,
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 139,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.144, 30.234]
                    }
                }
                ,
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 148,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.144, 30.232]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 179,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.138, 30.229]
                    }
                }
                ,
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 183,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.137, 30.234]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 194,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.136, 30.239]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 182,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.127, 30.238]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 192,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.122, 30.242]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 207,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.140, 30.240]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 238,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.127, 30.243]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 231,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.127, 30.246]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 214,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.126, 30.248]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 277,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.126, 30.251]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 247,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.128, 30.254]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 254,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.130, 30.254]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 245,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.134, 30.254]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 268,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.118, 30.252]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 287,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.108, 30.247]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "dbh": 4,
                        "icon":"music"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [120.101, 30.243]
                    }
                }
            
            
            ]
        }
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

    // map.addLayer(
    //     {
    //         'id': 'heatmap-point',
    //         'type': 'circle',
    //         'source': 'FlowRate',
    //         'minzoom': 1,
    //         'paint': {
    //             // Size circle radius by earthquake magnitude and zoom level
    //             'circle-radius': [
    //                 'interpolate',
    //                 ['linear'],
    //                 ['zoom'],
    //                 1,
    //                 ['interpolate', ['linear'], ['get', 'dbh'], 1, 1, 300, 4],
    //                 15,
    //                 ['interpolate', ['linear'], ['get', 'dbh'], 1, 1, 300, 14]
    //             ],
    //             // Color circle by earthquake magnitude
    //             'circle-color': [
    //                 'interpolate',
    //                 ['linear'],
    //                 ['get', 'dbh'],
    //                 0,
    //                 'rgba(33,102,172,0)',
    //                 60,
    //                 'rgb(103,169,207)',
    //                 120,
    //                 'rgb(209,229,240)',
    //                 180,
    //                 'rgb(253,219,199)',
    //                 240,
    //                 'rgb(239,138,98)',
    //                 350,
    //                 'rgb(178,24,43)'
    //             ],
    //             'circle-stroke-color': 'white',
    //             'circle-stroke-width': 1,
    //             // Transition from heatmap to circle layer by zoom level
    //             'circle-opacity': [
    //                 'interpolate',
    //                 ['linear'],
    //                 ['zoom'],
    //                 7,
    //                 0,
    //                 8,
    //                 1
    //             ]
    //         }
    //     },
    //     'waterway-label'
    // );
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
