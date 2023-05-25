var currentWeather = document.querySelector('#current-weather-container');
var forecastContainer = document.querySelector('#forecast-container');
var prevSearches = document.querySelector('#recent-searches');
var cityForm = document.querySelector('#city-form');
var citySearch = document.querySelector('#city-search');
var cityName = document.querySelector('#city-search-name');
var todaysDate = dayjs().format('MM/DD/YYYY');
var apiKey = "2493754d1fbba673aa3e32978ca44e41";


function handleSearchForm(event) {
    event.preventDefault();

    var city = citySearch.value.trim()

    if (city) {
        searchCity(city);

        citySearch.value = '';
    }
}



function searchCity(city) {
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

    fetch(geoUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for (var result of data) {
                console.log(result.lat);
                console.log(result.lon);
                var lat = result.lat
                var lon = result.lon
                getCurrentWeather(lat, lon)
                getWeatherForecast(lat, lon)
            }
        })
        .catch(function(error) {
            console.log('request failed', error)
        })
}

function getCurrentWeather(lat, lon) {
    var currWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
    fetch(currWeatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            // console.log(data.main.temp)
            currentWeather.innerHTML = null;
            cityName.textContent = citySearch.value;
            if (data.length === 0) {
                cityName.textContent = 'No City Found';
                return;
            }
            for (var result of data.weather) {
                console.log(result.main.temp)
                // var weatherEl = document.createElement('div');
                // var weatherIcon = result.weather.icon;
                // var countryId = result.sys.country
                // weatherEl.classList = 'flex-row justify-content-center align-center';
                // var weatherTitle = document.createElement('h4');
                // weatherTitle.textContent = citySearch.value + ", " + countryId + ' (' + todaysDate + ") " + weatherIcon;
                // var conditionsListEl = document.createElement('ul');
                // var temperature = document.createElement('li');
                // var windSpeed = document.createElement('li');
                // var humidity = document.createElement('li');
                // temperature.textContent = result.main.temp;
                // windSpeed.textContent = result.wind.speed;
                // humidity.textContent = result.main.humidity;
                // conditionsListEl.appendChild(temperature, windSpeed, humidity)
                // weatherEl.appendChild(weatherTitle, conditionsListEl);
                // currentWeather.appendChild(weatherEl);

            }

        })
        // .catch(function(error) {
        //     console.log('request failed', error)
        // })
}

function getWeatherForecast(lat, lon) {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
    fetch(forecastUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error) {
            console.log('request failed', error)
        })
}

cityForm.addEventListener("submit", handleSearchForm);

// need to create a space for the previous searched cities (will be underneath the search button)

// need to create local storage function to save previous searched cities