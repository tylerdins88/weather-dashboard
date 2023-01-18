var weather = $("#displayWeather");
var fetchBtn = $("#fetchBtn");

function getWeatherAPI() {
    var weatherLoc = $("#weatherLoc").val();
    console.log(weatherLoc)
    // var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?q=" + weatherLoc + "&c3f6b2733fb2d47bd01e52a022b99a72"
    // var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?zip=" + weatherLoc + "&appid=e655f88c2e522bfcf96e8b9280a63f61"
    var weatherAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + weatherLoc + "&limit=5&appid=e655f88c2e522bfcf96e8b9280a63f61"

    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

fetchBtn.on("click", getWeatherAPI);
