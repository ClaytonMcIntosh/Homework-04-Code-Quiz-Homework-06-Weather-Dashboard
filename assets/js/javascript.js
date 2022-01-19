const APIKey = "6dfd8cecea8d0220febc6bc4c30dbd34";
var city = "Brisbane";
var lon = 153.0281;
var lat = -27.4679;
var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
var queryURL1call = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
const input = document.querySelector("input");
let temp = "-";
let wind = "-";
let uvi = "-";
let uv = "-";
let tempdata = document.getElementById("temp");
let winddata = document.getElementById("wind");
let uvidata = document.getElementById("uv");
let humiditydata = document.getElementById("humidity");
let cityName = document.getElementById("cityName");
let data1call = "";
//Update from start

//gets UV index based on lon and lat

fetch1call();

function fetch1call() {
  fetch(queryURL1call)
    .then((query1callResults) => query1callResults.json())
    .then((data1call) => {
      console.log(data1call.current.uvi);
      uv = data1call.current.uvi;
      console.log(uv)
    });
}

console.log("yes" + uv);

updateCityData();

//queryselector on button.

document.getElementById("searchBtn").addEventListener("click", function () {
  city = input.value;
  queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
  updateCityData();
});

console.log("yes2" + uv);

//changing City Name to city variable
function updateCityData() {
  cityName.textContent = city;
  fetchResetData();
}

console.log("yes3" + uv);

function fetchResetData() {
  fetch(queryURL)
    .then((queryResults) => queryResults.json())
    .then((data) => {
      temp = data.main.temp;
      wind = data.wind.speed;
      humidity = data.main.humidity;
      tempdata.textContent = temp;
      winddata.textContent = wind;
      humiditydata.textContent = humidity;
      lon = data.coord.lon;
      lat = data.coord.lat;
      console.log("lon = " + lon);
      console.log("lat = " + lat);
      queryURL1call = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
      fetch1call();
      uvidata.textContent = uv;
      console.log("yes4" + uv);
      console.log(uv);
    });
}

//changing temp

//retreve localStorage of stored cities

//on search, store city to localStorage

//when user searches for a city, it updates to that city

//when user searches a city, find the city (longitude and latitude?)

//provide the city name

//provide the date

//provide an icon representing weather condition

//provide temperature

//provide UV index by colour (favourable, moderate, severe)

//5day forcast with date

//5day forcast with icon of weather conditions

//when user clicks on a city in search history, it updates to that city
