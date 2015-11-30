define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var Episode = Backbone.Model.extend({

        urlRoot: 'https://umovie.herokuapp.com/tvshows/season/id/episodes',

        parse: function(response){
            return response.results;
        }

    });
    return Episode;
});