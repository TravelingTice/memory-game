/*
 * Create a list that holds all of your cards
 */
const cards = ["fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-diamond", "fa-diamond", "fa-bomb", "fa-bomb", "fa-bicycle", "fa-bicycle"];
let flippedCards = 0;
let matches = 0;
let moves = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Generate board function upon refresh
function generateBoard() {
  shuffle(cards);
  const allCards = document.querySelectorAll('.ca');
  for (i = 0; i < cards.length; i++) {
    allCards[i].classList.add(cards[i]);
  }
  addListener();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Add 'click' event listener to all cards that are still hidden
function addListener() {
  const card = document.querySelectorAll('.card')
  for (i = 0; i < card.length; i++) {
    if (card[i].classList.contains('match') === false) {
      card[i].addEventListener('click', openCard)
    }
  };
}

// Function gets triggered when a card is clicked
function openCard(e) {
  e.target.classList.add('open', 'show');
  flippedCards += 1;
  e.target.removeEventListener('click', openCard);
  if (flippedCards >= 2) {
    moves += 1;
    removeListener();
    matchCheck();
    if (matchCheck()) {
      matchFunc();
      setTimeout(addListener, 10);
    } else {
      setTimeout(noMatchFunc, 1500);
    }
    flippedCards = 0;
    setTimeout(addListener, 1600);
    displayMoves();
  }
}

// Remove listener from all cards in game
function removeListener() {
  const card = document.querySelectorAll('.card')
  for (i = 0; i < card.length; i++) {
    card[i].removeEventListener('click', openCard)
  };
}

// Check if the 2 cards have same class, return boolean
function matchCheck() {
  const openCardList = document.querySelectorAll('.open');
  const firstCardElement = openCardList[0].firstElementChild;
  const secondCardElement = openCardList[1].firstElementChild;
  const firstCard = firstCardElement.classList[2];
  const secondCard = secondCardElement.classList[2];
  if (firstCard === secondCard) {
    return true;
  } else {
    return false;
  }
}

// Execute when matchCheck === true
function matchFunc() {
  openCardList = document.querySelectorAll('.open');
  for (i = 0; i < openCardList.length; i++) {
    openCardList[i].classList.add('match')
    openCardList[i].classList.remove('open', 'show');
  };
  matches += 1;
}

// Execute when matchCheck === false
function noMatchFunc() {
  openCardList = document.querySelectorAll('.open');
  for (i = 0; i < openCardList.length; i++) {
    openCardList[i].classList.remove('open', 'show');
  };
}

//Display Moves
function displayMoves() {
  const moveDisplay = document.querySelector('.moves');
  if (moves === 1) {
    moveDisplay.textContent = moves + ' Move';
  } else {
    moveDisplay.textContent = moves + ' Moves';
  }
}

generateBoard();
