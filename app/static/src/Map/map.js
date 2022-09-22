mapboxgl.accessToken = 'pk.eyJ1IjoiamltbXloYW5hIiwiYSI6ImNsODA2bnljcjAzNzczdW1rZW96NXZ1bmoifQ.JtU01Cs6q61jWagJGGpluA';
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/light-v10', // style URL
            center: [120.14,30.246], // starting position [lng, lat]
            zoom: 12.5,// starting zoom
            // projection: 'globe' // display the map as a 3D globe
        });

        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style
        });