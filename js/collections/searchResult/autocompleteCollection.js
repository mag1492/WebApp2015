define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var AutocompleteCollection = Backbone.Collection.extend({
        initialize: function(text){
                this.url = 'https://itunes.apple.com/search?term=' + text;
        },
        parse: function(response) {
            return response.results;
        }
    });
    return AutocompleteCollection;
});

var itunes = function(response){
    awesomplete.list = response;
};