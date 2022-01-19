const APIKey = "6dfd8cecea8d0220febc6bc4c30dbd34";
var city = "Brisbane";
let uvi = "-";
let uv = "-";
let lon = 153.0281;
let lat = -27.4679;
var queryURLcurrent = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
var queryURL1call = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
let temp = "-";
let wind = "-";
let input = document.querySelector("input");
let tempdata = document.getElementById("temp");
let winddata = document.getElementById("wind");
let uvidata = document.getElementById("uv");
let humiditydata = document.getElementById("humidity");
let cityName = document.getElementById("cityName");
let data1call = "";

//queryselector on click of Search button updates the city name and runs the APIkey.

document.getElementById("searchBtn").addEventListener("click", function () {
  city = input.value;
  queryURLcurrent = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
  updateCityData();
});

function init() {
  updateCityData();
  fetch1call();
}

//changing City Name to city variable
function updateCityData() {
  cityName.textContent = city;
  fetchResetData();
}

function fetchResetData() {
  fetch(queryURLcurrent)
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
      queryURL1call = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
      fetch1call();
    });
}

//gets UV index based on lon and lat

function fetch1call() {
  fetch(queryURL1call)
    .then((query1callResults) => query1callResults.json())
    .then((data1call) => {
      queryURL1call = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
      uv = data1call.current.uvi;
      uvidata.textContent = uv;
      if (uv == 0) {
        uvidata.className = "classblack";
      } else if (uv <= 2) {
        uvidata.className = "classgreen";
      } else if (uv <= 7) {
        uvidata.className = "classorange";
      } else {
        uvidata.className = "classred";
      }
    });
}

init();

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
