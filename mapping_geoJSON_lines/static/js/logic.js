//check console
console.log("Hello!")




//URL I got from GitHub
//let airportData = "https://github.com/camshoffner/mapping_earthquakes/blob/cb554d59c4c3e42103f796e9d32b560059d93ab8/practice_data/majorAirports.json";

// We create the tile layer that will be the background of our map.
var light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "navigation-day-v1",
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
var dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "navigation-night-v1",
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Day: light,
  Night: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [dark]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/camshoffner/mapping_earthquakes/mapping_multiple_points/practice_data/torontoRoutes.json";


// Grabbing our GeoJSON data using pointToLayer
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr>  <h3>" + feature.properties.city+", "+feature.properties.country+"</h3>");
//   }
// }).addTo(map);

// //Grabbing geoJSON data using onEachFeature
// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer){
//     console.log(layer);
//     layer.bindPopup("<h3> Airport code: " + feature.properties.faa + "</h3> <hr>  <h3> Airport name: " + feature.properties.name +"</h3>");
//   }
// }).addTo(map);

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}


//Grabbing  our GeoJSON data for all airports
d3.json(torontoData).then(function(data) {
  console.log(data);
  //Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{
      onEachFeature: function(feature, layer){
        console.log(layer);
        layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr>  <h3> Destination: " + feature.properties.dst +"</h3>");
      },
      style: myStyle
        
    }
    ).addTo(map);
});



// //Grabbing  our GeoJSON data for all airports
// d3.json(torontoData).then(function(data) {
//   console.log(data);
//   //Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data,{
//       onEachFeature: function(feature, layer){
//         console.log(layer);
//         layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr>  <h3> Destination: " + feature.properties.dst +"</h3>");
//       },
//       style: function(feature){
//         return {
//         color: "#FFFFCC",
//         weight: 2
//         }
//       }
//     }
//     ).addTo(map);
// });