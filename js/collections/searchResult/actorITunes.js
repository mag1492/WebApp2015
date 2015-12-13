define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var ActorITunes = Backbone.Collection.extend({
        initialize: function(text){
            this.url = 'https://itunes.apple.com/search?term=' + text +'&attribute=actorTerm&limit=5';
        },
        parse: function(response) {
            return response.results;
        }
    });
    return ActorITunes;
});