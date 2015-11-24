define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/moviesResultTemplate.html',
    '../../collections/searchResult/moviesResult',
    'models/youtube'
], function($, _, Backbone, MoviesResultTemplate, MoviesResult, Youtube){
    var MovieSearchView = Backbone.View.extend({
        template : _.template(MoviesResultTemplate),
        el: ".movie-result",

        initialize: function(searchField){
            this.movies = new MoviesResult({"searchField" : searchField});

        },

        render: function(){
            var that = this;
            this.movies.fetch({
                success: function(response){
                    //that.$el.html(that.template({movies: response.toJSON()}));
                    that.movies = response.toJSON();
                    var trailers = [];
                    that.movies.forEach(function(movie) {
                        var trailer = new Youtube({"movieTitle": movie.trackName});
                        trailer.fetch({
                            success: function(response){
                                movie.trailer = "http://www.youtube.com/watch_popup?v=" + response.toJSON().items[0].id.videoId;
                                that.$el.append(that.template({movie: movie}));
                            }
                        });
                    });
                }
            });
        }
    });
    return MovieSearchView;
});