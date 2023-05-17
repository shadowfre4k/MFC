//Adding 'let' statements (essentially, 'vars') to 'get' the 'Form 1', 'Form 2', 'Btn1' & 'Btn2' 'Element's 'By' their 'Id's for access by 'click listeners', etc. later.
let title1El = document.querySelector(".choice-title");
let searchBtn1 = document.getElementById("btn1");
let inputForm2 = document.getElementById("input2");
let searchBtn2 = document.getElementById("btn2");
let choice1El = document.querySelector("#choice1-art");
let choice2El = document.querySelector("#choice2-art");

//Enabling our API key to access YouTube, in order to display the trailer once a winner is determined.
var youtubeAPI =
  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBEbEsm1R3asrUjS8pzXddROB-txKkF4tM&q=blow+Trailer&type=video";

// choice 1. Kevin added "1" to end of function name, following naming convention established by "getMovieInfo2". Here, we enable our OMDB API key so that our function can access the stats we need.
async function getMovieInfo1(movie) {
  let request = `http://www.omdbapi.com/?t=${movie}&apikey=bd8b9b41`;
  //First, make a 'fetch' 'request' to OMDB and are returned a "promise" of eventual completion of our operation.
  let response = await fetch(request);
  //Then, we 'await' the 'response' to the user's request, which (if successful) returns the data to us in a 'json' format.
  let data = await response.json();

  // append poster image1. Here, we're establishing that 'poster' will be based on/target the 'data' with the key 'Poster' in the 'json' 'response' we received.
  let poster = data.Poster;
  //Here, we target the element with class 'img1' with a 'querySelector' and assign it to the image variable, so that its 'src' attribute (what will actually show on the page) can be updated dynamically.
  let image = document.querySelector(".img1");
  image.setAttribute("src", poster);

  //Here, we're assigning the 'rotten' Tomatoes 'Score', which is the 'Value' found in the second position of the array 'Ratings', in our 'json' 'data' that returned to us through the 'getMovieInfo' function above.
  let rottenScore = data.Ratings[1].Value;
  //We then use the 'setItem' method to store the 'Value' of 'rottenScore' in 'localStorage', for future reference.
  localStorage.setItem("rate1Value", rottenScore);
  //Kevin added a '1' to 'rottenEl', following our naming convention. Here, we declare a 'let' that targets the element with 'id' 'rotten-score1' with a 'querySelector' and assigns it a value of a string, followed by the 'rottenScore', which updates dynamically based on user-choice.
  let rottenEl1 = document.querySelector("#rotten-score1");
  rottenEl1.textContent = `Rotten Tomatoes Score: ${rottenScore}`;
  compareScore();
}

//This 'function' carries out the same task as 'getMovieInfo1'
async function getMovieInfo2(movie) {
  let request = `http://www.omdbapi.com/?t=${movie}&apikey=bd8b9b41`;
  let response = await fetch(request);
  let data = await response.json();

  // append poster image 2
  let poster = data.Poster;
  let image = document.querySelector(".img2");
  image.setAttribute("src", poster);

  //append rotten score 2. Kevin added "l" to end of "rottenE..." variable here, because we want it to target the "'El'ement" "rotten-score" in the html by its "id" (represented by the "#"").
  let rottenScore2 = data.Ratings[1].Value;
  localStorage.setItem("rate2Value", rottenScore2);
  let rottenEl2 = document.querySelector("#rotten-score2");
  rottenEl2.textContent = `Rotten Tomatoes Score: ${rottenScore2}`;
  compareScore();
}

//Here, we declare a 'function' that 'compare's the 'Scores'. In progress... Kevin began figuring this portion out.
let compareScore = function () {
  let score1 = localStorage.getItem("rate1Value");
  let score2 = localStorage.getItem("rate2Value");
  //Here, we're confirming that a score was obtained for each user choice.
  if (score1 && score2) {
    //Here, we're targetting the div with id = 'results'. So that it startw out 'blank', we assign it an empty string as an initial value.
    let resultsDiv = document.querySelector("#results");
    let resultText = "";
    //Here, we compare the scores, populating the 'results' div with 1 of 3 possible strings.
    if (score1 > score2) {
      resultText = "Choice 1 wins!"
    } else if (score1 < score2) {
      resultText = "Choice 2 wins!"
    } else {
      resultText = "There is a tie. You'll have to choose for yourself!"
    }

    resultsDiv.textContent = `${resultText}`;
  }
};

//Buttons tested here. They "log" the string AND save the text entered into the field into local storage!)
searchBtn1.addEventListener("click", function () {
  let inputForm1 = document.getElementById("input1");
  let userInput = inputForm1.value;
  localStorage.setItem("input1Value", inputForm1.value);
  console.log("Button 1 clicked");
  getMovieInfo1(userInput);
  compareScore();
});

searchBtn2.addEventListener("click", function () {
  let inputForm2 = document.getElementById("input2");
  let userInput = inputForm2.value;
  localStorage.setItem("input2Value", inputForm2.value);
  console.log("Button 2 clicked");
  getMovieInfo2(userInput);
});

makeHistoryButtons();
