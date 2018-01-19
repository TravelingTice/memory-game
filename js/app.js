/*
 * Create a list that holds all of your cards
 */
var cards = ["fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-diamond", "fa-diamond", "fa-bomb", "fa-bomb", "fa-bicycle", "fa-bicycle"];
var flippedCards = 0;
var matches = 0;
var moves = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 //TODO: Add description to all functions
function generateBoard () {
  shuffle(cards);
  var allCards = document.querySelectorAll('.ca');
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

function openCard(e) {
    e.target.classList.add('open', 'show');
    flippedCards += 1;
    moves += 1;
    e.target.removeEventListener('click', openCard);
    if (flippedCards === 2) {
      removeListener();
      matchCheck();
      if (matchCheck()) {
        matchFunc();
      } else {
        setTimeout(noMatchFunc, 2000);
      }
      flippedCards = 0;
      setTimeout(addListener, 2300)
    }
}

function addListener () {
  var card = document.querySelectorAll('.card')
  for (i = 0; i < card.length; i++) {
    if (card[i].classList.contains('match') === false) {
      card[i].addEventListener('click', openCard)
    }
  };
}

function removeListener () {
  var card = document.querySelectorAll('.card')
  for (i = 0; i < card.length; i++) {
    card[i].removeEventListener('click', openCard)
  };
}

function matchCheck () {
  var openCardList = document.querySelectorAll('.open');
  var firstCardElement = openCardList[0].firstElementChild;
  var secondCardElement = openCardList[1].firstElementChild;
  var firstCard = firstCardElement.classList[2];
  var secondCard = secondCardElement.classList[2];
  if (firstCard === secondCard) {
    return true;
  } else {
    return false;
  }
}

function matchFunc() {
  openCardList = document.querySelectorAll('.open');
  for (i = 0; i < openCardList.length; i++) {
    openCardList[i].classList.add('match')
    openCardList[i].classList.remove('open', 'show');
  };
  matches += 1;
}

function noMatchFunc() {
  openCardList = document.querySelectorAll('.open');
  for (i = 0; i < openCardList.length; i++) {
    openCardList[i].classList.remove('open', 'show');
  };
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
generateBoard();
