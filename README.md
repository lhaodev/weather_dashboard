# weather_dashboard





 //  3rd ajax call for weather forcasting
    var forecastQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&cnt=5&appid=59e230f5023bafd657c9d2330a31f52d";

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    })
        // After data comes back from the request
        //forEach or for (forecast of answer.list) { ... }
        .then(function (answer) {
            console.log(answer);
            var answerList = answer.list;
            for (i = 0; i < answerList.length; i++) {
                //  $(".forecast").addClass(".color");
                $(".forecast").css({ "background-color": "#f8ebd8", "color": "#ad6925" });
                //show date
                $(".date").each(function (i) {
                    $(this).text(answer.list[i].dt_txt.split(" ")[0]);
                });
                //  $(".date").text(answer.list[i].dt_txt.split(" ")[0]);
                //show icon pictures
                var forecastPic = answer.list[i].weather[0].icon;
                console.log(forecastPic);
                $(".pic").attr("src", "https://openweathermap.org/img/wn/" + forecastPic + "@2x.png");

                $(".pic").attr("alt", answer.list[i].weather[0].description);
                // show tempature

                $('.temp').each(function (i) {
                    $(this).text("Temperature: " + answer.list[i].main.temp + " °F");
                });


                //   $(".temp").each(function () { $(this).text("Temperature: " + answer.list[i].main.temp + " °F") });
                //show humidity
                //       $(".humi").text("Humidity: " + answer.list[i].main.humidity + " %");


                $('.humi').each(function (i) {
                    $(this).text("Humidity: " + answer.list[i].main.humidity + " %");
                });


