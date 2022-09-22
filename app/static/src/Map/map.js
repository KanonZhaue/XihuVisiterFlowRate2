mapboxgl.accessToken = 'pk.eyJ1IjoiamltbXloYW5hIiwiYSI6ImNsODA2bnljcjAzNzczdW1rZW96NXZ1bmoifQ.JtU01Cs6q61jWagJGGpluA';
        const map = new mapboxgl.Map({
            container: 'mapBox', // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/light-v10', // style URL
            center: [120.14,30.246], // starting position [lng, lat]
            zoom: 12.5,// starting zoom
            // projection: 'globe' // display the map as a 3D globe
        });

        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style
        });
        map.on("click", (e) => {
            console.log(e)
            var clickPosition = [e.lngLat.lng,e.lngLat.lat]
            console.log(clickPosition)
            var distances = []
            console.log(Object.keys(xihushijing))
            for(let i =0;i<Object.keys(xihushijing).length;i++){
                distances.push(((xihushijing[Object.keys(xihushijing)[i]].position[0]-clickPosition[0])**2+(xihushijing[Object.keys(xihushijing)[i]].position[1]-clickPosition[1])**2)**1/2)
            }
            console.log(distances)
   });


   var xihushijing = {
    'sutichunxiao':{position:[120.1450619,30.2500358],color:'rgba(255,0,0)'},
    'quyuanfenghe':{position:[120.1396002,30.2554640],color:'rgba(255,165,0)'},
    'pinghuqiuyue':{position:[120.1522124,30.2584588],color:'rgba(255,255,0)'},
    'duanqiaocanxue':{position:[120.1574226,30.2638553],color:'rgba(0,255,0)'},
    'huagangguanyu':{position:[120.1484755,30.2379929],color:'rgba(0,255,255)'},
    'liulangwenying':{position:[120.1627765,30.2454809],color:'rgba(0,0,255)'},
    'santanyingyue':{position:[120.1504158,30.2438586],color:'rgba(128,0,128)'},
    'shuangfengchayun':{position:[120.1287487,30.2535923],color:'rgba(255,192,203)'},
    'leifengxizhao':{position:[120.1563896,30.2374469],color:'rgba(192,192,192)'},
    'nanpingjingyuan':{position:[120.1561830,30.2351770],color:'rgba(128,128,128)'},
   }