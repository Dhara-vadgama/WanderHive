
//let mapToken=mapToken;//this maptoken comes from show.ejs (in this first run this script which is on top and thne this map.js file rum ok)
mapboxgl.accessToken = mapToken;
console.log(mapToken);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

const marker1 = new mapboxgl.Marker({color:"red"})
.setLngLat(coordinates)
const popup =new mapboxgl.Popup({offset: 25 })
.setHTML("<p>Exact Location will be provided after booking</p>")

marker1.addTo(map);
popup.addTo(map);
