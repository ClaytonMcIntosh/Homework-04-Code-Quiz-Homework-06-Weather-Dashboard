const APIKey = "6dfd8cecea8d0220febc6bc4c30dbd34";
var city = "Brisbane";
var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

fetch(queryURL)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.coord);
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
  });

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
