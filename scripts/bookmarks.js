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

  function generateError(err) {
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }

    return `
        <p>${message}</p>
    `;
  }

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
      <button type="button" id="delete">Delete Bookmark</button>
    </li>
    `;
  }

  function render (){
    if (STORE.error) {
      const el = generateError(STORE.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }// const bookmarkString = generateHTMLString(STORE.bookmarks);
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
  
  // function handleNewItemSubmit() {
  //   $('#js-shopping-list-form').submit(function (event) {
  //     event.preventDefault();
  //     const newItemName = $('.js-shopping-list-entry').val();
  //     $('.js-shopping-list-entry').val('');
  //     api.createItem(newItemName, 
  //       (newItem) => {
  //         store.addItem(newItem);
  //         render();
  //       },
  //       (err) => {
  //         console.log(err);
  //         store.setError(err);
  //         render();
  //       }
  //     );
  //   });
  // }


  function newBookmarkSubmit(){
    //console.log('new bookmark executed');
    $('#new-item').on('submit', function(event){
      event.preventDefault();
      // console.log('new item handler worked');
      const result = $(event.target).serializeJson();
      API.createBookmark(result, (newBookmark) => {
        STORE.addBookmark(newBookmark);
        render();
      }, 
      (err) => {
        console.log(err);
        STORE.setError(err);
        render();
      }
      );
      console.log(result);
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.bookmark-item-element')
      .data('item-id');
  }

  function deleteBookmark(){
    $('ul').on('click', '#delete', function(event){
      console.log('delete handler worked');
      const id = getItemIdFromElement(event.currentTarget);
      API.deleteBookmark(id, function (){
        STORE.deleteBookmark(id);
        render();
      });
    });
  }


  function bindEventListeners(){
    newBookmarkSubmit();
    deleteBookmark();
  }
  // $(newBookmarkSubmit);


  return {
    render,
    bindEventListeners
  };


} ());