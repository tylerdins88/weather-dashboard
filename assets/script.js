var currentWeather = $("#currentWeather");
var futureWeather = $("#futureWeather");
var fiveDay = $("#fiveDay")
var fetchBtn = $("#fetchBtn");
var prevLocations = $("#prevLocations")
var enteredLoc = "";
var listMain = "";
var weatherData;
var weatherLoc = "";

function getWeatherAPI(event) {
    event.preventDefault();

    weatherLoc = $("#weatherLoc").val();
    console.log(weatherLoc);
    var weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?zip=" + weatherLoc + "&units=imperial&appid=e655f88c2e522bfcf96e8b9280a63f61"

    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            weatherData = data;
            document.getElementById("weatherLoc").innerHTML = "Zip Code:"
            showCurrentWeather();
            addLoc();
        })
}


fetchBtn.on("click", getWeatherAPI);

function showCurrentWeather() {
    enteredLoc = weatherData.city.name;
    var showIcon = ("https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png");
    var skyConditions = weatherData.list[0].weather[0].description.split(" ");
    var capitalSky;
    function upperCaseSky() {
        return capitalSky = skyConditions[0].charAt(0).toUpperCase() + skyConditions[0].slice(1) + " " + skyConditions[1].charAt(0).toUpperCase() + skyConditions[1].slice(1)
    }

    console.log(enteredLoc, weatherData.list[0].main.temp, weatherData.list[0].weather[0].description, weatherData.list[0].wind.speed, weatherData.list[0].main.humidity);
    currentWeather.text("The current weather for " + enteredLoc + " at " + dayjs().format("dddd, MMMM D, YYYY") + " is as follows:");

    $("#currentStats").addClass("currentData")
    $("#currentTemp").text("Temp: " + weatherData.list[0].main.temp + "° F");
    $("#currentIcon").attr("src", showIcon)
    $("#currentSky").text("Sky: " + upperCaseSky());
    $("#currentWind").text("Wind: " + weatherData.list[0].wind.speed + " MPH");
    $("#currentHumidity").text("Humidity: " + weatherData.list[0].main.humidity + " %");
    showFutureWeather();
}

function showFutureWeather() {

    document.getElementById("fiveDay").innerHTML = "";
    var index = 7;

    for (i = 0; i < 5; i++) {
        var skyConditions = weatherData.list[index].weather[0].description.split(" ");
        var capitalSky;
        function upperCaseSky() {
            return capitalSky = skyConditions[0].charAt(0).toUpperCase() + skyConditions[0].slice(1) + " " + skyConditions[1].charAt(0).toUpperCase() + skyConditions[1].slice(1)
        }

        console.log(enteredLoc, weatherData.list[index].main.temp, weatherData.list[index].weather[0].description, weatherData.list[index].wind.speed, weatherData.list[index].main.humidity);
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

        var futureSky = document.createElement("p");
        futureSky.textContent = ("Sky: " + upperCaseSky());
        nextDay.append(futureSky);

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

function addLoc() {
    enteredLoc = weatherData.city.name;
    console.log(enteredLoc);

    var lastListed = document.createElement("li");
    var lastLocation = document.createElement("button");
    lastLocation.innerHTML = enteredLoc;
    lastLocation.setAttribute("class", "btn btn-primary");
    lastLocation.setAttribute("id", weatherLoc);
    lastLocation.addEventListener("click", listFetch)
    lastListed.append(lastLocation);
    prevLocations.append(lastListed);
}

function listFetch(event) {
    event.preventDefault();

    var listLoc = event.target.id
    console.log(listLoc)
    var listAPI = "https://api.openweathermap.org/data/2.5/forecast?zip=" + listLoc + "&units=imperial&appid=e655f88c2e522bfcf96e8b9280a63f61"

    fetch(listAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            weatherData = data;
            showCurrentWeather();
        })
}