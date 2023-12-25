'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const check = function () {
  const guess = Number(document.querySelector('.guess').value);
  // NOTE: When there's no input number
  if (!guess) {
    displayMessage('No NUMBER!');
  }
  // NOTE: When palyer wins
  else if (guess === secretNumber) {
    displayMessage('Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highScore) highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
  // NOTE: When guess is wrong:
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You lost the game ! :(');
      document.querySelector('.score').textContent = score = 0;
    }
  }
};

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', check);

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').stye.width = '15rem';
});

// ENTER Keydown FOR CHECK
document.querySelector('.guess').addEventListener('keydown', function (e) {
  if (e.key === `Enter`) {
    check();
  }
});
