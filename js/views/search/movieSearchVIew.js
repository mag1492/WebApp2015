define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/moviesResultTemplate.html',
    '../../collections/searchResult/moviesResult'
], function($, _, Backbone, MoviesResultTemplate, MovieResult){
    var MovieSearchView = Backbone.View.extend({
        template : _.template(MoviesResultTemplate),
        el: ".movie-result",

        initialize: function(searchField){
            this.movies = new MovieResult({"searchField" : searchField});

        },

        render: function(){
            var that = this;
            this.movies.fetch({
                success: function(response){
                    that.$el.html(that.template({movies: response.toJSON()}));
                }
            });
        }
    });
    return MovieSearchView;
});