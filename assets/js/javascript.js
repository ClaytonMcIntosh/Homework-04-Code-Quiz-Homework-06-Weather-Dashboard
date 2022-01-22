//const APIKey = "c619a40e2d6e0fbd606e69324a112dca";
const APIKey = "6dfd8cecea8d0220febc6bc4c30dbd34";
var city = "Brisbane";
let cityObject = JSON.parse(localStorage.getItem("cityObject")) || [];
let lon = 153.0281;
let lat = -27.4679;
var queryURLcurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
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
let day2humidity = "-";
let day3humidity = "-";
let day4humidity = "-";
let day5humidity = "-";
let iconN = "10d";
let iconNday1 = "10d";
let iconNday2 = "10d";
let iconNday3 = "10d";
let iconNday4 = "10d";
let iconNday5 = "10d";
let input = document.querySelector("input");
let tempdata = document.getElementById("temp");
let day1tempdata = document.getElementById("day1temp");
let day2tempdata = document.getElementById("day2temp");
let day3tempdata = document.getElementById("day3temp");
let day4tempdata = document.getElementById("day4temp");
let day5tempdata = document.getElementById("day5temp");
let winddata = document.getElementById("wind");
let day1winddata = document.getElementById("day1wind");
let day2winddata = document.getElementById("day2wind");
let day3winddata = document.getElementById("day3wind");
let day4winddata = document.getElementById("day4wind");
let day5winddata = document.getElementById("day5wind");
let day55winddata = document.getElementById("day5wind");
let uvidata = document.getElementById("uv");
let humiditydata = document.getElementById("humidity");
let day1humiditydata = document.getElementById("day1humidity");
let day2humiditydata = document.getElementById("day2humidity");
let day3humiditydata = document.getElementById("day3humidity");
let day4humiditydata = document.getElementById("day4humidity");
let day5humiditydata = document.getElementById("day5humidity");
let cityName = document.getElementById("cityName");
let data1call = "";
let unix = "";
const historyCities = { city: "Brisbane" };

getHistoryObjectFromLocalStorage();
appendAllCityNamestoPageAtStart();
changeCityName();
noTextnoPlay();

function getHistoryObjectFromLocalStorage() {
  cityObject = JSON.parse(localStorage.getItem("cityObject")) || [];
}

function changeCityName() {
  // noTextnoPlay();
  document.getElementById("searchBtn").addEventListener("click", function () {
    city = input.value;
    addCityNametoButtonandAppendtoPage();
  });
}

function noTextnoPlay() {
  if (document.getElementById("input_text").value === "") {
    document.getElementById("searchBtn").disabled = true;
  } else {
    document.getElementById("searchBtn").disabled = false;
  }
}

function addCityNametoButtonandAppendtoPage() {
  let histButton = document.createElement("button");
  //histButton.id = `button${city}`;
  histButton.className = "button";
  histButton.textContent = city;
  document.getElementById("history").appendChild(histButton);
  addCityNametoLocalStorage();
}

function appendAllCityNamestoPageAtStart() {
  for (i = 0; i < cityObject.length; i++) {
    let histButton = document.createElement("button");
    // histButton.id = `button${city}`;
    histButton.className = "button";
    histButton.textContent = cityObject[i];
    document.getElementById("history").appendChild(histButton);
  }
}

function addCityNametoLocalStorage() {
  cityObject.unshift(city);
  localStorage.setItem("cityObject", JSON.stringify(cityObject));
}

//adding onclick to dynamicly created events

var element = document.querySelector("#history");
element.onclick = function () {
  city = city = event.target.textContent;
  queryURLcurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
  updateCityData();
};

//queryselector on click of Search button updates the city name and runs the APIkey.

document.getElementById("searchBtn").addEventListener("click", function () {
  city = input.value;
  queryURLcurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

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
  forcast();
  fetchResetData();
}

//based on city name, function to update current weather data
function fetchResetData() {
  fetch(queryURLcurrent)
    .then((queryResults) => queryResults.json())
    .then((data) => {
      iconN = data.weather[0].icon;
      icon();
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
      console.log(uvi);
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
  queryURLforcast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
  fetch(queryURLforcast)
    .then((queryForcastResults) => queryForcastResults.json())
    .then((dataForcast) => {
      //icon
      $("#day1icon").empty();
      $("#day2icon").empty();
      $("#day3icon").empty();
      $("#day4icon").empty();
      $("#day5icon").empty();
      var day1iconN = dataForcast.list[0].weather[0].icon;
      var day2iconN = dataForcast.list[4].weather[0].icon;
      var day3iconN = dataForcast.list[12].weather[0].icon;
      var day4iconN = dataForcast.list[20].weather[0].icon;
      var day5iconN = dataForcast.list[28].weather[0].icon;
      var day1icon = document.createElement("img");
      var day2icon = document.createElement("img");
      var day3icon = document.createElement("img");
      var day4icon = document.createElement("img");
      var day5icon = document.createElement("img");
      day1icon.src = `https://openweathermap.org/img/w/${day1iconN}.png`;
      day2icon.src = `https://openweathermap.org/img/w/${day2iconN}.png`;
      day3icon.src = `https://openweathermap.org/img/w/${day3iconN}.png`;
      day4icon.src = `https://openweathermap.org/img/w/${day4iconN}.png`;
      day5icon.src = `https://openweathermap.org/img/w/${day5iconN}.png`;
      document.getElementById("day1icon").appendChild(day1icon);
      document.getElementById("day2icon").appendChild(day2icon);
      document.getElementById("day3icon").appendChild(day3icon);
      document.getElementById("day4icon").appendChild(day4icon);
      document.getElementById("day5icon").appendChild(day5icon);

      //temp
      day1temp = dataForcast.list[0].main.temp;
      day2temp = dataForcast.list[4].main.temp;
      day3temp = dataForcast.list[12].main.temp;
      day4temp = dataForcast.list[20].main.temp;
      day5temp = dataForcast.list[28].main.temp;
      day1tempdata.textContent = day1temp;
      day2tempdata.textContent = day2temp;
      day3tempdata.textContent = day3temp;
      day4tempdata.textContent = day4temp;
      day5tempdata.textContent = day5temp;
      //wind
      day1wind = dataForcast.list[0].wind.speed;
      day2wind = dataForcast.list[4].wind.speed;
      day3wind = dataForcast.list[12].wind.speed;
      day4wind = dataForcast.list[20].wind.speed;
      day5wind = dataForcast.list[28].wind.speed;
      day1winddata.textContent = day1wind;
      day2winddata.textContent = day2wind;
      day3winddata.textContent = day3wind;
      day4winddata.textContent = day4wind;
      day5winddata.textContent = day5wind;
      //humidity
      day1humidity = dataForcast.list[0].main.humidity;
      day2humidity = dataForcast.list[4].main.humidity;
      day3humidity = dataForcast.list[12].main.humidity;
      day4humidity = dataForcast.list[20].main.humidity;
      day5humidity = dataForcast.list[28].main.humidity;
      day1humiditydata.textContent = day1humidity;
      day2humiditydata.textContent = day2humidity;
      day3humiditydata.textContent = day3humidity;
      day4humiditydata.textContent = day4humidity;
      day5humiditydata.textContent = day5humidity;
      //unix time
      let unixDay2 = moment.unix(dataForcast.list[4].dt).format("DD/MM/YYYY");
      let unixDay3 = moment.unix(dataForcast.list[12].dt).format("DD/MM/YYYY");
      let unixDay4 = moment.unix(dataForcast.list[20].dt).format("DD/MM/YYYY");
      let unixDay5 = moment.unix(dataForcast.list[28].dt).format("DD/MM/YYYY");
      document.getElementById("day2date").textContent = unixDay2;
      document.getElementById("day3date").textContent = unixDay3;
      document.getElementById("day4date").textContent = unixDay4;
      document.getElementById("day5date").textContent = unixDay5;
    });
}
