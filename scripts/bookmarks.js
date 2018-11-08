'use strict';
/*eslint-env jquery*/
/* global store, API $ */

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