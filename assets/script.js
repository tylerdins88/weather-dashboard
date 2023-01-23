var currentWeather = $("#currentWeather");
var futureWeather = $("#futureWeather");
var fiveDay = $("#fiveDay")
var fetchBtn = $("#fetchBtn");
var prevLocations = $("#prevLocations")
var enteredLoc = "";
var listMain = "";
var weatherData;
var weatherLoc = "";
// current format of timeNow is in milliseconds since epoch
var timeNow = dayjs().unix();
// var iconUrl = `https://openweathermap.org/img/w/${** your - data - ojb **.icon}.png`;

function getWeatherAPI(event) {
    event.preventDefault();
    weatherLoc = $("#weatherLoc").val();
    console.log(weatherLoc);
    // var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?q=" + weatherLoc + "&appid=c3f6b2733fb2d47bd01e52a022b99a72"
    var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?zip=" + weatherLoc + "&units=imperial&appid=e655f88c2e522bfcf96e8b9280a63f61"
    // var weatherAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + weatherLoc + "&limit=5&appid=c3f6b2733fb2d47bd01e52a022b99a72"

    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            weatherData = data;
            addLoc();
            showCurrentWeather();
        })

    function listFetch(event) {
        event.preventDefault();
        var listLoc = event.target.id
        console.log(listLoc)

        var listAPI = "http://api.openweathermap.org/data/2.5/forecast?zip=" + listLoc + "&units=imperial&appid=e655f88c2e522bfcf96e8b9280a63f61"

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

    function showCurrentWeather() {
        enteredLoc = weatherData.city.name;
        console.log(enteredLoc, weatherData.list[0].main.temp, weatherData.list[0].weather[0].description, weatherData.list[0].wind.speed, weatherData.list[0].main.humidity);
        currentWeather.text("The current weather for " + enteredLoc + " at " + dayjs().format("dddd, MMMM D, YYYY") + " is as follows:");
        $("#currentStats").addClass("currentData")
        $("#currentIcon").val("https://openweathermap.org/img/w/$weatherData.icon.png");
        $("#currentTemp").text(weatherData.list[0].main.temp + " Degrees F");
        $("#currentSky").text(weatherData.list[0].weather[0].description);
        $("#currentWind").text(weatherData.list[0].wind.speed + " MPH");
        $("#currentHumidity").text(weatherData.list[0].main.humidity + " Percent");
        showFutureWeather();
    }

    function showFutureWeather() {
        var index = 7;
        for (i = 0; i < 5; i++) {
            console.log(enteredLoc, weatherData.list[index].main.temp, weatherData.list[index].weather[0].description, weatherData.list[index].wind.speed, weatherData.list[index].main.humidity);
            futureWeather.text("The 5 day forecast for " + enteredLoc + " is as follows:");
            var nextDay = document.createElement("li");
            var futureTemp = document.createElement("p");
            futureTemp.textContent = (weatherData.list[index].main.temp + " Degrees F");
            nextDay.append(futureTemp);
            var futureSky = document.createElement("p");
            futureSky.textContent = (weatherData.list[index].weather[0].description);
            nextDay.append(futureSky);
            var futureWind = document.createElement("p");
            futureWind.textContent = (weatherData.list[index].wind.speed + " MPH");
            nextDay.append(futureWind);
            var futureHumidity = document.createElement("p");
            futureHumidity.textContent = (weatherData.list[index].main.humidity + " Percent")
            nextDay.append(futureHumidity);
            fiveDay.append(nextDay)
            index += 8;
        }
    }
}

fetchBtn.on("click", getWeatherAPI);

// function checkValue(event) {
//     weatherLoc = $("#weatherLoc").val();
//     event.preventDefault
//     if (weatherLoc > 99950 || weatherLoc < 0) {
//         alert("Please enter a valid Zip Code.")
//     } else {
//         getWeatherAPI();
//     }
// }

// need to link dayJS

// when page opens. have local storage location displayed.
// if local storage empty, have random weather location displayed. 

// once i get the data i need. 
// i need to find the date, tempature, wind, humidity for 
// current day & 5 day forecast. 
// i need to amend this to the page. 
// i need to amend this with a class to give it a style
// i need to save the location to local storage. zip is key, value is api call
// i need to create a list to add cities as the user searches. 
// i need to amend the cities with classes for style. 
// the list items need to be buttons. 
// the buttons have the city displayed as its text. 
// when you click the button, it pulls the info from local storage to bring up a forecast


