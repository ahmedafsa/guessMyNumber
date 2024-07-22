"use strict";

// -------------------------------------
// --- Game Initialization
// -------------------------------------

const secretContainer = document.querySelector(".number");

const bodySelector = document.querySelector("body");
const between = document.querySelector(".between");
const message = document.querySelector(".message");
const scoreDisplay = document.querySelector(".score");
const pageHighScore = document.querySelector(".highscore");
const guessInput = document.querySelector(".guess");
let guess = document.querySelector(".guess").value;

const checkButton = document.querySelector(".check");
const againButton = document.querySelector(".again");

let secretNumber;
let score = 20;
let highScore = 0;
let isPlayerWinner = false;

// -------------------------------------
// --- FUNCTIONS
// -------------------------------------

const generateSecretNumber = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
};

const getGuessNumber = function () {
  guess = Number(document.querySelector(".guess").value);
};

const displayMessage = function (text) {
  message.textContent = text;
};

const decreaseScore = function () {
  score--;
  scoreDisplay.textContent = score;
};
const updateHighScore = function () {
  if (score > highScore) highScore = score;
  pageHighScore.textContent = highScore;
};

const again = function () {
  score = 20;
  scoreDisplay.textContent = score;
  isPlayerWinner = false;

  displayMessage("Start guessing...");

  bodySelector.style.backgroundColor = "#222";
  secretContainer.style.width = "15rem";

  guessInput.value = "";

  secretContainer.textContent = "?";
  generateSecretNumber();
};

const guessInvalid = function () {
  between.style.color = "#f03e3e";
  between.style.transform = "scale(1.7)";

  setTimeout(function () {
    between.style.color = "#fff";
    between.style.transform = "scale(1)";
  }, 800);
};

const checkNumber = function () {
  getGuessNumber();

  // When the guess is NaN (0)
  if (isPlayerWinner) {
    return;
  }

  if (!guess || guess < 0 || guess > 20) {
    displayMessage("⛔ Invalid Number!");
    between.style.transition = "all, 1s";
    guessInvalid();

    // When the guess is CORRECT
  } else if (guess === secretNumber) {
    displayMessage("Correct Number 🎉");
    secretContainer.textContent = secretNumber;

    bodySelector.style.backgroundColor = "#60b347";
    secretContainer.style.width = "30rem";

    updateHighScore();

    isPlayerWinner = true;

    // When the guess is WRONG
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      decreaseScore();
    } else {
      displayMessage("GAME OVER 🫣");
      scoreDisplay.textContent = 0;

      bodySelector.style.backgroundColor = "#791919";
    }
  }
};

// -------------------------------------
// --- GAME SCRIPT
// -------------------------------------

generateSecretNumber();

checkButton.addEventListener("click", checkNumber);
againButton.addEventListener("click", again);

// Implementing Keypress (R) to reset the game
document.addEventListener("keydown", function (e) {
  if (e.code === "KeyR") again();
});

// Implementing Keypress (Enter) to check the guess number
guessInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") checkNumber();
});

// Prevents typing Letters into the guess input field
guessInput.addEventListener("keypress", function (e) {
  console.log(e, typeof e);
  if (isNaN(e.key)) e.preventDefault();
});
