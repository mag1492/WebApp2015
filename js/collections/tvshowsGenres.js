define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var TvShowsGenres = Backbone.Collection.extend({

        initialize: function(){
            this.url = 'https://umovie.herokuapp.com/genres/tvshows';
        },

        parse: function(response){
            return response.results;
        }

    });
    return TvShowsGenres;
});