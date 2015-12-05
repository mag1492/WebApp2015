define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var MoviesGenres = Backbone.Collection.extend({

        urlRoot: 'https://umovie.herokuapp.com/genres/movies',

        parse: function(response){
            return response.results;
        }

    });
    return MoviesGenres;
});
