var apiKey = "f393fdb5384ecc0e6e6cee6cbd6999f1";

var titleEl = document.getElementById("title");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var searchBtn = document.getElementById("search-btn");
var cityInput = document.getElementById("city-input");
var fiveDayForcastEl = document.getElementById("fiveday-Forecast");
var prevCity = document.getElementById("prevCity");




function searchCity() {
    var cityName = cityInput.value;
    //(.value):property to get text value from input

    displayWeather(cityName)
    //passing information in the function


}

function displayWeather(cityName) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial"

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {
            console.log(currentData)
            titleEl.innerHTML = currentData.name + dayjs.unix(currentData.dt).format(" (MM/DD/YYYY)") + "<img src='https://openweathermap.org/img/wn/" + currentData.weather[0].icon + "@2x.png'>"

            var temp = document.getElementById("temp")
            temp.textContent = "Temp: " + currentData.main.temp + " F"

            var wind = document.getElementById("wind")
            wind.textContent = "Wind " + currentData.wind.speed + " MPH"

            var humidity = document.getElementById("humidity")
            humidity.textContent = currentData.main.humidity + "%"
            console.log(cityName)
            getNames(currentData.name)

        })







    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial"



    fetch(forecastUrl)
        .then(function (response) {
            return response.json()

        })
        .then(function (forecastData) {
            console.log(forecastData)
            //grab every 12pm from each day for 5 days 
            var forecastArr = forecastData.list

            for (let i = 3, j = 1; i < forecastArr.length; i = i + 8, j++) {
                console.log(forecastArr[i])
                var cardTitle = document.querySelector(".card-title" + j);
                cardTitle.textContent = dayjs.unix(forecastArr[i].dt).format(" (MM/DD/YYYY)")

                var iconImg = document.createElement("img");
                iconImg.src = "https://openweathermap.org/img/wn/" + forecastArr[i].weather[0].icon + "@2x.png";
                iconImg.alt = "Weather Icon";

                // Append the <img> element to the card title
                cardTitle.appendChild(iconImg);

                var temp = document.getElementById("temp" + j)
                temp.textContent = "Temp: " + forecastArr[i].main.temp + " F"

                var wind = document.getElementById("wind" + j)
                wind.textContent = "Wind " + forecastArr[i].wind.speed + " MPH"

                var humidity = document.getElementById("humidity" + j)
                humidity.textContent = forecastArr[i].main.humidity + "%"

            }


        })
}

var nameArray = [];

function getNames(cityName) {

    if (!nameArray.includes(cityName)) {
        
    
    console.log(nameArray)
    nameArray.push(cityName)
    console.log(nameArray)
    localStorage.setItem("nameArray", JSON.stringify(nameArray))

   showNames()
   }
}








function showNames() {
    var showNamesArray = JSON.parse(localStorage.getItem("nameArray"));
    console.log(showNamesArray);
    if (showNamesArray) {
        
        nameArray = showNamesArray
        prevCity.innerHTML = ""

        for (let i = 0; i < showNamesArray.length; i++) {
            var li = document.createElement("li")
            li.classList = "list-group-item"
            var button = document.createElement("button")
            button.classList = "btn btn-secondary w-100"

            button.textContent = showNamesArray[i]
            button.setAttribute("id", button.textContent)

            button.addEventListener("click", function buttonPress() {
                displayWeather(this.id)
            })


            prevCity.appendChild(li)
            prevCity.appendChild(button)





            // <li class="list-group-item"><button type="button" class="btn btn-secondary w-100">Miami</button></li>  

        }
        cityInput.value = ""
    }


}

function newButton() {
    var cityName = cityInput.value;
    displayWeather(cityName)
    return

}



function checkCityNameStorage(value) {

    if (localStorage.length > 0) {
        var cityArray = JSON.parse(localStorage.getItem("nameArray"))

        for (let i = 0; i < cityArray.length; i++) {
            const element = cityArray[i];
            if (element.toLowerCase() === value.toLowerCase()) {
                return true;

            }

        }
        return false;
    }

}







// showNames()

searchBtn.addEventListener("click", searchCity);



