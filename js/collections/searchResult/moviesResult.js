define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var MoviesResult = Backbone.Collection.extend({
        initialize: function(options){
            options || (options= {});
            if(options.searchField){
                this.searchField = options.searchField;
                this.url = 'https://umovie.herokuapp.com/unsecure/search/movies?q=' + options.searchField.searchField;
            }
        }
    });
    return MoviesResult;
});