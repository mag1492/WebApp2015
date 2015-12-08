define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var AutocompleteCollection = Backbone.Collection.extend({
        initialize: function(text){
                this.url = 'https://itunes.apple.com/search?term=' + text +'&limit=5';
        },
        parse: function(response) {
            return response.results;
        }
    });
    return AutocompleteCollection;
});