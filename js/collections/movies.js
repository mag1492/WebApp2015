define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var Movies = Backbone.Collection.extend({
        initialize: function(options){
            options || (options= {});
            if(options.actorId){
                this.actorId = options.actorId;
                this.url = 'https://umovie.herokuapp.com/unsecure/actors/'+ options.actorId +'/movies';
            }
        },

        parse: function(response) {
            response.results.forEach(function (movie){
                var date = new Date(Date.parse(movie.releaseDate));
                movie.releaseDate = date.toLocaleDateString();
            });
            return response.results;
        }
    });
    return Movies;
});