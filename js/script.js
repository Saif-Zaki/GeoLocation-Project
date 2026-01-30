//Map initilization 
    var map = L.map('map').setView([31.3, 29.8], 7.4);
    //osm map
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map)

    //ocean basemap
var ocean_bm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
	maxZoom: 13
});
    ocean_bm.addTo(map);    

    //imagery
var imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
    imagery.addTo(map);

//MARK
    L.marker([30.0444, 31.2357]).addTo(map);

//Layer  Controller
    var baseMaps = {
    "OSM": osm,
    "Ocean basemap": ocean_bm,
    "Imagery" :imagery,
};

// var overlayMaps = {
//     "Cities": cities    
// };
    var layerControl = L.control.layers(baseMaps).addTo(map);

//geojson 
L.geoJSON(polygonjson).addTo(map)

L.control.locate().addTo(map);



//geolocation
navigator.geolocation.watchPosition(success , error);

let marker , circle , zoomed;

function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    //علشان يمسح التكرار
    if(marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);

    }

    //crat marker
    marker = L.marker([lat , lng]) .addTo(map);
    circle = L.circle([lat,lng], { radius:accuracy }).addTo(map) 

    if (!zoomed) {
       zoomed = map.fitBounds(circle.getBounds())
    }

    //follow the marker
    map.setView([lat,lng]) ;
    
}


function error(err) {
    if(err.code === 1 ){
        alert("plaes allow geolocation access");
    }   else{
        alert("Can not get cuurent location "); 
    }
}

