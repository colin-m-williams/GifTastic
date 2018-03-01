// Execute this code when the DOM has fully loaded.
$(document).ready(function () {
    // VARIABLE DECLARATION (Arrays and Variables for holding data)
    // ===================================================================

    // GIPHY API Key: RGBhBrKTl2Pi3OqP0W3hmgFy6aTylQr2
    var topics = ["iron man", "black widow", "thor", "captain america", "hulk",
                 "hawkeye+marvel", "black panther", "ant-man", "doctor strange", "spider-man",
                  "wolverine", "daredevil", "jessica jones", "luke cage", "iron fist", 
                  "drax", "gamora", "rocket raccoon", "groot", "star lord"];

    var newHero;

    // FUNCTIONS
    // ===================================================================

    // Function to generate buttons for each element in the array 'topics'
    function createButtons() {
        // Make sure the section is empty before we populate it with buttons
        $("#hero-buttons").empty();

        // Loop through the array 'topics'
        for (var i = 0; i < topics.length; i++) {
            // Store a button in a variable
            var heroButton = $("<button>");
            heroButton.attr("data-hero", topics[i]).text(topics[i]);

            // Testing / Debugging
            console.log(topics[i]);

            // $("#hero-buttons").empty();
            $("#hero-buttons").append(heroButton);
            
        }
    }

    // MAIN PROCESS
    // ===================================================================

    createButtons();

    // Event listener for the hero buttons - if button doesn't work try document, then document.body
    $(document.body).on("click", "button", function () {

        // Clear out the section before we start to populate it
        $("#hero-Gifs").empty();

        var hero = $(this).attr("data-hero");

        // Constructing a URL to search Giphy for the name of the hero
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            hero + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var heroImage = $("<img class='gif' data-state='still'>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    // heroImage.attr("src", results[i].images.fixed_height.url); // use .images.fixed_height_still for static images
                    heroImage.attr("src", results[i].images.fixed_height_still.url);
                    heroImage.attr("data-still", results[i].images.fixed_height_still.url);
                    heroImage.attr("data-animate", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.prepend(p);
                    gifDiv.prepend(heroImage);

                    // Prepending the gifDiv to the "#hero-Gifs" div in the HTML
                    $("#hero-Gifs").prepend(gifDiv);
                }
            }
        })
    });

    // Event listener for the submit button.
    $("#addHero").on("click", function(event) {
        // prevents the button from reloading the page
        event.preventDefault();

        // Save the value of #hero-input in a variable newHero
        newHero = $("#hero-input").val().trim();
        // Push newHero to the topics array
        topics.push(newHero)
        // clear out the div
        $("#hero-Gifs").empty();
        $("#hero-input").empty();
        // call createButtons() to repopulate the page
        createButtons();
    });

    // Event listener for the images
    $(document.body).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    })
        
});
