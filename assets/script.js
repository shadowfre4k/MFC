//Adding 'let' statements (essentially, 'vars') to 'get' the 'Form 1', 'Form 2', 'Btn1' & 'Btn2' 'Element's 'By' their 'Id's for access by 'click listeners', etc. later.
let searchBtn1 = document.getElementById("btn1");
let searchBtn2 = document.getElementById("btn2");

let choice1 = false;
let choice2 = false;

async function getYTTrailer(movie) {
  let request =
    "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBEbEsm1R3asrUjS8pzXddROB-txKkF4tM&q=" +
    movie +
    "+Trailer&type=video";
  let response = await fetch(request);
  let data = await response.json();
  let videoId = data.items[0].id.videoId;
  console.log(videoId);
}

// choice 1
async function getMovieInfo(movie) {
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

  choice1 = true;
  if (choice1 === choice2) {
    compareScore();
  } else {
    console.log("please select second movie");
    return;
  }
}

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

  choice2 = true;
  if (choice2 === choice1) {
    compareScore();
  } else {
  }
}

//compare two score function
compareScore = function () {
  let title1 = localStorage.getItem("input1Value");
  let title2 = localStorage.getItem("input2Value");
  let score1 = localStorage.getItem("rate1Value");
  let score2 = localStorage.getItem("rate2Value");

  if (score1 > score2) {
    getYTTrailer(title1);
  } else {
    getYTTrailer(title2);
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
