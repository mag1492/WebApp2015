define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var ActorItunes = Backbone.Collection.extend({
        initialize: function(text){
            this.url = 'https://itunes.apple.com/search?term=' + text +'&entity=movieArtist&limit=3';
        },
        parse: function(response) {
            return response.results;
        }
    });
    return ActorItunes;
});
