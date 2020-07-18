
$(document).ready(function(){
    var cityArry = ["Seattle","NY","HK"];

    /*function displayCity(){

        var city = $(this).attr("city-name");
        var queryURL = "" + city + "&apikey=";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

        //create button to hold cities
        var cityDiv = $("<div class='city'>");

        // Retrieves the city Data
        
        // Displays the rating
        cityDiv.append();


        $("#city-content").prepend(cityDiv)



        });

    }*/

    function generateButton(){
        $("#city-buttons").empty();
        
        //console.log(cityArry, cityArry.length);
        // Loops through the array of movies
        for (var i = 0; i < cityArry.length; i++) {
        var buttonDiv = $("<div>");
        var cityButton = $("<button>");
        cityButton.addClass("city");
        cityButton.attr("data-name", cityArry[i]);
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

    generateButton();

});



