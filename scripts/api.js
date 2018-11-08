'use strict';
/*eslint-env jquery*/
/* global store, API $ */

const API = (function (){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/ethan/bookmarks/';

  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}`, callback);
    console.log('getBookmarks call made');
  };

  const createBookmark = function(newItemObject, callback) {
    // const newItem = JSON.stringify(newItemObject);
    console.log(newItemObject);
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      contentType: 'application/json',
      data: newItemObject,
      success: callback,
      error: error => console.error(error.responseJSON.method)
    });
  };

  const deleteBookmark = function(id, callback){
    console.log('delete API fired');
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback
    });
  };

  return{
    getBookmarks,
    createBookmark,
    deleteBookmark
  };
}());