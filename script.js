
$(document).ready(function(){
    var cityArry = ["Hong Kong","Tokyo","Seattle","New York","Seoul"];

    function displayCity(){

        var city = $(this).attr("city-name");
        //console.log("the city is "+city);
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&apikey=7fff9c3c870a804f5643f8216e943977";
        //console.log("this is " + queryURL);
        //UV Query
        
        // Creates AJAX call 
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            //get UV Index

            //create button to hold cities
            var cityDiv = $("<div class='city'>");
            // Retrieves the city Data
            var temp = response.main.temp;
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;
            //UV Query
            var lat = response.coord.lon;
            var lon = response.coord.lat;
            console.log("the lon and lat are "+lon+ "&"+lat);
            var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?"+lat+"&"+lon+"&apikey=7fff9c3c870a804f5643f8216e943977";
            //console.log("this is " + uvQueryURL);
            $.ajax({
                url: uvQueryURL,
                method: "GET"
                }).then(function(response) {
                     //get UV Index
                    var uvIndex = response.value;
                });

            //get UV Index


            //get UV Index


            //create div to store the retrieved data
            var displayTemp = $("<div>").text("Temp: " + temp);
            console.log(displayTemp, temp);
            // Displays the temp
            cityDiv.append(displayTemp);
    
            $("#city-content").append(cityDiv);

            });

    }

    function generateButton(){
        $("#city-buttons").empty();
        
        //console.log(cityArry, cityArry.length);
        // Loops through the array of movies
        for (var i = 0; i < cityArry.length; i++) {
        var buttonDiv = $("<div>");
        var cityButton = $("<button>");
        cityButton.addClass("city");
        cityButton.css("margin-bottom","10px");
        cityButton.attr("city-name", cityArry[i]);
        cityButton.text(cityArry[i]);
        buttonDiv.append(cityButton);
        $("#city-buttons").prepend(buttonDiv);
        }
    }

    //on click the search button
    $("#city-submit").on("click", function(event) {
        event.preventDefault();
        //console.log("search button clicked");
        var city = $("#city-input").val().trim();
        if(city !== ""){
            cityArry.push(city);
            console.log(cityArry);
            generateButton();
        }
        else{
            return;
        }
    });

    $(document).on("click", ".city",displayCity);

    generateButton();

});



