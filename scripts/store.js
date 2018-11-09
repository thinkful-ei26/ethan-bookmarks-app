'use strict';
/*eslint-env jquery*/

const STORE = (function(){
  const bookmarks = [
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
    STORE.bookmarks.push(bookmark);
    // console.log(STORE.bookmarks);
  };

  const findItemByID = function (id){
    STORE.bookmarks.filter(bookmark => bookmark.id !== id);
  };


  const deleteBookmark = function (id){
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    console.log(this.bookmarks);
  };

  return {
    bookmarks: [],
    addBookmark,
    deleteBookmark,
    setError,
    addItem: false,
    errorReturn: false,
    filteredByRating: null
  };

}());