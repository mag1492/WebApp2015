define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var TvShowsGenres = Backbone.Collection.extend({

        initialize: function(){
            this.url = 'https://umovie.herokuapp.com/genres/tvshows';
        },

    });
    return TvShowsGenres;
});