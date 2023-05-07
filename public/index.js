/*
 * Date: May 6, 2023
 * Author: Brendan Keane
 * Purpose: Add menu button interactivity to navbar
 */

'use strict';
(function() {

  window.addEventListener('load', init);

  /**
   * Initializes the page
   * @return {void}
   */
  function init() {
    qs('#menu-btn').addEventListener('click', toggleMenu);
  }

  function toggleMenu() {
    // Reference to menu button and menu items
    var menu = qs('#menu-btn');
    var menuItems = qs('nav');

    if(menu.classList.contains('open')) {
      menu.classList.remove('open');
      menu.textContent = 'Menu';
      menuItems.classList.remove('open');
    } else {
      menu.classList.add('open');
      menu.textContent = 'Close';
      menuItems.classList.add('open');
    }

  }


  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
   async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the matches the selector passed.
   * @param {string} selector - selector for element
   * @return {object} DOM object associated with selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

})();