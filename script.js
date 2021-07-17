const mainGame = () => {
  // Player and Computer scores.
  let playerScore = 0;
  let computerScore = 0;
  const resetAttributes = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const winner = document.querySelector(".winner");
    winner.textContent = "Choose Your Weapon!";
    playerScore.textContent = "0";
    computerScore.textContent = "0";

    playerHand.src = "images/rock.png";
    computerHand.src = "images/rock.png";
  };
  // Starts game.
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");
    // Fades intro screen into match screen.
    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  const playGame = () => {
    const weaponChoice = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const bothHands = document.querySelectorAll(".hands img");

    // Resets animation for each turn.
    bothHands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });
    const computerOptions = ["rock", "paper", "scissors"];

    // Computer selects item at random.
    weaponChoice.forEach((option) => {
      option.addEventListener("click", function () {
        // Computer chooses rock, paper or scissors.
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        const playerChoice = this.textContent;
        // Resets hands back to rock after each turn.
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        playerHand.src = "images/rock.png";
        computerHand.src = "images/rock.png";

        setTimeout(() => {
          // Calling our comparison function.
          compareHands(playerChoice, computerChoice);
          // Update images based on player and computer selection.
          playerHand.src = `images/${playerChoice}.png`;
          computerHand.src = `images/${computerChoice}.png`;
        }, 1000);

        // Player and Computer hand animation
        playerHand.style.animation = "playerShake 1s ease";
        computerHand.style.animation = "computerShake 1s ease";
      });
    });
  };

  // Evaluates who won the round.
  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");
    if (playerChoice === computerChoice) {
      winner.textContent = "It's a tie!";
      return;
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice == "paper" && computerChoice === "rock") ||
      (playerChoice == "scissors" && computerChoice == "paper")
    ) {
      winner.textContent = "Player wins that round!";
      playerScore++;
      updateScore();
      return;
    } else {
      winner.textContent = "Computer wins that round!";
      computerScore++;
      updateScore();
      return;
    }
  };

  const updateScore = () => {
    const winnerBanner = document.querySelector(".winner");
    const playerScores = document.querySelector(".player-score p");
    const computerScores = document.querySelector(".computer-score p");
    playerScores.textContent = playerScore;
    computerScores.textContent = computerScore;
    if (playerScore === 3) {
      winnerBanner.textContent = "Player Wins the match!";
      gameOver();
      return;
    } else if (computerScore === 3) {
      winnerBanner.textContent = "Computer Wins the match!";
      gameOver();
      return;
    }
  };
  const gameOver = () => {
    // Creates game over screen.
    const gameOverText = document.querySelector(".intro h1");
    gameOverText.textContent = "Game Over!";
    const playAgainBtn = document.querySelector(".intro button");
    playAgainBtn.textContent = "Play Again?";
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");
    setTimeout(() => {
      // Fades match screen out.
      match.classList.add("fadeOut");
      match.classList.remove("fadeIn");

      // Fades Game over screen in.
      introScreen.classList.add("fadeIn");
    }, 1000);
    setTimeout(() => {
      playAgainBtn.addEventListener(
        "click",
        () => {
          match.classList.remove("fadeOut");
          match.classList.add("fadeIn");
          introScreen.classList.remove("fadeIn");
          introScreen.classList.add("fadeOut");
          resetAttributes();
          mainGame();
        },
        1000
      );
    });
  };

  startGame();
  playGame();
};
mainGame();
