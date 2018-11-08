'use strict';
/*eslint-env jquery*/

const STORE = {
  bookmarks:[
    {
      name: 'title',
      url: 'url',
      rating: 1,
      description: 'description',
      expanded: false
    },
    {
      name: 'title',
      url: 'url',
      rating: 1,
      description: 'description',
      expanded: false
    },
    {
      'id': '8sdfbvbs65sd',
      'title': 'Google',
      'url': 'http://google.com',
      'desc': 'An indie search engine startup',
      'rating': 4
    },
    {
      'id': '87fn36vd9djd',
      'title': 'Fluffiest Cats in the World',
      'url': 'http://medium.com/bloggerx/fluffiest-cats-334',
      'desc': 'The only list of fluffy cats online',
      'rating': 5
    }
  ],
  addItem: false,
  errorReturn: false,
  filteredByRating: null,
};