// Find the HTML elements we want to control
const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const restartButton = document.getElementById("restart-button");

// Generate a random whole number from 1 to 100
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Run when the player clicks Guess or presses Enter
form.addEventListener("submit", function (event) {
  // Stop the form from refreshing the page
  event.preventDefault();

  const guess = Number(input.value);

  // Only accept whole numbers from 1 to 100
  if (
    input.value.trim() === "" ||
    !Number.isInteger(guess) ||
    guess < 1 ||
    guess > 100
  ) {
    message.textContent = "Please enter a whole number from 1 to 100.";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess === secretNumber) {
    message.textContent =
      `🎉 Correct! The number was ${secretNumber}. ` +
      `You got it in ${attempts} attempt${attempts === 1 ? "" : "s"}!`;

    // Stop further guesses after winning
    input.disabled = true;
    guessButton.disabled = true;
    restartButton.focus();
  } else {
    if (guess < secretNumber) {
      message.textContent = "⬆️ Too low! Try a higher number.";
    } else {
      message.textContent = "⬇️ Too high! Try a lower number.";
    }

    input.value = "";
    input.focus();
  }
});

// Start a new game when Play Again is clicked
restartButton.addEventListener("click", function () {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;

  attemptsDisplay.textContent = "0";
  message.textContent = "Enter a number to start!";
  input.value = "";
  input.disabled = false;
  guessButton.disabled = false;
  input.focus();
});