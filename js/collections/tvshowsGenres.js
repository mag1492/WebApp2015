define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var TvShowsGenres = Backbone.Collection.extend({

        urlRoot: 'https://umovie.herokuapp.com/genres/tvshows',

        parse: function(response){
            return response.results;
        }

    });
    return TvShowsGenres;
});