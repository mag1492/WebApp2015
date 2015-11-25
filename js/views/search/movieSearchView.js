define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/moviesResultTemplate.html',
    '../../collections/searchResult/moviesResult',
    'views/movie/movieWatchlistButtonView'
], function($, _, Backbone, MoviesResultTemplate, MovieResult, MovieWatchlistButtonView){
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
                    that.watchlistButton = [];
                    var index = 0;
                    response.toJSON().forEach(function(movie){
                        that.watchlistButton.push(new MovieWatchlistButtonView(movie.trackId));
                        that.$el.append(that.watchlistButton[index].render());
                        index++;
                    });
                }
            });

        }
    });
    return MovieSearchView;
});