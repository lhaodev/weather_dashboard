
var currentDay = (moment().format("dddd, MMMM Do"));
console.log(currentDay);


$("#button").on("click", function (event) {
    event.preventDefault();
    // Grabbing and storing the city property value from the button
    var cityName = $(this).parent().siblings("#search").val();
    console.log(cityName);

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=59e230f5023bafd657c9d2330a31f52d";

    $("#cityInfo").text(cityName).css('textTransform', 'capitalize');
    $("#currentDate").text(currentDay);

    // 1st AJAX call for basic weather info
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(response);
            // show basic weather data of the day for the city searched
            $("#temperature").text("Temperature: " + response.main.temp + " °F");
            $("#humidity").text("Humidity: " + response.main.humidity + " %");
            $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
            var weatherPic = response.weather[0].icon;
            $("#current-pic").attr("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            $("#current-pic").attr("alt", response.weather[0].description);

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=59e230f5023bafd657c9d2330a31f52d&cnt=1";

            // 2nd Ajax call for UV Index
            $.ajax({
                url: UVQueryURL,
                method: "GET"
            })
                // After data comes back from the request
                .then(function (result) {
                    console.log(result)

                    // UVIndex.setAttribute("class", "badge badge-danger");
                    // UVIndex.innerHTML = response.data[0].value;
                    //$("#uvIndex") = result.value;


                    // var uvIndex = result.value;
                    // uvIndex.setAttribute("class", "badge badge-danger");

                    // $("#uv").text = "UV Index: ";
                    // $("#uv").append(UVIndex);


                    $("#uv").text(result.value);
                    $("#uv").attr("class", "badge badge-danger");
                    //$("#uv").text(result.value);
                    // $("#uv").css("background", "red");
                });

        })






    // 3rd ajax call for weather forcasting
    var forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&cnt=5&appid=59e230f5023bafd657c9d2330a31f52d";

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (forecast) {
            console.log(forecast);

            for (i = 0; i < $(".forecast").length; i++) {


                $(".date").each(function () { $(this).text(forecast.list[i].dt_txt.split(" ")[0]) })





                var forecastPic = forecast.list[i].weather[0].icon;

                console.log(forecastPic);

                $(".pic").attr("src", "https://openweathermap.org/img/wn/" + forecastPic + "@2x.png");

                $(".pic").attr("alt", forecast.list[i].weather[0].description);

            }

        });














});

