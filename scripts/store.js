'use strict';
/*eslint-env jquery*/

const STORE = (function(){
  //console.log(bookmarks);

  const setError = function(error) {
    this.error = error;
  };

  const addBookmark = function(bookmark){
    bookmark.expanded = false;
    STORE.bookmarks.push(bookmark);
    // console.log(STORE.bookmarks);
  };

  const findItemByID = function (id){
    console.log(STORE.bookmarks);
    let foundItem = this.bookmarks.find(bookmark => bookmark.id === id);
    console.log(foundItem);
    return foundItem;
  };


  const deleteBookmark = function (id){
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    console.log(this.bookmarks);
  };

  return {
    bookmarks: [],
    addBookmark,
    deleteBookmark,
    findItemByID,
    setError,
    addItem: false,
    errorReturn: false,
    minimumRating: null
  };

}());