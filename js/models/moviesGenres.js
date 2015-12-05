define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var MoviesGenres = Backbone.Model.extend({

        urlRoot: 'https://umovie.herokuapp.com/genres/movies',

        parse: function(response){
            return response.results;
        }

    });
    return MoviesGenres;
});
