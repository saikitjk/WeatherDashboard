
$(document).ready(function(){
    var cityArry = ["Hong Kong","Tokyo","Seattle","New York","Seoul"];

    function displayCity(){

        var city = $(this).attr("city-name");
        console.log("the city is "+city);
        var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&apikey=7fff9c3c870a804f5643f8216e943977";
        console.log("this is " + queryURL);
        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            //create button to hold cities
            var cityDiv = $("<div class='city'>");
            // Retrieves the city Data
            var temp = response.main.temp;
            var displayTemp = $("div").text("Temp: " + temp);
            console.log(displayTemp, temp);
            // Displays the temp
            cityDiv.append(displayTemp);
    


            $("#city-content").prepend(cityDiv);



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



