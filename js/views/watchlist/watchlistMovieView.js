define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/watchlist/watchlistMovieTemplate.html',
    'models/watchlistMovie',
    'models/watchlistDeleteMovie'
], function($, _, Backbone, WatchlistMovieTemplate, WatchlistMovie, WatchlistDeleteMovie){
    var WatchlistMainView = Backbone.View.extend({

        template : _.template(WatchlistMovieTemplate),
        el: '.content',

        initialize: function(){
            this.watchlistMovie = new WatchlistMovie({"watchlistId" : this.options.id});
        },

        render: function(){
            var that = this;
            this.watchlistMovie.fetch({
                success: function(response){
                    that.$el.html(that.template({watchlistMovie: response.toJSON()}));
                }
            })
        },
        deleteMovie: function(watchlistId, movieId){
            var movie = new WatchlistDeleteMovie({movieId : movieId, watchlistId:watchlistId});
            movie.destroy({
                success:function(ret){
                    window.location.replace('#/watchlist');
                }
            })




        }


    });

    return WatchlistMainView;
});