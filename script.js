const board = document.querySelector('.game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');

const icons = ['🍎', '🍌', '🍒', '🍇', '🍎', '🍌', '🍒', '🍇'];
let shuffledIcons = icons.sort(() => 0.5 - Math.random());
let firstCard, secondCard;
let moves = 0;
let matchCount = 0;
let isFlipping = false;
let timer = 0;
let interval;

// Initialize the game
function createBoard() {
  shuffledIcons.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (isFlipping || this === firstCard) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.icon;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  isFlipping = true;
  moves++;
  movesDisplay.textContent = moves;

  const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
  if (isMatch) {
    matchCount++;
    if (matchCount === icons.length / 2) endGame();
    resetCards();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  isFlipping = false;
}

function startTimer() {
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);
}

function endGame() {
  clearInterval(interval);
  setTimeout(() => alert(`You won! Moves: ${moves}, Time: ${timer} seconds`), 500);
}

// Start the game
createBoard();
startTimer();
