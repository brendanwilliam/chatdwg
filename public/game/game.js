/*
 * Date: May 7, 2023
 * Author: Brendan Keane
 * Purpose: This file contains the game logic for the game "Spot the Bot"
 */

const BOT_EMOJI = '🤖';
const HUMAN_EMOJI = '🥳';

'use strict';

(function() {

  window.addEventListener('load', init);

  /**
   * Initializes the page
   * @return {void}
   */
  function init() {
    qs('#game-start').addEventListener('click', startGame);
    qs('#game-end').addEventListener('click', endGame);
  };

  function startGame() {

    if (!qs('#tutorial').classList.contains('hidden')) {
      qs('#tutorial').classList.add('hidden');
      qs('#game').classList.remove('hidden');
    }
  };

/* ------------------------------ Helper Functions  ------------------------------ */
/**
* Returns the element that has the matches the selector passed.
* @param {string} selector - selector for element
* @return {object} DOM object associated with selector.
*/
function qs(selector) {
  return document.querySelector(selector);
}

})();