var currentWeather = document.querySelector('#current-weather-container');
var forecastContainer = document.querySelector('#forecast-container');
var prevSearches = document.querySelector('#recent-searches');
var cityForm = document.querySelector('#city-form');
var citySearch = document.querySelector('#city-search');
var cityName = document.querySelector('#city-search-name');
var forecastCityName = document.querySelector('#city-search-name-forecast');
var todaysDate = dayjs().format('MM/DD/YYYY');
var nextDate1 = dayjs().add(1, 'd').format('MM/DD/YYYY');
var nextDate2 = dayjs().add(2, 'd').format('MM/DD/YYYY');
var nextDate3 = dayjs().add(3, 'd').format('MM/DD/YYYY');
var nextDate4 = dayjs().add(4, 'd').format('MM/DD/YYYY');
var nextDate5 = dayjs().add(5, 'd').format('MM/DD/YYYY');
var apiKey = "2493754d1fbba673aa3e32978ca44e41";


function handleSearchForm(event) {
    event.preventDefault();

    var city = citySearch.value.trim()

    if (city) {
        searchCity(city);
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
            if (data.length === 0) {
                cityName.textContent = 'No City Found';
                return;
            }
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
            currentWeather.innerHTML = null;
            cityName.textContent = citySearch.value;
            console.log(data.weather[0].icon);
            var weatherEl = document.createElement('div');
            var weatherIcon = data.weather[0].icon;
            var countryId = data.sys.country
            weatherEl.classList = 'flex-row justify-content-center align-center';
            var weatherTitle = document.createElement('h4');
            var iconEl = document.createElement('img');
            iconEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}.png"/>`;
            weatherTitle.textContent = citySearch.value + ", " + countryId + ' (' + todaysDate + ")";
            weatherTitle.appendChild(iconEl);
            var conditionsListEl = document.createElement('ul');
            var temperature = document.createElement('li');
            var windSpeed = document.createElement('li');
            var humidity = document.createElement('li');
            temperature.textContent = "Temp: " + Math.floor(data.main.temp) + "°F";
            windSpeed.textContent = "Wind Speed: " + Math.floor(data.wind.speed) + "mph";
            humidity.textContent = "Humidity: " + Math.floor(data.main.humidity) + "%";
            conditionsListEl.appendChild(temperature)
            conditionsListEl.appendChild(humidity)
            conditionsListEl.appendChild(windSpeed)
            weatherEl.appendChild(weatherTitle);
            weatherEl.appendChild(conditionsListEl);
            currentWeather.appendChild(weatherEl);

            }

        )
        .catch(function(error) {
            console.log('request failed', error)
        })
}

function getWeatherForecast(lat, lon) {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
    fetch(forecastUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            forecastContainer.innerHTML = null;
            forecastCityName.textContent = citySearch.value;
            console.log(nextDate1);
            console.log(Math.floor(data.list[0].main.temp));
            console.log(Math.floor(data.list[0].main.humidity));
            console.log(Math.floor(data.list[0].wind.speed));
            console.log(nextDate2);
            console.log(Math.floor(data.list[8].main.temp));
            console.log(Math.floor(data.list[8].main.humidity));
            console.log(Math.floor(data.list[8].wind.speed));
            console.log(nextDate3);
            console.log(Math.floor(data.list[16].main.temp));
            console.log(Math.floor(data.list[16].main.humidity));
            console.log(Math.floor(data.list[16].wind.speed));
            console.log(nextDate4);
            console.log(Math.floor(data.list[24].main.temp));
            console.log(Math.floor(data.list[24].main.humidity));
            console.log(Math.floor(data.list[24].wind.speed));
            console.log(nextDate5);
            console.log(Math.floor(data.list[32].main.temp));
            console.log(Math.floor(data.list[32].main.humidity));
            console.log(Math.floor(data.list[32].wind.speed));
        })
        .catch(function(error) {
            console.log('request failed', error)
        })
}

cityForm.addEventListener("submit", handleSearchForm);

// need to create a space for the previous searched cities (will be underneath the search button)

// need to create local storage function to save previous searched cities