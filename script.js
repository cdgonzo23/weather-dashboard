var currentWeather = document.querySelector('#current-weather-container');
var forecastContainer = document.querySelector('#forecast-container');
var prevSearchEl = document.querySelector('#recent-searches');
var cityForm = document.querySelector('#city-form');
var citySearch = document.querySelector('#city-search');
var cityName = document.querySelector('#city-search-name');
var forecastCityName = document.querySelector('#city-search-name-forecast');
var todaysDate = dayjs().format('MM/DD/YYYY');
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
        if (prevCityBtn.textContent !== "") {
            prevSearchEl.appendChild(prevCityBtn); 
        }
    }
}

function storeCity() {
    var prevCity = citySearch.value
    if (prevCity !== '' && !recentSearches.includes(prevCity)) {
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
            currentWeather.innerHTML = '';
            currentWeather.setAttribute("class","card px-2")
            cityName.textContent = citySearch.value;
            console.log(data.weather[0].icon);
          
            var weatherIcon = data.weather[0].icon;
            var countryId = data.sys.country
           
            var weatherTitle = document.createElement('h4');
            var iconEl = document.createElement('img');
            iconEl.setAttribute('src', `http://openweathermap.org/img/w/${weatherIcon}.png`)
           
            weatherTitle.textContent = citySearch.value + ", " + countryId + ' (' + todaysDate + ")";
            weatherTitle.appendChild(iconEl);
            
            var temperature = document.createElement('p');
            var windSpeed = document.createElement('p');
            var humidity = document.createElement('p');
            temperature.textContent = "Temperature: " + Math.floor(data.main.temp) + "°F";
            windSpeed.textContent = "Wind Speed: " + Math.floor(data.wind.speed) + "mph";
            humidity.textContent = "Humidity: " + Math.floor(data.main.humidity) + "%";
           
        
            currentWeather.append(weatherTitle, temperature, humidity, windSpeed);

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

            var forecastArr = [data.list[4], data.list[12], data.list[20], data.list[28], data.list[36]]
           console.log(data.list);

           for (var i = 0; i < 5; i++) {
            var forecast1 = document.createElement('div');
            forecast1.setAttribute('class', 'card col-md-2 mx-2')
            var forecast1Date = document.createElement('h5')
            console.log(forecastArr[i].dt);
            // var unixTime = forecastArr[i].dt
            // var date = unixTime * 1000
            // new java.util.Date((long)date);
            // // forecast1Date.textContent = forecastArr[i].;
            var weatherIcon = forecastArr[i].weather[0].icon
            var iconEl = document.createElement('img');
            iconEl.setAttribute('src', `http://openweathermap.org/img/w/${weatherIcon}.png`)
            forecast1Date.appendChild(iconEl);
            var temperature = document.createElement('p');
            var windSpeed = document.createElement('p');
            var humidity = document.createElement('p');
            temperature.textContent = "Temp: " + Math.floor(forecastArr[i].main.temp) + "°F";
            windSpeed.textContent = "Wind Speed: " + Math.floor(forecastArr[i].main.humidity) + "mph";
            humidity.textContent = "Humidity: " + Math.floor(forecastArr[i].wind.speed) + "%";
            forecast1.append(forecast1Date, temperature, windSpeed, humidity);
            forecastContainer.appendChild(forecast1);
            
           }
            
        })
        .catch(function(error) {
            console.log('request failed', error)
        })
}

function init() {
    displayPrevSearch()
};

init();

cityForm.addEventListener("submit", handleSearchForm);
prevSearchEl.addEventListener('click', buttonClickHandler);