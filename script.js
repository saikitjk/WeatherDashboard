
$(document).ready(function(){
    var currentDate = moment().format("MMMM DD, gggg");
    var cityArry = ["Hong Kong","Tokyo","Seattle","New York","Seoul"];
    var passingUnit = "metric";
    $("#imperial").on("click", function(){
           
        passingUnit = "imperial";
    
        }); 
    $("#metric").on("click", function(){

        passingUnit = "metric";
        }); 

    function displayCity(passingData){

        //console.log(passingUnit);
        var city = passingData;
        var unit = passingUnit;

        //switching C and F
        if(passingUnit === "metric"){
            var displayUnit = (" C");
            }
        else if(passingUnit === "imperial"){
            var displayUnit = (" F");
            }

        console.log("the city is "+city);
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" +unit +"&apikey=7fff9c3c870a804f5643f8216e943977";
        //console.log("this is " + queryURL);

        
        // Creates AJAX call 
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            //get UV Index

            //create button to hold cities
            var cityDiv = $("<div class='cityContent'>");
            // Retrieves the city Data
            var temp = response.main.temp;
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;
            //weather icon
            var currentIcon = response.weather[0].icon;
            var displayIcon = $("<img id='weatherIcon'>");
                displayIcon.attr("src","http://openweathermap.org/img/w/" + currentIcon + ".png");
            //lat and lon for UV Query
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            console.log("the lat: "+lat+ "&"+lon);
            var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=7fff9c3c870a804f5643f8216e943977";
            //console.log("this is " + uvQueryURL);
            
    
            //nested ajax call
            $.ajax({
                url: uvQueryURL,
                method: "GET"
                }).then(function(response) {
                    var uvIndex = response.value;
                    console.log(uvIndex);

                    //create div to store the retrieved data
                    var displayCityName = $("<h3>").text(city + " ("+ currentDate +")");
                    var displayTemp = $("<div>").text("Temp: " + temp + displayUnit);
                    var displayHumid = $("<p>").text("Humidity: " + humidity + "%");
                    var displaySpeed = $("<p>").text("Wind speed: " + windSpeed + " MPH");
                    
                    //UV Index color
                    var uvNum = $("<color-box>").text(uvIndex);
                        uvNum.css("color","white");
                        uvNum.css("padding", "4px");
                        uvNum.css("border-radius","4px");
                        if (uvIndex >-1 && 3>uvIndex){
                            var displayUV = ("UV Index: Low ");
                            uvNum.css("background-color","green");
                        }
                        else if(uvIndex >2 && 6>uvIndex){
                            var displayUV = ("UV Index: Moderate ");
                            uvNum.css("background-color","yellow");
                        }
                        else if(uvIndex >5 && 8>uvIndex){
                            var displayUV = ("UV Index: High ");
                            uvNum.css("background-color","orange");
                        }
                        else if(uvIndex >7 && 11>uvIndex){
                            var displayUV = ("UV Index: Very high ");
                            uvNum.css("background-color","red");
                        }
                        else if(uvIndex>10){
                            var displayUV = ("UV Index: Extreme ");
                            uvNum.css("background-color","violet");
                        }

                    // Displays the data
                    cityDiv.append(displayCityName);
                    cityDiv.append(displayTemp);
                    cityDiv.append(displayIcon);
                    cityDiv.append(displayHumid);
                    cityDiv.append(displaySpeed);
                    cityDiv.append(displayUV);
                    cityDiv.append(uvNum);
            
                    $("#city-content").append(cityDiv);
                });
        });

    }

    function displayForecast(passingData){
        //console.log("function called");
        var city = passingData;
        var unit = passingUnit;

        //switching C and F
        if(passingUnit === "metric"){
            var displayUnit = (" C");
            }
        else if(passingUnit === "imperial"){
            var displayUnit = (" F");
            }

        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" +unit +"&apikey=7fff9c3c870a804f5643f8216e943977";

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                
                for (var i =0; i < 5; i++){

                    var forecastDiv = $("<div class='forecastContent'>");
                    //retrieve forecast data
                    var forecastTemp = response.list[i].main.temp;
                    console.log("forecast temp" + forecastTemp);
                    //create div to store
                    var displayForecastTemp = $("<div>").text("Temp: " + forecastTemp + displayUnit); 

                    //Display data
                    forecastDiv.append(displayForecastTemp);

                    $("#forecast-content").append(forecastDiv);
                }

                
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
        $("#city-content").empty();
      }

    //on click the search button and input box
    $("#city-submit").on("click", function(event) {
        event.preventDefault();
        clear();
        //console.log("search button clicked");
        var passingData = $("#city-input").val().trim();
        if(passingData !== ""){
            cityArry.push(passingData);
            console.log(cityArry);
            generateButton();
            //passing city name from inputbox to displayCity function
            displayCity(passingData);
            displayForecast(passingData);
            
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
        displayForecast(passingData);
        clear();

    });

    generateButton();

});
