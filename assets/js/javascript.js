const APIKey = "6dfd8cecea8d0220febc6bc4c30dbd34";
var city = "Brisbane";
let lon = 153.0281;
let lat = -27.4679;
var queryURLcurrent = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
var queryURL1call = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
var queryURLforcast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
let uvi = "-";
let uv = "-";
let temp = "-";
let day1temp = "-";
let wind = "-";
let day1wind = "-";
let humidity = "-";
let day1humidity = "-";
let iconN = "10d";
let input = document.querySelector("input");
let tempdata = document.getElementById("temp");
let day1tempdata = document.getElementById("day1temp");
let winddata = document.getElementById("wind");
let day1winddata = document.getElementById("day1wind");
let uvidata = document.getElementById("uv");
let humiditydata = document.getElementById("humidity");
let day1humiditydata = document.getElementById("day1humidity");
let cityName = document.getElementById("cityName");
let data1call = "";
let unix = "";

//queryselector on click of Search button updates the city name and runs the APIkey.

document.getElementById("searchBtn").addEventListener("click", function () {
  city = input.value;
  queryURLcurrent = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

  updateCityData();
});

//play functions to update data
function init() {
  updateCityData();
  fetch1call();
}

//changing City Name to city variable
function updateCityData() {
  cityName.textContent = city;
  fetchResetData();
  forcast();
}

//based on city name, function to update current weather data
function fetchResetData() {
  fetch(queryURLcurrent)
    .then((queryResults) => queryResults.json())
    .then((data) => {
      iconN = data.weather[0].icon;
      icon();
      //console.log(data);
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

//update the icon element
function icon() {
  var icon = document.createElement("img");
  icon.src = `http://openweathermap.org/img/w/${iconN}.png`;
  document.getElementById("cityName").appendChild(icon);
}

init();

function forcast() {
  fetch(queryURLforcast)
    .then((queryForcastResults) => queryForcastResults.json())
    .then((dataForcast) => {
      //unix time

      //date
      var day1icon = dataForcast.list[0].weather[0].icon;
      var day1iconN = document.createElement("img");
      day1iconN.src = `http://openweathermap.org/img/w/${day1icon}.png`;
      document.getElementById("day1icon").appendChild(day1iconN);

      //temp
      day1temp = dataForcast.list[0].main.temp;
      day1tempdata.textContent = day1temp;
      //wind
      day1wind = dataForcast.list[0].wind.speed;
      day1winddata.textContent = day1wind;
      //humidity
      day1humidity = dataForcast.list[0].main.humidity;
      day1humiditydata.textContent = day1humidity;

      //unix time

      let unixDay1 = moment.unix(dataForcast.list[0].dt).format("DD/MM/YYYY");
      let unixDay2 = moment.unix(dataForcast.list[4].dt).format("DD/MM/YYYY");
      let unixDay3 = moment.unix(dataForcast.list[12].dt).format("DD/MM/YYYY");
      let unixDay4 = moment.unix(dataForcast.list[20].dt).format("DD/MM/YYYY");
      let unixDay5 = moment.unix(dataForcast.list[28].dt).format("DD/MM/YYYY");
    });
}
