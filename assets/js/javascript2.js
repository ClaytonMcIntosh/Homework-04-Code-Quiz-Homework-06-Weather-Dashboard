let input = document.querySelector("input");
let city = "Cape Town";
let cityArray = ["Brisbane"];
let cityObject = { Cities: cityArray };

localStorage.setItem("cityObject", JSON.stringify(cityObject));

getHistoryObjectFromLocalStorage();
appendAllCityNamestoPageAtStart();
changeCityName();

function getHistoryObjectFromLocalStorage() {
  const retrievedcityObject = localStorage.getItem("cityObject");
  cityObject = JSON.parse(retrievedcityObject);
  console.log(cityObject);
cityArray = cityObject.Cities;
}

function changeCityName() {
  document.getElementById("searchBtn").addEventListener("click", function () {
    city = input.value;
    addCityNametoButtonandAppendtoPage();
  });
}

function addCityNametoButtonandAppendtoPage() {
  let histButton = document.createElement("button");
  histButton.textContent = city;
  document.getElementById("history").appendChild(histButton);
  addCityNametoLocalStorage();
}

function appendAllCityNamestoPageAtStart() {
  let histButton = document.createElement("button");
  for (i = 0; i < cityArray.length; i++) {
    histButton.textContent = cityArray[i];
    document.getElementById("history").appendChild(histButton);
  }
}

function addCityNametoLocalStorage() {
  cityArray.unshift(city);
  localStorage.setItem("cityObject", JSON.stringify(cityObject));
}
