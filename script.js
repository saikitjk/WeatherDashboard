
$(document).ready(function(){
    var cityArry = ["Hong Kong","Tokyo","Seattle","New York","Seoul"];

    function displayCity(passingData){
        var city = passingData;
        //var city = $(this).attr("city-name");
        //var city = $("#city-input").val().trim();
        console.log("the city is "+city);
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
            //lat and lon for UV Query
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            console.log("the lat: "+lat+ "&"+lon);
            var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=7fff9c3c870a804f5643f8216e943977";
            //console.log("this is " + uvQueryURL);
            $.ajax({
                url: uvQueryURL,
                method: "GET"
                }).then(function(response) {
                    //get UV Index ans testing
                    //var uvLat = response.lat;
                    //var uvLon = response.lon;
                    //var uvDate = response.date;
                    //var uvDateISO = response.date_iso;
                    //console.log("uv query: "+ uvQueryURL);
                    //console.log("uvlat: "+uvLat+"uvlon: "+uvLon+ "uvISO: " + uvDateISO+ "UVDate: " + uvDate);
                    
                    var uvIndex = response.value;
                

                    //create div to store the retrieved data
                    var displayTemp = $("<div>").text("Temp: " + temp);
                    var displayHumid = $("<p>").text("Humidity: " + humidity);
                    var displaySpeed = $("<p>").text("Wind speed: " + windSpeed);
                    var displayUV = $("<div>").text("UV Index: " +uvIndex);

                    console.log(displayUV, uvIndex);
                    // Displays the data
                    cityDiv.append(displayTemp);
                    cityDiv.append(displayHumid);
                    cityDiv.append(displaySpeed);
                    cityDiv.append(displayUV);
            
                    $("#city-content").append(cityDiv);
                });
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
    //clear search field value
    function clear() {
        console.log("clearing")
        $("#city-input").empty();
      }

    //on click the search button and input box
    $("#city-submit").on("click", function(event) {
        event.preventDefault();
        
        //console.log("search button clicked");
        var passingData = $("#city-input").val().trim();
        if(passingData !== ""){
            cityArry.push(passingData);
            console.log(cityArry);
            generateButton();
            //passing city name from inputbox to displayCity function
            displayCity(passingData);
        }
        else{
            return;
        }
    });
    //onclick for button
    $(document).on("click", ".city", function(event){
        var passingData = $(this).attr("city-name");
        //passing city name from button to displayCity function
        displayCity(passingData);
    });

    generateButton();

});



/*var uvLat = response.lat;
                    var uvLon = response.lon;
                    var uvDate = response.date;
                    var uvDateISO = response.date_iso;
                    console.log("uv query: "+ uvQueryURL);
                    console.log("uvlat: "+uvLat+"uvlon: "+uvLon+ "uvISO: " + uvDateISO+ "UVDate: " + uvDate); */

