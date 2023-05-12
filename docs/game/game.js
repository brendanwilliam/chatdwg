/*
 * Date: May 7, 2023
 * Author: Brendan Keane
 * Purpose: This file contains the game logic for the game "Spot the Bot"
 */

const BOT_EMOJI = '🤖';
const HUMAN_EMOJI = '🥳';
const MAX_ROUNDS = 5;
const ANSWER = ['A.', 'B.', 'C.'];

var questions = new Object();
var game = new Object();
game.human = 0;
game.bot = 0;
game.guess = 0;
game.round = 0;
game.rounds = MAX_ROUNDS;
game.questions = [];

'use strict';

(function() {

  window.addEventListener('load', init);

  /**
   * Initializes the page
   * @return {void}
   */
  function init() {

    fetch('../src/data/spotTheBot.json')
      .then(response => response.json())
      .then(data => {
        QUESTIONS = data;
      });

    qs('#next').addEventListener('click', populateRound);
    qs('#game-start').addEventListener('click', startGame);
    qs('#reset').addEventListener('click', startGame);
  }


  /* ------------------------------ Game Functions  ------------------------------ */
  /**
   * Starts the game and populates the first round
   * @return {void}
   */
  function startGame() {
    var answers = qsa('.answer');
    answers.forEach(function(answer) { answer.classList.remove('bot'); });

    // Reset game values
    game.bot = 0;
    game.human = 0;
    game.round = 0;
    qs('#q-total').textContent = game.rounds;

    qs('#tutorial').classList.add('hidden');
    qs('#game').classList.remove('hidden');
    qs('#results').classList.add('hidden');

    // Populate the first round
    populateRound();
    updateScore();
  }

  /**
   * Checks if the guess is human or bot and updates the score
   * @return {void}
   */
  function clickAnswer() {
    game.guess++;

    // Increment the score
    if (this.classList.contains('bot')) {
      game.bot++;
      revealAnswer(this);
    } else {
      game.human++;
      endRound();
    }
    // Update the score
    updateScore();
  }

  /**
   * Updates the score and checks if the guess limit has been reached
   * @return {void}
   */
  function updateScore(){

    // Bot score update
    var botScore = qsa('.bot-score');
    botScore.forEach(function (score) { score.textContent = game.bot; });

    // Human score update
    var humanScore = qsa('.human-score');
    humanScore.forEach(function (score) { score.textContent = game.human; });

    // Check if the guess limit has been reached
    if (game.guess === 2) {
      endRound();
    }
  }

  /**
   * Ends the round and checks if the game is over
   */
  function endRound() {

    // Make the next button visible
    qs('#next').classList.remove('hidden');

    // Remove the event listeners from the answers
    var answers = qsa('.answer');
    for (var i = 0; i < answers.length; i++) {
      revealAnswer(answers[i]);
      answers[i].removeEventListener('click', clickAnswer);
    }

    // Check for final round
    if (game.round === game.rounds) {
      qs('#next').addEventListener('click', endGame);
    }
  }

  /**
   * Reveals the source of a clicked answer
   * @param {object} answer - the answer that was clicked
   * @return {void}
   */
  function revealAnswer(answer) {

    answer.removeEventListener('click', clickAnswer);
    var answerIcon = answer.querySelector('.answer-icon');
    if (answer.classList.contains('bot')) {
      answerIcon.textContent = BOT_EMOJI;
      answer.classList.add('bot-clicked');
    } else {
      answerIcon.textContent = HUMAN_EMOJI;
      answer.classList.add('human-clicked');
    }
    answer.removeEventListener('click', clickAnswer);
  }

  /**
   * Ends the game and displays the results
   * @return {void}
   */
  function endGame() {
    qs('#next').removeEventListener('click', endGame);
    qs('#tutorial').classList.add('hidden');
    qs('#game').classList.add('hidden');
    qs('#results').classList.remove('hidden');

    game.human = 0;
    game.bot = 0;
    game.questions = [];
  }

  /**
   * Resets the answers to their default state
   * @return {void}
   */
  function resetRound() {
    game.round++;
    qs('#q-curr').textContent = game.round;
    qs('#next').classList.add('hidden');
  }

  /**
   * Retrieve an unused question from the question bank
   * @return {object} - The question object
   */
  function getQuestion() {
    game.guess = 0;
    var curr_number = Math.floor(Math.random() * QUESTIONS.length);
    while (game.questions.includes(curr_number)) {
      curr_number = Math.floor(Math.random() * QUESTIONS.length);
    }
    game.questions.push(curr_number);
    return QUESTIONS[curr_number];
  }

  /**
   * Populates a round with a random question
   */
  function populateRound() {

    // Clears answers and retrieves a new, unique question
    resetRound();
    resetView();
    var curr = getQuestion();

    // Get a random question
    var curr_question = curr.question;
    var curr_answers = shuffle(curr.answers);

    // Set the question
    var questionText = qs('#question');
    questionText.textContent = curr_question;

    // Set the answers
    var answers = qsa('.answer');
    for (var i = 0; i < answers.length; i++) {

      answers[i].classList.remove('bot-clicked');
      answers[i].classList.remove('human-clicked');

      // Set the answer text and icon
      var answerText = answers[i].querySelector('.answer-text');
      answerText.textContent = curr_answers[i].answerContent;

      var answerIcon = answers[i].querySelector('.answer-icon');
      answerIcon.textContent = ANSWER[i];

      if (curr_answers[i].chatGPTAnswer) {
        answers[i].classList.add('bot');
      } else {
        answers[i].classList.remove('bot');
      }
      answers[i].addEventListener('click', clickAnswer);
    }

    // Adding the event listeners to the question buttons
    var answerCards = qsa(".answer")
    answerCards.forEach(function (card) {
        card.addEventListener("click", clickAnswer);
    });
  }

  /**
   * Shuffles an array of game answers
   * @param {array} answers - the array of answers to shuffle
   * @return {array} the shuffled array
   */
   function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  /**
  * Returns the element that has the matches the selector passed.
  * @param {string} selector - selector for element
  * @return {object} DOM object associated with selector.
  */
  function qs(selector) {
    return document.querySelector(selector);
  }

  function resetView() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
  * Returns all elements that has the matches selector passed.
  * @param {string} selector - selector for element
  * @return {object} DOM object associated with selector.
  */
   function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();