function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors", "Golem", "Griffin"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && (computer === "Scissors" || computer === "Golem")) ||
    (player === "Paper" && (computer === "Rock" || computer === "Golem")) ||
    (player === "Scissors" &&
      (computer === "Paper" || computer === "Griffin")) ||
    (player === "Golem" &&
      (computer === "Scissors" || computer === "Griffin")) ||
    (player === "Griffin" && (computer === "Paper" || computer === "Rock"))
  );
}

let playerScore = 0;
let computerScore = 0;

function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  const playerChoiceImg = document.getElementById("player-choice-img");
  const computerChoiceImg = document.getElementById("computer-choice-img");

  playerChoiceImg.src = `${userOption.toLowerCase()}.png`;
  computerChoiceImg.src = `${computerResult.toLowerCase()}.png`;

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");
const fightText = document.getElementById("fight-text");

function showResults(userOption) {
  roundResultsMsg.innerText = getRoundResults(userOption);
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  document.body.classList.remove("player-theme", "computer-theme");

  if (playerScore === 3 || computerScore === 3) {
    winnerMsgElement.innerText = `${
      playerScore === 3 ? "Player" : "Computer"
    } has won the game!`;

    if (playerScore === 3) {
      document.body.classList.add("player-theme");
    } else {
      document.body.classList.add("computer-theme");
    }

    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;
  resetGameBtn.style.display = "none";
  optionsContainer.style.display = "block";
  winnerMsgElement.innerText = "";
  roundResultsMsg.innerText = "";
  document.getElementById("player-choice-img").src = "";
  document.getElementById("computer-choice-img").src = "";
  document.body.classList.remove("player-theme", "computer-theme");
}

resetGameBtn.addEventListener("click", resetGame);

document.getElementById("rock-btn").addEventListener("click", function () {
  showResults("Rock");
});

document.getElementById("paper-btn").addEventListener("click", function () {
  showResults("Paper");
});

document.getElementById("scissors-btn").addEventListener("click", function () {
  showResults("Scissors");
});

document.getElementById("golem-btn").addEventListener("click", function () {
  showResults("Golem");
});

document.getElementById("griffin-btn").addEventListener("click", function () {
  showResults("Griffin");
});
