$("#button").on("click", function (event) {
    event.preventDefault();

    // Grabbing and storing the city property value from the button
    var cityName = $(this).parent().siblings("#search").val();

    console.log(cityName);

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=59e230f5023bafd657c9d2330a31f52d";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(response);


        })
});