'use strict';
/*eslint-env jquery*/
/* global STORE, Bookmarks, API $ */

const Bookmarks = (function (){

  // const testData = [
  //   {
  //     name: 'title',
  //     url: 'url',
  //     rating: 1,
  //     description: 'description',
  //     expanded: false
  //   },
  //   {
  //     name: 'title',
  //     url: 'url',
  //     rating: 1,
  //     description: 'description',
  //     expanded: false
  //   },
  //   {
  //     id: '8sdfbvbs65sd',
  //     name: 'Google',
  //     url: 'http://google.com',
  //     rating: 4,
  //     description: 'An indie search engine startup'
      
  //   },
  //   {
  //     id: '87fn36vd9djd',
  //     name: 'Fluffiest Cats in the World',
  //     url: 'http://medium.com/bloggerx/fluffiest-cats-334',
  //     rating: 5,
  //     description: 'The only list of fluffy cats online'
  //   }
  // ];

  function generateHTMLString (bookmarks){
    console.log(bookmarks);
    let stringifiedBookmarks = bookmarks.map(bookmark => generateItemElement(bookmark));
    console.log(stringifiedBookmarks);
    return stringifiedBookmarks.join('');
  }

  function generateItemElement (object){
    console.log(object);
    return `
    <li class='bookmark-item-element' data-item-id='${object.id}'>
      <div>${object.title}</div>
      <div>${object.rating}</div>
      <div>${object.url}</div>
      <div>${object.description}</div>
    </li>
    `;
  }

  function render (){
    // const bookmarkString = generateHTMLString(STORE.bookmarks);
    $('ul').html(generateHTMLString(STORE.bookmarks));
  }


  $.fn.extend({
    serializeJson: function(){
      const newObject = {};
      const data = new FormData(this[0]);
      data.forEach((value, key) => {
        newObject[key] = value;
      });
      return JSON.stringify(newObject);
    }
  });



  function newBookmarkSubmit(){
    //console.log('new bookmark executed');
    $('#new-item').on('submit', function(event){
      event.preventDefault();
      console.log('new item handler worked');
      const result = $(event.target).serializeJson();
      API.createBookmark(result, (newBookmark) => {
        //STORE.createItemInStore(newBookmark);
        render();
      });
      console.log(result);
    });
  }


  function bindEventListeners(){
    newBookmarkSubmit();
  }
  // $(newBookmarkSubmit);


  return {
    render,
    bindEventListeners
  };


} ());