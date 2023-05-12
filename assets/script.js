//  this is the key for Omdb API
// var movieTitleFunction = function (event) {
// var searchBarEl = document.querySelector("#searchBar");
// var movieTitle = searchBarEl.Value;
var omdbApi = "http://www.omdbapi.com/?t=chicken&apikey=bd8b9b41";

fetch(omdbApi).then(function (response) {
  response.json().then(function (data) {
    console.log(data);

    //test syphon data
    var rottenScore = data.Ratings[1].value;
    console.log(rottenScore);
  });
});
// };

// var btn = document.querySelector("btn"); // finds the button!
// btn.eventlistener("click", movieTitleFunction()); //when you click "btn" envoke function

// youtube key : AIzaSyBEbEsm1R3asrUjS8pzXddROB-txKkF4tM

var youtubeAPI =
  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBEbEsm1R3asrUjS8pzXddROB-txKkF4tM&q=blow+Trailer&type=video";

fetch(youtubeAPI).then(function (response) {
  response.json().then(function (data) {
    console.log(data.items[0].id.videoId);
  });
});
