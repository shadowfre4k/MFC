//Global Document queries
let searchBtn1 = document.getElementById("btn1");
let searchBtn2 = document.getElementById("btn2");
let videoEl = document.getElementById("yTVideo");

//states to ensure that both movies are picked before trailer pops up
let choice1 = false;
let choice2 = false;

//fetch request function for trailer that passes the Winner's movie title
async function getYTTrailer(movie) {
  //requesting data bassed on our search queries
  let request =
    "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBEbEsm1R3asrUjS8pzXddROB-txKkF4tM&q=" +
    movie +
    "+Trailer&type=video";
  let response = await fetch(request);
  let data = await response.json();

  let ytId = data.items[0].id.videoId; //this get the Trailer video ID off of youtube
  let videoEmbed = `https://www.youtube.com/embed/${ytId}`; //the embed link where we place ID to retrieve the trailer and place it on our site

  videoEl.setAttribute("src", videoEmbed); //setting  the class to the HTML Element to place the video .
  videoEl.classList.remove("hide"); //removes the hide class that creates an unsightly empty space.
  // pastWinner();
  // hot fix for duplicates showing up
  let historyDiv = document.querySelector(".box");
  let historyButton = document.createElement("button");
  historyButton.textContent = movie;
  historyButton.setAttribute("class", "choice-title");
  historyDiv.appendChild(historyButton);
}

// choice 1

//grabs the user input and passes it through to obtain the movie poster and rotten tomato score
async function getMovieInfo(movie) {
  //fetch request for omdb
  let request = `https://www.omdbapi.com/?t=${movie}&apikey=bd8b9b41`;
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
  //make sure both are checked
  choice1 = true;
  if (choice1 === choice2) {
    compareScore();
  } else {
    console.log("please select second movie"); //can add a visual prompt for reminder to select other movie
    return;
  }
}
//fetch data from omdb
async function getMovieInfo2(movie) {
  let request = `https://www.omdbapi.com/?t=${movie}&apikey=bd8b9b41`;
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

  //make sure they choose another movie
  choice2 = true;
  if (choice2 === choice1) {
    compareScore();
  } else {
    console.log("please select the first movie"); //can add a visual prompt for reminder to select other movie
  }
}

//store in hall of fame for history

//compare two score function
compareScore = function () {
  //retrieves data stored to compare and decide a winner
  let title1 = localStorage.getItem("input1Value");
  let title2 = localStorage.getItem("input2Value");
  let score1 = localStorage.getItem("rate1Value");
  let score2 = localStorage.getItem("rate2Value");

  if (score1 > score2) {
    getYTTrailer(title1);
    hallOfFame(title1);
  } else {
    getYTTrailer(title2);
    hallOfFame(title2);
  }
};

var hallOfFame = function (movieTitle) {
  let movies = [];
  movies = JSON.parse(localStorage.getItem("MovieTitle")) || [];
  movies.push(movieTitle);
  localStorage.setItem("MovieTitle", JSON.stringify(movies));
};

var pastWinner = function () {
  movies = JSON.parse(localStorage.getItem("MovieTitle"));

  for (let i = Math.max(movies.length - 10, 0); i < movies.length; i++) {
    //Here, we ‘create’ the ‘button’ ‘Element’ and give it the ‘textContent’ of
    let historyDiv = document.querySelector(".box");
    let historyButton = document.createElement("button");
    historyButton.textContent = movies[i];
    historyButton.setAttribute("class", "choice-title");
    historyDiv.appendChild(historyButton);
  }
};
//Buttons tested here. They "log" the string AND save the text entered into the field into local storage!).z
searchBtn1.addEventListener("click", function () {
  let inputForm1 = document.getElementById("input1");
  let userInput = inputForm1.value;
  localStorage.setItem("input1Value", inputForm1.value);
  console.log("Button 1 clicked");
  getMovieInfo(userInput);
});

searchBtn2.addEventListener("click", function () {
  let inputForm2 = document.getElementById("input2");
  let userInput = inputForm2.value;
  localStorage.setItem("input2Value", inputForm2.value);
  console.log("Button 2 clicked");
  getMovieInfo2(userInput);
});

pastWinner();
