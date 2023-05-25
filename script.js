var currentWeather = document.querySelector('#current-weather-container');
var forecastContainer = document.querySelector('#forecast-container');
var prevSearchEl = document.querySelector('#recent-searches');
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
var forecast2 = document.querySelector('#next-day2');
var forecast3 = document.querySelector('#next-day3');
var forecast4 = document.querySelector('#next-day4');
var forecast5 = document.querySelector('#next-day5');
var apiKey = "2493754d1fbba673aa3e32978ca44e41";
var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

function handleSearchForm(event) {
    event.preventDefault();

    var city = citySearch.value.trim()

    if (city) {
        searchCity(city);
        storeCity()
    }
}

function buttonClickHandler(event) {
    var city = event.target.textContent
    citySearch.value = city
    if (city) {
        searchCity(city)
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
                forecastCityName.textContent = 'No City Found';
                currentWeather.innerHTML = null;
                forecastContainer.innerHTML = null;
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
prevCityIndex = 0;
function displayPrevSearch() {
    for (var i = 0; i < recentSearches.length; i++) {
        var prevCityBtn = document.createElement('button');
        prevCityBtn.classList = 'btn';
        prevCityBtn.textContent = recentSearches[prevCityIndex];
        prevCityIndex++

        prevSearchEl.appendChild(prevCityBtn);
    }
}

function storeCity() {
    var prevCity = citySearch.value
    if (prevCity !== '') {
        recentSearches.push(prevCity);
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
    displayPrevSearch();
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
            currentWeather.classList = "card"
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
            
            var forecast1 = document.createElement('div');
            forecast1.classList = "card"
            var forecast1Date = document.createElement('h5')
            forecast1Date.textContent = nextDate1;
            var conditionsListEl = document.createElement('ul');
            var temperature = document.createElement('li');
            var windSpeed = document.createElement('li');
            var humidity = document.createElement('li');
            temperature.textContent = "Temp: " + Math.floor(data.list[0].main.temp) + "°F";
            windSpeed.textContent = "Wind Speed: " + Math.floor(data.list[0].main.humidity) + "mph";
            humidity.textContent = "Humidity: " + Math.floor(data.list[0].wind.speed) + "%";
            conditionsListEl.appendChild(temperature);
            conditionsListEl.appendChild(humidity);
            conditionsListEl.appendChild(windSpeed);
            forecast1.appendChild(forecast1Date);
            forecast1.appendChild(conditionsListEl);
            forecastContainer.appendChild(forecast1);
            // console.log(nextDate1);
            // console.log(Math.floor(data.list[0].main.temp));
            // console.log(Math.floor(data.list[0].main.humidity));
            // console.log(Math.floor(data.list[0].wind.speed));

            var forecast2 = document.createElement('div');
            forecast2.classList = "card"
            var forecast2Date = document.createElement('h5')
            forecast2Date.textContent = nextDate2;
            var conditionsListEl = document.createElement('ul');
            var temperature = document.createElement('li');
            var windSpeed = document.createElement('li');
            var humidity = document.createElement('li');
            temperature.textContent = "Temp: " + Math.floor(data.list[8].main.temp) + "°F";
            windSpeed.textContent = "Wind Speed: " + Math.floor(data.list[8].main.humidity) + "mph";
            humidity.textContent = "Humidity: " + Math.floor(data.list[8].wind.speed) + "%";
            conditionsListEl.appendChild(temperature);
            conditionsListEl.appendChild(humidity);
            conditionsListEl.appendChild(windSpeed);
            forecast2.appendChild(forecast2Date);
            forecast2.appendChild(conditionsListEl);
            forecastContainer.appendChild(forecast2);
            // console.log(nextDate2);
            // console.log(Math.floor(data.list[8].main.temp));
            // console.log(Math.floor(data.list[8].main.humidity));
            // console.log(Math.floor(data.list[8].wind.speed));

            var forecast3 = document.createElement('div');
            forecast3.classList = "card"
            var forecast3Date = document.createElement('h5')
            forecast3Date.textContent = nextDate3;
            var conditionsListEl = document.createElement('ul');
            var temperature = document.createElement('li');
            var windSpeed = document.createElement('li');
            var humidity = document.createElement('li');
            temperature.textContent = "Temp: " + Math.floor(data.list[16].main.temp) + "°F";
            windSpeed.textContent = "Wind Speed: " + Math.floor(data.list[16].main.humidity) + "mph";
            humidity.textContent = "Humidity: " + Math.floor(data.list[16].wind.speed) + "%";
            conditionsListEl.appendChild(temperature);
            conditionsListEl.appendChild(humidity);
            conditionsListEl.appendChild(windSpeed);
            forecast3.appendChild(forecast3Date);
            forecast3.appendChild(conditionsListEl);
            forecastContainer.appendChild(forecast3);
            // console.log(nextDate3);
            // console.log(Math.floor(data.list[16].main.temp));
            // console.log(Math.floor(data.list[16].main.humidity));
            // console.log(Math.floor(data.list[16].wind.speed));

            var forecast4 = document.createElement('div');
            forecast4.classList = "card"
            var forecast4Date = document.createElement('h5')
            forecast4Date.textContent = nextDate4;
            var conditionsListEl = document.createElement('ul');
            var temperature = document.createElement('li');
            var windSpeed = document.createElement('li');
            var humidity = document.createElement('li');
            temperature.textContent = "Temp: " + Math.floor(data.list[24].main.temp) + "°F";
            windSpeed.textContent = "Wind Speed: " + Math.floor(data.list[24].main.humidity) + "mph";
            humidity.textContent = "Humidity: " + Math.floor(data.list[24].wind.speed) + "%";
            conditionsListEl.appendChild(temperature);
            conditionsListEl.appendChild(humidity);
            conditionsListEl.appendChild(windSpeed);
            forecast4.appendChild(forecast4Date);
            forecast4.appendChild(conditionsListEl);
            forecastContainer.appendChild(forecast4);
            // console.log(nextDate4);
            // console.log(Math.floor(data.list[24].main.temp));
            // console.log(Math.floor(data.list[24].main.humidity));
            // console.log(Math.floor(data.list[24].wind.speed));

            var forecast5 = document.createElement('div');
            forecast5.classList = "card"
            var forecast5Date = document.createElement('h5')
            forecast5Date.textContent = nextDate5;
            var conditionsListEl = document.createElement('ul');
            var temperature = document.createElement('li');
            var windSpeed = document.createElement('li');
            var humidity = document.createElement('li');
            temperature.textContent = "Temp: " + Math.floor(data.list[32].main.temp) + "°F";
            windSpeed.textContent = "Wind Speed: " + Math.floor(data.list[32].main.humidity) + "mph";
            humidity.textContent = "Humidity: " + Math.floor(data.list[32].wind.speed) + "%";
            conditionsListEl.appendChild(temperature);
            conditionsListEl.appendChild(humidity);
            conditionsListEl.appendChild(windSpeed);
            forecast5.appendChild(forecast5Date);
            forecast5.appendChild(conditionsListEl);
            forecastContainer.appendChild(forecast5);
            // console.log(nextDate5);
            // console.log(Math.floor(data.list[32].main.temp));
            // console.log(Math.floor(data.list[32].main.humidity));
            // console.log(Math.floor(data.list[32].wind.speed));
        })
        .catch(function(error) {
            console.log('request failed', error)
        })
}

cityForm.addEventListener("submit", handleSearchForm);
prevSearchEl.addEventListener('click', buttonClickHandler);