var hiddenEls = document.querySelectorAll(".is-hidden");
var searchForm = document.querySelector("#search-field");
var searchEl = document.querySelector("#search-city")
var searchVal = searchEl.value
var country = ", US";
var searchButton = document.querySelector(".btn-srch")
// var searchButtons = document.querySelectorAll(".btn-srch")
var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var units = '&units=imperial'
var appId = '&appid=73e6094d277b1f1c225b01adf5fdee3c';
var weatherApi = currentWeather + searchVal + country + units + appId;
var iconURL = "https://openweathermap.org/img/wn/"// + data.weather.icon + "@2x.png" // Optional: @2x before PNG. Maybe use on main card?

// Variables I will need to pull from the initial data results before pulling UV Index
var lat = "lat=";
var lon = "&lon=";
var uvIndex = 'https://api.openweathermap.org/data/2.5/uvi?' + lat + lon + appId;
console.log(uvIndex)

var isHistory = false;

// Add event listeners
searchForm.addEventListener("submit", 
    function(event) {
        event.preventDefault();
        fetchWeather(event);
});


searchButton.addEventListener("click", 
        function(event) {
        fetchWeather(event);
    })

function fetchWeather (event) {
    // Unhide elements
    console.log(hiddenEls)
    hiddenEls.forEach(element => {
        element.classList.remove('is-hidden');
    });

    console.log("START SCRIPT")
    console.log("event type: ", event.type)
    console.log("Button Value: ", event.target.textContent)

    // Set up searchVals
    currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
    fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';

    searchVal = searchEl.value;
    weatherApi = currentWeather + searchVal + country + units + appId;

    if (!searchVal) {
        return;
    }

    console.log(searchVal);
    console.log(weatherApi);
    
    // Set up if statement for the below to use with history buttons
    // If a history button is clicked, searchEl.value should adjust
    // If a history button is clicked, isHistory value is true (don't create a new button)
        if (event.type == "submit") {
            isHistory = false;
            console.log(event.type, isHistory)
        } else if (event.target.textContent.trim() === "Search Now!") {
            isHistory = false;
            console.log(event.type, isHistory)
        } else {
            isHistory = true;
            console.log("isHistory:", isHistory)

            searchEl.value = event.target.textContent;
            searchVal = searchEl.value.trim();
            weatherApi = currentWeather + searchVal + country + units + appId;
            console.log("History searchVal:", + searchVal)
            console.log("History weatherApi:", + weatherApi)


        }

    fetch(weatherApi)
        .then (function (response) {
            console.log(response);
            return response.json();
        })
        .then (function (data) {
            console.log(data)

        // Need the following info for big card
            // City Name
                cityName = data.name
                console.log("big city name: ", cityName)

            // Add icon after cityName
                iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
                console.log("big icon: ", iconURL)

            // Create m/dd/yyyy format date
                unixDate = data.dt;
                milliDate = unixDate * 1000;
                dateObject = new Date(milliDate);
                dateString = dateObject.toLocaleDateString();
                dayString = dateObject.toLocaleString('en-US', {weekday: 'short'})
                console.log("big datestring:", dateString)
                console.log("big daystring: ", dayString)

            // Pull lat and lon
                lat = "lat=" + data.coord.lat
                lon = "&lon=" + data.coord.lon
                console.log("big lat/lon: ",lat, lon)

            // Pull temperature
                temp = data.main.temp
                console.log("big temp: ",temp)

            // Pull wind speed
                wind = data.wind.speed
                console.log("big wind: ",wind) 

            // Pull humidity
                humidity = data.main.humidity + "%"
                console.log("big humid: ",humidity)

            // Place values in card
            var todayCardEl = document.querySelector("#today")
            var todayChildEl = todayCardEl.children
            console.log("big children: ",todayChildEl)
            // var img = 'http://openweathermap.org/img/wn/10d@2x.png'

            todayChildEl[0].textContent = cityName 
            todayChildEl[1].textContent = dateString
            todayChildEl[2].src = iconURL
            todayChildEl[4].textContent = "Temp: " + Math.floor(temp) + "°F";
            todayChildEl[5].textContent = "Wind: " + wind + "mph";
            todayChildEl[6].textContent = "Humidity: " + humidity;

                // Update the uvIndex value, since we have lat and lon now.
                 uvIndex = 'https://api.openweathermap.org/data/2.5/uvi?' + lat + lon + appId;
                // fetch uvIndex
                fetch(uvIndex)
                    .then(function(response) {
                        console.log(response);
                        return response.json();
                    })
                    .then (function(data) {
                        console.log(data);
                        uvI = data.value;
                        console.log(uvI);
                        todayChildEl[7].textContent = "UV Index: " + uvI
                        if (uvI < 3) {
                            todayChildEl[7].classList.add("uv-low")
                        } else if (uvI < 6) {
                            todayChildEl[7].classList.add("uv-mod")
                        } else if (uvI < 8) {
                            todayChildEl[7].classList.add("uv-high")
                        } else if (uvI < 10) {
                            todayChildEl[7].classList.add("uv-vhigh")
                        } else {
                            todayChildEl[7].classList.add("uv-extr")
                        }
                    })        
        });

    forecastApi = fiveDayForecast + searchVal + country + units + appId;
    console.log(weatherApi)

    fetch(forecastApi)
    .then (function (response) {
        console.log(response);
        console.log("Response.Status: ", response.status);
        return response.json();
    })
    .then (function (data) {
        
        console.log(data)

        // Set up the base time-stamps 
        var unixDate = data.list[1].dt;
        var milliDate = unixDate * 1000;
        var dateObject = new Date(milliDate);
        console.log("Pre-Loop dateObject: ", dateObject)
        dateString = dateObject.toLocaleDateString();
        dayString = dateObject.toLocaleString('en-US', {weekday: 'short'});
        console.log("dateString: ", dateString);
        console.log("dayString: ", dayString);
        console.log("getDate: ", dateObject.getDate())

        for (var i = 1; i < 6; i++) {
            // Pull Day and Date
            dateObject.setDate(dateObject.getDate() + 1);
            console.log("getDate: ", dateObject.getDate())

            dateString = dateObject.toLocaleDateString();
            dayString = dateObject.toLocaleString('en-US', {weekday: 'short'});

            console.log("dateString: ", dateString);
            console.log("dayString: ", dayString);

            // Pull Icon
            iconURL = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
            console.log(iconURL)
    
            // Pull Temp
            temp = data.list[i].main.temp;
            console.log(temp);
    
            // Pull Wind
            wind = data.list[i].wind.speed;
            console.log(wind);
    
            // Pull Humidity
            humidity = data.list[i].main.humidity;
            console.log(temp);
    
            // Place Values in card
            var forecastEl = document.querySelector("#forecast-"+ i)
            var forecastChildEl = forecastEl.children
            console.log(forecastChildEl);

            forecastChildEl[0].textContent = dayString
            forecastChildEl[1].textContent = dateString
            forecastChildEl[2].src = iconURL
            forecastChildEl[4].textContent = "Temp: " + Math.floor(temp) + "°F";
            forecastChildEl[5].textContent = "Wind: " + Math.floor(wind) + "mph";
            forecastChildEl[6].textContent = "Humidity: " + humidity + "%";
        }

    })
    
    var historyParentEl = document.querySelector("#history")

    console.log(searchEl.value)
    if (!isHistory) {
        // Check for a local memory object of the same string. 
        // Don't run if it exists
        if (!localStorage.getItem("weatherSave: " + searchVal)) {
            localStorage.setItem("weatherSave: " + searchVal, searchVal)
            var newHistoryEl = document.createElement("a")
            newHistoryEl.textContent = searchVal
            newHistoryEl.classList.add("button", "new-btn-srch", "is-roundeds", "is-max", "has-background-info-light", "has-text-grey", "mb-2")
            newHistoryEl.setAttribute("type", "button")
            newHistoryEl.setAttribute("id",  "btn-srch")
            historyParentEl.insertAdjacentElement("afterend", newHistoryEl)

            searchButtons = document.querySelectorAll(".new-btn-srch")
            searchButtons.forEach(element =>
                element.addEventListener("click", 
                    function(event) {
                        fetchWeather(event);
                })
            )
        }   
    }
}

// Clear localStorage and Refresh Page
var clearHistoryEl = document.querySelector(".button.has-background-danger-dark")

clearHistoryEl.addEventListener('click', clearHistory)

function clearHistory() {
    localStorage.clear();
document.location = document.location
}


// Load all saved data and make buttons on start-up
var keys = Object.keys(localStorage)

for (var i = 0; i < keys.length; i++) {
    searchHistory = keys[i];
    searchHistoryValue = searchHistory.substring(13)
    console.log(searchHistoryValue)

    // Create button element
    var historyParentEl = document.querySelector("#history")
    var newHistoryEl = document.createElement("a")
    newHistoryEl.textContent = searchHistoryValue
    newHistoryEl.classList.add("button", "new-btn-srch", "is-roundeds", "is-max", "has-background-info-light", "has-text-grey", "mb-2")
    newHistoryEl.setAttribute("type", "button")
    newHistoryEl.setAttribute("id",  "btn-srch")
    historyParentEl.insertAdjacentElement("afterend", newHistoryEl)

    // Refresh event listeners for new buttons
    searchButtons = document.querySelectorAll(".new-btn-srch")
    searchButtons.forEach(element =>
        element.addEventListener("click", 
            function(event) {
                searchEl.value = searchHistoryValue
                fetchWeather(event);
        })
    )
}