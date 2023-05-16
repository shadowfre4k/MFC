//Adding 'let' statements (essentially, 'vars') to 'get' the 'Form 1', 'Form 2', 'Btn1' & 'Btn2' 'Element's 'By' their 'Id's for access by 'click listeners', etc. later.
let title1El = document.querySelector(".choice-title");
let searchBtn1 = document.getElementById("btn1");
let inputForm2 = document.getElementById("input2");
let searchBtn2 = document.getElementById("btn2");
let choice1El = document.querySelector("#choice1-art");
let choice2El = document.querySelector("#choice2-art");

var youtubeAPI =
  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBEbEsm1R3asrUjS8pzXddROB-txKkF4tM&q=blow+Trailer&type=video";
// choice 1
async function getMovieInfo(movie) {
  let request = `http://www.omdbapi.com/?t=${movie}&apikey=bd8b9b41`;
  let response = await fetch(request);
  let data = await response.json();

  // append poster image
  let poster = data.Poster;
  let image = document.querySelector(".img1");
  image.setAttribute("src", poster);

  //append rotten score
  let rottenScore = data.Ratings[1].Value;
  localStorage.setItem("rate1Value", rottenScore);
  let rottenEl = document.querySelector("#rotten-score1");
  rottenEl.textContent = `Rotten Tomatoes Score: ${rottenScore}`;
}

async function getMovieInfo2(movie) {
  let request = `http://www.omdbapi.com/?t=${movie}&apikey=bd8b9b41`;
  let response = await fetch(request);
  let data = await response.json();

  // append poster image 2
  let poster = data.Poster;
  let image = document.querySelector(".img2");
  image.setAttribute("src", poster);

  //append rotten score 2
  let rottenScore2 = data.Ratings[1].Value;
  localStorage.setItem("rate2Value", rottenScore2);
  let rottenE2 = document.querySelector("#rotten-score2");
  rottenE2.textContent = `Rotten Tomatoes Score: ${rottenScore2}`;
}

//compare two score function
let compareScore = function () {};

//Buttons tested here. They "log" the string AND save the text entered into the field into local storage!).z
searchBtn1.addEventListener("click", function () {
  let inputForm1 = document.getElementById("input1");
  let userInput = inputForm1.value;
  localStorage.setItem("input1Value", inputForm1.value);
  console.log("Button 1 clicked");
  getMovieInfo(userInput);
  compareScore();
});

searchBtn2.addEventListener("click", function () {
  let inputForm2 = document.getElementById("input2");
  let userInput = inputForm2.value;
  localStorage.setItem("input2Value", inputForm2.value);
  console.log("Button 2 clicked");
  getMovieInfo2(userInput);
});
