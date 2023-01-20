var currentWeather = $("#currentWeather");
var fetchBtn = $("#fetchBtn");
var prevLocations = $("#prevLocations")
var enteredLoc = "";
var listMain = "";
var weatherData;
// current format of timeNow is in milliseconds since epoch
var timeNow = dayjs().unix();
// var iconUrl = `https://openweathermap.org/img/w/${** your - data - ojb **.icon}.png`;

function getWeatherAPI(event) {
    event.preventDefault();
    var weatherLoc = $("#weatherLoc").val();
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

    // function listFetch(event) {
    //     event.preventDefault();
    //     var listLoc = // need this to be the button value

    //     var listAPI = "http://api.openweathermap.org/data/2.5/forecast?zip=" + listLoc + "&units=imperial&appid=e655f88c2e522bfcf96e8b9280a63f61"

    //     fetch(listAPI)
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             console.log(data);
    //             weatherData = data;
    //             showCurrentWeather()
    //         })
    // }

    function addLoc() {
        enteredLoc = weatherData.city.name;
        console.log(enteredLoc);
        var lastListed = document.createElement("li");
        var lastLocation = document.createElement("input");
        lastLocation.setAttribute("type", "submit");
        lastLocation.setAttribute("class", "btn btn-primary");
        lastLocation.setAttribute("value", enteredLoc);
        lastLocation.addEventListener("click", getWeatherAPI)
        lastListed.append(lastLocation);
        prevLocations.append(lastListed);
        // i need to make this button link back to the listed api
    }

    function showCurrentWeather() {
        // i need to find the date, tempature, wind, humidity for 
        enteredLoc = weatherData.city.name;
        var currentTemp = weatherData.list[0].main.temp + " Degrees F";
        var currentSky = weatherData.list[0].weather[0].description;
        var currentWind = weatherData.list[0].wind.speed + " MPH";
        var currentHumidity = weatherData.list[0].main.humidity + " Percent";
        console.log(enteredLoc, currentTemp, currentSky, currentWind, currentHumidity);
        currentWeather.text("The current weather for " + enteredLoc + " at " + dayjs().format("dddd, MMMM D, YYYY") + " is as follows:");
        currentWeather.append(currentTemp);
        currentWeather.append(currentSky);
        currentWeather.append(currentWind);
        currentWeather.append(currentHumidity);

    }
}

fetchBtn.on("click", getWeatherAPI);

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


