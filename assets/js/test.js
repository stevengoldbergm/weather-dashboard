var unix = 1661644800;
var milliseconds = unix * 1000;
var dateObject = new Date(milliseconds)
var dateString = dateObject.toLocaleDateString()
console.log(dateString) // Creates m/dd/yyyy format date

var todayCardEl = document.querySelector(".today")
var todayChildEl = todayCardEl.children
console.log(todayChildEl)
var img = 'http://openweathermap.org/img/wn/10d@2x.png'

todayChildEl[0].textContent = "cityName" 
todayChildEl[1].textContent = "currentDate"
todayChildEl[2].src = img
todayChildEl[4].textContent = "Temp: " + "°F"
todayChildEl[5].textContent = "Wind: " + "mph"
todayChildEl[6].textContent = "Humidity: " + "%"
todayChildEl[7].textContent = "UV Index: "

weatherApi = findeDayForecast + searchVal + units + appId;
console.log(weatherApi)
    fetch(weatherApi)
    .then (function (response) {
        console.log(response);
        return response.json();
    })
    .then (function (data) {
        console.log(data)

    for (var i = 1; i < 6; i++) {
        // Pull Day and Date
        unixDate = data.list[i].dt;
        milliDate = unixDate * 1000;
        dateObject = new Date(milliDate);
        var dateString = dateObject.toLocaleDateString();
        var dayString = dateObject.toLocaleString('en-US', {weekday: 'short'});
        console.log(dateString);
        console.log(dayString);

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
        forecastChildEl[5].textContent = "Wind: " + wind + "mph";
        forecastChildEl[6].textContent = "Humidity: " + humidity;





    }

})




// Left todo:
    // 1. Set values of the main card on search // DONE
    // 2. Write script to pull 5-day forecast values // DONE
    // 3. Set values to the 5-day forecast cards // DONE
    // 3.1 Hide search fields until script runs // DONE

    // 4. Write script to create History buttons // DONE
    // 5. Write script to have buttons search using their values // DONE
    // 6. Have button values save to localStorage // DONE
    // 8. Write script to clear local memory // DONE
    // 9. Figure out how to change the style of the background for UVI: //DONE
    
    // 7. On start-up, use localStorage to generate buttons
    // 10. Create README
