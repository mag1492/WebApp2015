define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var MoviesResult = Backbone.Collection.extend({
        initialize: function(searchField){
                this.searchField = searchField;
                this.url = 'https://umovie.herokuapp.com/unsecure/search/movies?q=' + searchField.searchField;
        },
        parse: function(response) {
            return response.results;
        }
    });
    return MoviesResult;
});