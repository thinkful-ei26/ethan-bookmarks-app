'use strict';
/*eslint-env jquery*/
/* global STORE, API $ */

const Bookmark = (function (){

  function generateHTMLString (bookmarks){
    return STORE.bookmarks.map(bookmark => generateItemElement(bookmark)).join('');
  }

  function generateItemElement (newObject){
    return `
    <ul class="bookmark-item">
    <li class='bookmark-item-element' data-item-id='${newObject.id}'>
      <div>${newObject.name}</div>
      <div>${newObject.rating}</div>
      <div>${newObject.url}</div>
      <div>${newObject.description}</div>
    </li>
    `;
  }

  function render (){
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
    $('#new-item').on('submit', function(event){
      event.preventDefault();
      console.log('new item handler worked');
      const result = $(event.target).serializeJson();
      API.createBookmark(result, (newBookmark) => {
        store.createItemInStore(newBookmark);
        render();
      });
      console.log(result);
    });
  }

  $(newBookmarkSubmit);


  return {
    render
  };


} ());