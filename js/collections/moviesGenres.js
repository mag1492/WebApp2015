define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var MoviesGenres = Backbone.Collection.extend({

        initialize: function(){
            this.url = 'https://umovie.herokuapp.com/genres/movies';
        }

    });
    return MoviesGenres;
});
