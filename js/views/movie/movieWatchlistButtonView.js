/**
 * Created by Gabriel on 2015-11-05.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieWatchlistButtonTemplate.html',
    'models/watchlist',
    'models/watchlistAddMovie',
    'models/movie'
], function($, _, Backbone, MovieWatchlistButtonTemplate, Watchlist, WatchlistAddMovie, Movie){
    var MovieWatchlistButtonView = Backbone.View.extend({
        template : _.template(MovieWatchlistButtonTemplate),
        el: ".watchlist-button",

        initialize: function(id){
            this.watchlist = new Watchlist({});
            this.movieId = id;
        },

        render: function(){
            var that = this;
            this.watchlist.fetch({
                success: function(response){

                    var retour = {"movieId" : that.movieId, "response" : response.toJSON()};
                    console.log(retour);
                    that.$el.html(that.template({watchlists: retour}));
                }
            });

        },
        addMovie: function(watchlistId, movieId){
            var movie = new Movie({trackId : movieId});
            movie.fetch({
                success:function(response){
                    var watchlist = new WatchlistAddMovie({watchlistId:watchlistId, movies:[response.toJSON()[0]]});
                    console.log(watchlist);
                    watchlist.save({
                        success:function(ret){
                            console.log("save");
                        }
                    })
                }
            });


        }
    });
    return MovieWatchlistButtonView;
});