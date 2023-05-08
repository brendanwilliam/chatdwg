/*
 * Date: May 7, 2023
 * Author: Brendan Keane
 * Purpose: This file contains the game logic for the game "Spot the Bot"
 */

const BOT_EMOJI = '🤖';
const HUMAN_EMOJI = '🥳';
const QUESTIONS = [];

var game = new Object();
game.human = 0;
game.bot = 0;
game.guess = 0;
game.round = 1;
game.rounds = 5;
game.questions = [];

'use strict';

(function() {

  window.addEventListener('load', init);

  /**
   * Initializes the page
   * @return {void}
   */
  function init() {

    fetch('../../src/data/spotTheBot.json')
      .then(response => response.json())
      .then(data => {
        QUESTIONS.push(data);
      });

    qs('#game-start').addEventListener('click', startGame);
    qs("#play-again").addEventListener('click', startGame);
  }


  /* ------------------------------ Game Functions  ------------------------------ */
  function startGame() {

    // Reset game values
    game.bot = 0;
    game.human = 0;
    game.round = 1;

    // Hide the tutorial and show the game
    if (!qs('#tutorial').classList.contains('hidden')) {
      qs('#tutorial').classList.add('hidden');
      qs('#game').classList.remove('hidden');
      qs('#results').classList.add('hidden');
    }

    // Populate the first round
    populateRound();
  }

  /**
   * Checks if the guess is human or bot and updates the score
   * @return {void}
   */
  function clickAnswer() {

    // Increment the score
    if (this.classList.contains('bot')) {
      game.bot++;
    } else {
      game.human++;
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
    var botScore = qs('#bot-score');
    botScore.textContent = game.bot;

    // Human score update
    var humanScore = qs('#human-score');
    humanScore.textContent = game.human;

    // Check if the guess limit has been reached
    if (game.guess === 1) {
      endRound();
    } else {
      game.guess++;
    }
  }

  /**
   * Ends the round and checks if the game is over
   */
  function endRound() {

    // Make the next button visible
    qs('#next').classList.remove('hidden');

    // Remove the event listeners from the answers
    var answers = document.qsa('.answer');
    for (var i = 0; i < answers.length; i++) {
      revealAnswer(answers[i]);
    }

    // Check if the game is over
    if (game.round === game.rounds) {
      endGame();
    }
  }

  /**
   * Reveals the source of a clicked answer
   * @param {object} answer - the answer that was clicked
   * @return {void}
   */
  function revealAnswer(answer) {
    if (answer.classList.contains('bot')) {
      answer.textContent = BOT_EMOJI;
    } else {
      answer.textContent = HUMAN_EMOJI;
    }
    answer.removeEventListener('click', clickAnswer);
  }

  /**
   * Ends the game and displays the results
   * @return {void}
   */
  function endGame() {
    if (!qs('#game').classList.contains('hidden')) {
      qs('#tutorial').classList.add('hidden');
      qs('#game').classList.add('hidden');
      qs('#results').classList.remove('hidden');
    }
  }

  /**
   * Populates a round with a random question
   */
  function populateRound() {

      // Get a random question
      var curr_number = Math.floor(Math.random() * QUESTIONS.length);
      while (game.questions.includes(curr_number)) {
        curr_number = Math.floor(Math.random() * QUESTIONS.length);
      }
      var curr_question = QUESTIONS[curr_number].question;
      var curr_answers = shuffle(QUESTIONS[curr_number].answers);

      // Set the question
      var questionText = qs('#question');
      questionText.textContent = curr_question;

      // Set the answers
      var answers = document.qsa('.answer');
      for (var i = 0; i < answers.length; i++) {
        answers[i].textContent = curr_answers[i];
        if (curr_answers[i].chatGPTAnswer) {
          answers[i].classList.add('bot');
        }
        answers[i].addEventListener('click', clickAnswer);
      }

      // Adding the event listeners to the question buttons
      var answerCards = qsa(".answer")
      answerCards.forEach(function (card) {
          card.addEventListener("click", clickAnswer);
      });

      // Reset the guess counter
      game.guess = 0;
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

  /**
  * Returns all elements that has the matches selector passed.
  * @param {string} selector - selector for element
  * @return {object} DOM object associated with selector.
  */
   function qsa(selector) {
    return document.querySelectorAll(selector);
  }

})();