const scoreZero = document.getElementById("score--0");
const scoreOne = document.getElementById("score--1");
const currentZeroScore = document.getElementById("current--0");
const currentOneScore = document.getElementById("current--1");
const playerZero = document.querySelector(".player--0");
const playerOne = document.querySelector(".player--1");
const diceElement = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

// Set initial Valuse
scoreZero.textContent = 0;
scoreOne.textContent = 0;
diceElement.classList.add("hidden");

// Declaring Variables
let scores, currentScore, activePlayer, playing;

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  playerZero.classList.toggle("player--active");
  playerOne.classList.toggle("player--active");
}

const init = function () {
  scoreZero.textContent = 0;
  scoreOne.textContent = 0;
  currentZeroScore.textContent = 0;
  currentOneScore.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceElement.classList.add("hidden");
  playerZero.classList.remove("player--winner");
  playerOne.classList.remove("player--winner");
  playerZero.classList.add("player--active");
  playerOne.classList.remove("player--active");
};

init();

// Rolling The Dice
rollBtn.addEventListener("click", () => {
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

// Resetting The Game
newBtn.addEventListener("click", init);
