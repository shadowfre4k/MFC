//Adding 'let' statements (essentially, 'vars') to 'get' the 'Form 1', 'Form 2', 'Btn1' & 'Btn2' 'Element's 'By' their 'Id's for access by 'click listeners', etc. later.
let searchBtn1 = document.getElementById("btn1");

let searchBtn2 = document.getElementById("btn2");

//  this is the key for Omdb API
// var movieTitleFunction = function (event) {
// var searchBarEl = document.querySelector("#searchBar");
// var movieTitle = searchBarEl.Value;
var omdbApi = "http://www.omdbapi.com/?t=chicken&apikey=bd8b9b41";

// <<<<<<< APIKey
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

//Buttons tested here. They "log" the string AND save the text entered into the field into local storage!).z
searchBtn1.addEventListener("click", function () {
  let inputForm1 = document.getElementById("input1");

  localStorage.setItem("input1Value", inputForm1.value);
  console.log("Button 1 clicked");

  // var getMovie1 = localStorage.getItem("input1Value");
  // console.log(getMovie1);
});

searchBtn2.addEventListener("click", function () {
  let inputForm2 = document.getElementById("input2");
  let title1El = document.querySelector(".choice-title");

  //rottenScore()

  //youtubeID()

  var movieObj2 = {
    title: inputForm2.value,
    rottenScore: 0,
    youtubeID: 0,
  };

  localStorage.setItem("movie2", JSON.stringify(movieObj2));
  console.log("Button 2 clicked");

  var getMovie2 = JSON.parse(localStorage.getItem("movie2"));
  console.log(getMovie2);
});

//The 'Default' behavior in the 'Event' of a click on a button inside a form is to submit the form and refresh the page. We want to 'prevent' this from happening, so here we add a 'function' that 'handle's the 'Search' without allowing the 'Default' action to occur. The 'handleSearch' function then retrieves the text 'value' of field 'inputForm1' (the 1st movie/show choice, which is accessed by the 'let' we created at the global-level) and passes that value to the 'getContent' 'function' (which still needs to be declared above) to actually 'get' the 'Content', using the 'searchResult' as a paramater.
// function handleSearch(e) {
//   e.preventDefault();
//   let searchResult = inputForm1.value;
//   getContent(searchResult).then(data => {
//     let choiceTitle = document.querySelector("choice-title");
//     let choiceScore = document.querySelector("choice-score");
//   });
//   inputForm.value = "";
// };
