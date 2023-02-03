// These are my global variables
var currentWeather = $("#currentWeather");
var futureWeather = $("#futureWeather");
var fiveDay = $("#fiveDay")
var fetchBtn = $("#fetchBtn");
var prevLocations = $("#prevLocations")
var enteredLoc = "";
var listMain = "";
var weatherData;
var weatherLoc = "";
var lat = "";
var lon = "";
var storedLoc = JSON.parse(localStorage.getItem("locWanted")) || [];

// This is the first function that runs when you fetch the weather. 
function getLatLon(event) {
    event.preventDefault();

    weatherLoc = $("#weatherLoc").val();
    console.log(weatherLoc)
    retrieveData(weatherLoc);
}

// This calls the api using the inputed city
function retrieveData(weatherLoc) {

    var nameAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + weatherLoc + "&limit=5&appid=e655f88c2e522bfcf96e8b9280a63f61"

    fetch(nameAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(weatherLoc)
            lat = data[0].lat;
            lon = data[0].lon;
            // This runs the api for the 5 day forecast
            getWeatherAPI();
            if (storedLoc.includes(weatherLoc) || ($("#weatherLoc").val() === "")) {
                return;
            } else {
                // Here is where i am storing my entered city in localstorage with a capital
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
                storedLoc.push(capitalizeFirstLetter(weatherLoc));
                localStorage.setItem("locWanted", JSON.stringify(storedLoc));
                addLoc();
            }
        })
}

// The api used to get my extended forecast
function getWeatherAPI() {

    var weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=e655f88c2e522bfcf96e8b9280a63f61"

    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            weatherData = data;
            showCurrentWeather();
        })
}

// Displays the information for the current weather
function showCurrentWeather() {
    enteredLoc = weatherData.city.name;
    var showIcon = ("https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png");

    console.log(enteredLoc, weatherData.list[0].main.temp, weatherData.list[0].wind.speed, weatherData.list[0].main.humidity);
    currentWeather.text("The current weather for " + enteredLoc + " at " + dayjs().format("dddd, MMMM D, YYYY") + " is as follows:");

    $("#currentStats").addClass("currentData")
    $("#currentTemp").text("Temp: " + weatherData.list[0].main.temp + "° F");
    $("#currentIcon").attr("src", showIcon)
    $("#currentWind").text("Wind: " + weatherData.list[0].wind.speed + " MPH");
    $("#currentHumidity").text("Humidity: " + weatherData.list[0].main.humidity + " %");
    showFutureWeather();
}

// Displays the 5 day extend forecast
function showFutureWeather() {

    document.getElementById("fiveDay").innerHTML = "";
    var index = 7;

    for (i = 0; i < 5; i++) {

        console.log(enteredLoc, weatherData.list[index].main.temp, weatherData.list[index].wind.speed, weatherData.list[index].main.humidity);
        futureWeather.text("The 5 day forecast for " + enteredLoc + " is as follows:");

        var nextDay = document.createElement("div");
        nextDay.classList.add("col")
        nextDay.classList.add("future")

        var futureTime = dayjs().add(i + 1, "day").format("dddd, MMMM D")
        var futureDate = document.createElement("p");
        futureDate.textContent = (futureTime)
        nextDay.appendChild(futureDate);

        var futureTemp = document.createElement("p");
        futureTemp.textContent = ("Temp: " + weatherData.list[index].main.temp + "° F");
        nextDay.appendChild(futureTemp);

        var futureIcon = document.createElement("img")
        futureIcon.setAttribute("src", ("https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png"));
        nextDay.appendChild(futureIcon)

        var futureWind = document.createElement("p");
        futureWind.textContent = ("Wind: " + weatherData.list[index].wind.speed + " MPH");
        nextDay.append(futureWind);

        var futureHumidity = document.createElement("p");
        futureHumidity.textContent = ("Humidity: " + weatherData.list[index].main.humidity + " %")
        nextDay.append(futureHumidity);

        fiveDay.append(nextDay)
        index += 8;
    }
}

// Adds the city to a list to search
function addLoc() {
    var lastListed = document.createElement("li");
    var lastLocation = document.createElement("button");
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    lastLocation.innerHTML = capitalizeFirstLetter(weatherLoc);
    lastLocation.setAttribute("class", "btn btn-primary");
    lastLocation.addEventListener("click", grabStorage)
    lastListed.append(lastLocation);
    prevLocations.append(lastListed);

}

// function to grab item from local storage
function grabStorage(event) {
    var keyWanted = event.target.textContent
    console.log(keyWanted)
    retrieveData(keyWanted);
}

// uses local storage to display the list
function showPreviousLoc() {
    for (var i = 0; i < storedLoc.length; i++) {
        var lastListed = document.createElement("li");
        var lastLocation = document.createElement("button");

        lastLocation.innerHTML = storedLoc[i];
        lastLocation.setAttribute("class", "btn btn-primary");
        lastLocation.addEventListener("click", grabStorage)
        lastListed.append(lastLocation);
        prevLocations.append(lastListed);
    }

}

showPreviousLoc();

fetchBtn.on("click", getLatLon);