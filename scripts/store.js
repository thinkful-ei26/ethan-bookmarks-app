'use strict';
/*eslint-env jquery*/

const STORE = (function(){
  const testBookmarks = [
    // {
    //   name: 'title',
    //   url: 'url',
    //   rating: 1,
    //   description: 'description',
    //   expanded: false
    // },
    // {
    //   name: 'title',
    //   url: 'url',
    //   rating: 1,
    //   description: 'description',
    //   expanded: false
    // },
    // {
    //   id: '8sdfbvbs65sd',
    //   name: 'Google',
    //   url: 'http://google.com',
    //   rating: 4,
    //   description: 'An indie search engine startup'
      
    // },
    // {
    //   id: '87fn36vd9djd',
    //   name: 'Fluffiest Cats in the World',
    //   url: 'http://medium.com/bloggerx/fluffiest-cats-334',
    //   rating: 5,
    //   description: 'The only list of fluffy cats online'
    // }
  ];

  //console.log(bookmarks);

  const setError = function(error) {
    this.error = error;
  };

  const addBookmark = function(bookmark){
    bookmark.expanded = false;
    bookmark.update = false;
    STORE.bookmarks.push(bookmark);
    // console.log(STORE.bookmarks);
  };

  const findItemByID = function (id){
    // console.log(STORE.bookmarks);
    let foundItem = this.bookmarks.find(bookmark => bookmark.id === id);
    // console.log(foundItem);
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