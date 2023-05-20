var currentWeather = document.querySelector('#city-current-weather');
var forecast = document.querySelector('#forecast');
var prevSearches = document.querySelector('#prev-searches')

function searchWeather(weather, format) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}')
    // what results do we need from the weatherAPI? 5-day forecast, temp, wind, humidity
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var result of data.results) {
                // need to create cards for each of the five days as well as a card to display current weather and date
            }
        })
}

// need to create a space for the previous searched cities (will be underneath the search button)

// need to create local storage function to save previous searched cities