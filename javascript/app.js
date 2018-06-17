$(document).ready(function(){

var reactions = ["sarcastic", "happy", "eye roll", "fine", "hallelujah", "omg","nope","smile","YAS","dance","high five","winning"];

function renderButtons() {
$("#buttonZone").empty();
// Looping through the array of topics
    for (var i = 0; i < reactions.length; i++) {

    var arrayButtons = $("<button>");
    arrayButtons.addClass("topics");
    arrayButtons.attr("data-name", reactions[i]);
    arrayButtons.text(reactions[i]);
    $("#buttonZone").append(arrayButtons);
  }
}

$("#add-topic").on("click", function(event) {
// Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();

    var inputTopic = $("#topic-input").val().trim();;
    console.log(inputTopic);
    reactions.push(inputTopic);
    renderButtons();

    $("#topic-input").val("");
});

$('#reactionsDiv').on('click','img', function() {
    console.log(this);
    if ($(this).attr("state") == "still") {
      $(this).attr("state", "animate");
      $(this).attr("src",$(this).attr("animate"));
    }else{
      ($(this).attr("state") == "animate");
      $(this).attr("state", "still");
      $(this).attr("src",$(this).attr("still"));
    }
});


$("#buttonZone").on("click", 'button', function() {
    var reactionData = $(this).attr("data-name");
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + reactionData + '&api_key=G1rFLnVXbgWtaKGbFNCjlX046aMCFw44&limit=10';

$.ajax({
  url: queryURL,
  method: "GET"
 }).then(function(response) {
   var reactionDiv = $("#reactionsDiv");
   var gifs = response.data;

   for (var i = 0; i < gifs.length; i++) {
     var gif = $('<img>')
     gif.attr("src", gifs[i].images.fixed_height_still.url);
     gif.attr("state", "still");
     gif.attr("still",gifs[i].images.fixed_height_still.url);
     gif.attr("animate",gifs[i].images.fixed_height.url);
     var rating = gifs[0].rating;
     var p = $("<p>").html("Rating: " + rating);
     reactionDiv.append(gif, p)
   }
 })
});

renderButtons();
});
