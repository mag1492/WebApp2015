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
            console.log("avant fetch");
            console.log(movie);
            movie.fetch({
                success:function(response){
                    console.log("pendant fetch");
                    console.log(movie);
                    var watchlist = new WatchlistAddMovie({watchlistId:watchlistId});
                    watchlist.save(movie.attributes[0], {
                        success:function(ret){

                            console.log("apres fetch : ");
                            console.log(movie);
                        }
                    })
                }
            });


        }
    });
    return MovieWatchlistButtonView;
});