var weather = $("#displayWeather")
var fetchBtn = $("#fetchBtn")

function getWeatherAPI() {
    console.log("Hello")
    var weatherAPI = "http://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=3&appid=e655f88c2e522bfcf96e8b9280a63f61"

    fetch(weatherAPI)
    console.log("Hello")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            weather.textContent = data;
        })
}

fetchBtn.on("click", getWeatherAPI);
