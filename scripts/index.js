'use strict';
/*eslint-env jquery*/
/* global STORE, Bookmarks, API $ */

$(document).ready(function() {
  Bookmarks.bindEventListeners();
  // Bookmarks.render(STORE.bookmarks);
  API.getBookmarks((bookmarkItems) => {
    // console.log('api call made');
    bookmarkItems.forEach((bookmark) => STORE.addBookmark(bookmark));
    Bookmarks.render();
  });
});