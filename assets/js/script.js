var hiddenEls = document.querySelectorAll(".is-hidden");
var searchForm = document.querySelector("#search-field");
var searchEl = document.querySelector("#search-city")
var searchVal = searchEl.value + ", US";
var searchButton = document.querySelector(".button.has-background-info")
var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var units = '&units=imperial'
var appId = '&appid=73e6094d277b1f1c225b01adf5fdee3c';
var weatherApi = currentWeather + searchVal + units + appId;
var iconURL = "https://openweathermap.org/img/wn/"// + data.weather.icon + "@2x.png" // Optional: @2x before PNG. Maybe use on main card?

// Variables I will need to pull from the initial data results before pulling UV Index
var lat = "lat=";
var lon = "&lon=";
var uvIndex = 'https://api.openweathermap.org/data/2.5/uvi?' + lat + lon + appId;
console.log(uvIndex)

// Add event listeners
searchForm.addEventListener("submit", 
    function(event) {
        event.preventDefault();
        fetchWeather();
});


searchButton.addEventListener("click", fetchWeather)


function fetchWeather (event) {
    // Unhide elements
    console.log(hiddenEls)
    hiddenEls.forEach(element => {
        element.classList.remove('is-hidden');
    });
    
    // Set up if statement for the below to use with the buttons
        // var isButton = false
        // if (isButton) {
        //     console.log(event.target)
        // }
        // var buttonVal = event.target.textContent // Can use this for searchVal on buttons
        // console.log(buttonVal.trim()) // Can use this for searchVal on buttons

    // Set up searchVals
    searchVal = searchEl.value + ", US";
    weatherApi = currentWeather + searchVal + units + appId;
    if (!searchVal) {
        return;
    }
    console.log(searchVal);
    console.log(weatherApi);

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
                console.log(cityName)

            // Add icon after cityName
                iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
                console.log(iconURL)

            // Create m/dd/yyyy format date
                unixDate = data.dt;
                milliDate = unixDate * 1000;
                dateObject = new Date(milliDate);
                dateString = dateObject.toLocaleDateString();
                dayString = dateObject.toLocaleString('en-US', {weekday: 'short'})
                console.log(dateString)
                console.log(dayString)

            // Pull lat and lon
                lat = "lat=" + data.coord.lat
                lon = "&lon=" + data.coord.lon
                console.log(lat, lon)

            // Pull temperature
                temp = data.main.temp
                console.log(temp)

            // Pull wind speed
                wind = data.wind.speed
                console.log(wind) 

            // Pull humidity
                humidity = data.main.humidity + "%"
                console.log(humidity)

            // Place values in card
            var todayCardEl = document.querySelector("#today")
            var todayChildEl = todayCardEl.children
            console.log(todayChildEl)
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
                    })        
        });


    weatherApi = fiveDayForecast + searchVal + units + appId;
    console.log(weatherApi)

    fetch(weatherApi)
    .then (function (response) {
        console.log(response);
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
            if (i != 1) {
            dateObject.setDate(dateObject.getDate() + 1);
            console.log("getDate: ", dateObject.getDate())
            }

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
            temp = data.list[i].main.humidity;
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
            forecastChildEl[6].textContent = "Humidity: " + humidity;

    
        }

    })
    
    




}
