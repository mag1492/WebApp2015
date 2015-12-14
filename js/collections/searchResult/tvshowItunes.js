define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var ActorItunes = Backbone.Collection.extend({
        initialize: function(text){
            this.url = 'https://itunes.apple.com/search?term=' + text +'&media=tvShow&limit=10';
        },
        parse: function(response) {
            return response.results;
        }
    });
    return ActorItunes;
});
