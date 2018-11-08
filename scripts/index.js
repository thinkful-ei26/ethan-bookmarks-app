'use strict';
/*eslint-env jquery*/
/* global STORE, Bookmarks, API $ */

$(document).ready(function() {
  Bookmarks.bindEventListeners();
  // Bookmarks.render(STORE.bookmarks);
  API.getBookmarks((bookmarks) => {
    // console.log('api call made');
    bookmarks.forEach((bookmark) => STORE.addBookmark(bookmark));
    Bookmarks.render();
  });
  //get items function will need to go here
});