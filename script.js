function initPage() {

    var cityName;
    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    console.log(history);

    var currentDay = (moment().format("dddd, MMMM Do"));
    console.log(currentDay);


    function showWeather(cityName) {
        // Grabbing and storing the city property value from the button

        var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=59e230f5023bafd657c9d2330a31f52d";

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
                var UVQueryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=59e230f5023bafd657c9d2330a31f52d&cnt=1";

                // 2nd Ajax call for UV Index
                $.ajax({
                    url: UVQueryURL,
                    method: "GET"
                })
                    // After data comes back from the request
                    .then(function (result) {
                        console.log(result)
                        $("#uv").text(result.value);
                        $("#uv").attr("class", "badge badge-danger");
                    });


                // 3rd Ajax call for future weather
                var futureURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=59e230f5023bafd657c9d2330a31f52d&cnt=1";
                $.ajax({
                    url: futureURL,
                    method: "GET"
                })
                    // After data comes back from the request
                    //forEach or for (forecast of answer.list) { ... }
                    .then(function (answer) {
                        console.log(answer);
                        for (i = 0; i < 5; i++) {
                            //  $(".forecast").addClass(".color");
                            $(".forecast").css({ "background-color": "#f8ebd8", "color": "#ad6925" });
                            //show date
                            $(".date").each(function (i) {
                                $(this).text(new Date(answer.daily[i + 1].dt * 1000).toLocaleDateString("en-US")
                                )
                            });
                            $('.pic').each(function (i) {
                                $(this).attr("src", "https://openweathermap.org/img/wn/" + answer.daily[i + 1].weather[0].icon + "@2x.png");
                            });
                            $('.pic').each(function (i) {
                                $(this).attr("alt", answer.daily[i + 1].weather[0].description);
                            });

                            // show tempature
                            $('.temp').each(function (i) {
                                $(this).text("Temperature: " + answer.daily[i + 1].temp.day + " °F");
                            });

                            //show humidity
                            $('.humi').each(function (i) {
                                $(this).text("Humidity: " + answer.daily[i + 1].humidity + " %");
                            });
                        }
                    });
            });
    };


    $("#button").on("click", function (event) {
        event.preventDefault();
        cityName = $("#search").val().trim();
        showWeather(cityName);
        history.push(cityName);
        localStorage.setItem("history", JSON.stringify(history));
        console.log(history);
        makeRow();

    });

    //line 103-122 were helped by John Pendergrass
    function makeRow() {
        $("#searchList").empty();
        $("#search").val("");
        for (var i = 0; i < history.length; i++) {
            var list = $("<input>").attr({
                class: "form-control d-block bg-white", value: history[i], type: "text"
            });
            $("#searchList").append(list);
        }

    };

    makeRow();

    if (history.length > 0) {
        showWeather(history[history.length - 1]);
    };

}

initPage();