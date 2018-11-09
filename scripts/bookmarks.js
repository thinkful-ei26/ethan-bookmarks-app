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
    // console.log(stringifiedBookmarks);
    return stringifiedBookmarks.join('');
  }

  function generateItemElement (object){
    console.log(object);
    if (object.expanded && object.rating){
      return `
      <li class='bookmark-item-element' data-item-id='${object.id}'>
        <div>${object.title}</div>
        <div>Rating: ${object.rating}</div>
        <div><a href="${object.url}">Visit Site</a></div>
        <div>${object.desc}</div>
        <button type="button" id="delete">Delete Bookmark</button>
      </li>
      `;
    } else if(object.expanded && !object.rating){
      return `
      <li class='bookmark-item-element' data-item-id='${object.id}'>
        <div>${object.title}</div>
        <div>No rating yet :(</div>
        <div><a href="${object.url}">Visit Site</a></div>
        <div>${object.desc}</div>
        <button type="button" id="delete">Delete Bookmark</button>
      </li>
      `;
    } else if (object.rating) {
      return ` 
        <li class='bookmark-item-element' data-item-id='${object.id}'>
          <div>${object.title}</div>
          <div>Rating: ${object.rating}</div>
        </li>`;
    } else {
      return ` 
        <li class='bookmark-item-element' data-item-id='${object.id}'>
          <div>${object.title}</div>
          <div>No rating yet :(</div>
        </li>`;
    }
  } 

  function render (){
    if (STORE.error) {
      const errorText = generateError(STORE.error);
      $('.error-container').html(errorText);
    } else {
      $('.error-container').empty();
    }// const bookmarkString = generateHTMLString(STORE.bookmarks);
    if (STORE.addItem){
      $('.new-item-form-container').html(renderNewBookmarkForm);
    } else {
      $('.new-item-form-container').html('');
    }
    if (STORE.minimumRating){
      const filteredMinBookmarks = STORE.bookmarks.filter(bookmark => bookmark.rating >= STORE.minimumRating);
      $('ul').html(generateHTMLString(filteredMinBookmarks));
    } else{
      $('ul').html(generateHTMLString(STORE.bookmarks));
    }
  }

  function renderNewBookmarkForm(){
    return `
    <form id="new-item" name="new-item" for="">
    <label for="title">Title</label> 
      <input type="text" name="title" id="title" placeholder="Deadspin"><br>
    <label for="url">URL</label> 
      <input type="text" name="url" id="url" placeholder="deadspin.com"><br>
    <label for="description">Description</label>
      <input type="text" name="desc" id="description" placeholder="A simple description"><br>
    <label for="rating">Rating</label><br>
    <!-- tab index for the radio buttons so users can tab through -->
      <input type="radio" name="rating" id="rating-5" value="5"> 5 <br>
      <input type="radio" name="rating" id="rating-4" value="4"> 4 <br>
      <input type="radio" name="rating" id="rating-3" value="3"> 3 <br>
      <input type="radio" name="rating" id="rating-2" value="2"> 2 <br>
      <input type="radio" name="rating" id="rating-1" value="1"> 1 <br>
    <input type="submit" id="new-item" value="Submit">
  </form>
    `;
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


  function newBookmarkForm(){
    $('#add-bookmark').on('click', function(){
      STORE.addItem = true;
      console.log(STORE.addItem);
      render();
    });
  }


  function newBookmarkSubmit(){
    //console.log('new bookmark executed');
    $('.new-item-form-container').on('submit', '#new-item', function(event){
      event.preventDefault();
      // console.log('new item handler worked');
      const result = $(event.target).serializeJson();
      API.createBookmark(result, (newBookmark) => {
        STORE.addBookmark(newBookmark);
        STORE.addItem = false;
        console.log(STORE.addItem);
        render();
      }, 
      (err) => {
        console.log(err);
        STORE.setError(err);
        render();
      }
      );
      // console.log(result);
    });
  }

  function minimumRatingSubmit(){
    $('#minimum-rating-submit').on('submit', function(event){
      // console.log('rating listener fired');
      event.preventDefault();
      const selectedRating = parseInt($(event.currentTarget).find('#minimum-value').val());
      // console.log(typeof selectedRating);
      STORE.minimumRating = selectedRating;
      render();
    });
  }

  function minimumRatingClear(){
    $('#clear-minimum-value').click(function(){
      // console.log('clear rating listener fired');
      STORE.minimumRating = null;
      render();
    });
  }

  function expandBookmarkOnClick (){
    $('ul').on('click', 'li', function (event){
      // console.log('listener fired');
      const id = getItemIdFromElement(event.currentTarget);
      // console.log(id);
      console.log(STORE.findItemByID(id));
      STORE.findItemByID(id).expanded = !STORE.findItemByID(id).expanded;
      // console.log(STORE.findItemByID(id));
      render();
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
    newBookmarkForm();
    newBookmarkSubmit();
    deleteBookmark();
    minimumRatingSubmit();
    minimumRatingClear();
    expandBookmarkOnClick();
  }
  // $(newBookmarkSubmit);


  return {
    render,
    bindEventListeners
  };


} ());