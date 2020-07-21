
$(document).ready(function(){
    var apikey = "7fff9c3c870a804f5643f8216e943977";
    //var apikey = config.api_key;
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
            var displaySpeedUnit = (" KPH");
            }
        else if(passingUnit === "imperial"){
            var displayUnit = (" F");
            var displaySpeedUnit = (" MPH");
            }


        console.log("the city is "+city);
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" +unit + "&apikey="+ apikey;
        //console.log("this is current weather API call " + queryURL);

        
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
                displayIcon.attr("src","https://openweathermap.org/img/w/" + currentIcon + ".png");
            //lat and lon for UV Query
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            console.log("the lat: "+lat+ "&"+lon);
            var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&apikey="+apikey;
            //console.log("this is UV API call" + uvQueryURL);
            
    
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
                    var displaySpeed = $("<p>").text("Wind speed: " + windSpeed + displaySpeedUnit);
                    
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

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" +unit +"&apikey=" + apikey;
        //console.log("this is 5 day api call "+ queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                
                for (var i =0; i < 5; i++){
                    var forecastDate = moment().add(i,'days').format("MMMM DD, gggg");
                    var forecastDiv = $("<div class='forecastContent'>");
                    //retrieve forecast data
                    //var forecastDate = response.list[i].dt_txt;
                    var forecastTemp = response.list[i].main.temp;
                    var forecastHumid = response.list[i].main.humidity;
                    var forecastIcon = response.list[i].weather[0].icon;
                    var displayForecastIcon = $("<img id='forecastIcon'>");
                        displayForecastIcon.attr("src","http://openweathermap.org/img/w/" + forecastIcon + ".png");
                    //console.log("forecast temp" + forecastTemp);
                    //create div to store
                    var displayForcastDate = $("<h5>").text(forecastDate);
                    var displayForecastTemp = $("<div>").text("Temp: " + forecastTemp + displayUnit); 
                    var displayForecastHumid = $("<p>").text("Humidity: " + forecastHumid + "%");
                    //Display data
                    forecastDiv.append(displayForcastDate);
                    forecastDiv.append(displayForecastIcon);
                    forecastDiv.append(displayForecastTemp);
                    forecastDiv.append(displayForecastHumid);

                    //append data to html
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
        cityButton.css("background-color","white");
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
        $("#forecast-content").empty();
      }

    //on click the search button and input box
    $("#city-submit").on("click", function(event) {
        event.preventDefault();
        clear();
        //console.log("search button clicked");
        var inputData = $("#city-input").val().trim();
        var passingData = inputData.charAt(0).toUpperCase()+inputData.slice(1);
        console.log(typeof passingData);
        if (cityArry.includes(passingData)){
            console.log("dllm");
            var n = true;
        }
        else{
            n = false;
        }

        if(passingData !== "" && n === true ){
            cityArry.push(passingData);
            console.log("passingData is "+passingData);
            console.log(cityArry);

            //passing city name from inputbox to displayCity function
            displayCity(passingData);
            displayForecast(passingData);
            
            
        }
        else if(passingData !== "" && n === false ){
                cityArry.push(passingData);
                console.log("passingData is "+passingData);
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

    function clearUnitText(){
        console.log("clearing");
        $("#displayUnitSelection").empty()
    }

    //onclick unit button
    $("#metric").on("click", function(event){
         //append unit choice display
         clearUnitText()
         var unitChoice = ("Weather data is in metric format");
         var unitHTML =$("<div class='unitD'>");
         var unitText = $("<p>").text(unitChoice);
             unitText.css("font-size","10px");
         unitHTML.append(unitText);
         $("#displayUnitSelection").append(unitHTML);
         
    });
    $("#imperial").on("click", function(event){
        //append unit choice display
        clearUnitText()
        var unitChoice = ("Weather data is in imperial format");
        var unitHTML =$("<div class='unitD'>");
        var unitText = $("<p>").text(unitChoice);
            unitText.css("font-size","10px");
        unitHTML.append(unitText);
        $("#displayUnitSelection").append(unitHTML);
        
   });

    generateButton();

});
