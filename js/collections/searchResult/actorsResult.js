define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var ActorsResult = Backbone.Collection.extend({
        initialize: function(options){
                this.searchField = options.searchField;

                this.url = 'https://umovie.herokuapp.com/unsecure/search/actors?q=' + options.searchField;
        },
        parse: function(response) {
            return response.results;
        }
    });
    return ActorsResult;
});