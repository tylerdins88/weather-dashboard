var currentWeather = $("#currentWeather");
var fetchBtn = $("#fetchBtn");
var prevLocations = $("#prevLocations")


function getWeatherAPI(event) {
    event.preventDefault();
    var weatherLoc = $("#weatherLoc").val();
    console.log(weatherLoc)
    // var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?q=" + weatherLoc + "&appid=c3f6b2733fb2d47bd01e52a022b99a72"
    var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?zip=" + weatherLoc + "&appid=e655f88c2e522bfcf96e8b9280a63f61"
    // var weatherAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + weatherLoc + "&limit=5&appid=c3f6b2733fb2d47bd01e52a022b99a72"

    var enteredLoc = "";
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            enteredLoc = data.city.name
            console.log(enteredLoc)
            addLoc();
        })


    function addLoc() {
        console.log("Hello")
        var lastLocation = document.createElement("button")
        lastLocation.setAttribute("type", "submit")
        lastLocation.setAttribute("class", "lastLocation")
        lastLocation.textContent = enteredLoc
        prevLocations.append(lastLocation)
    }
}

fetchBtn.on("click", getWeatherAPI);

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


