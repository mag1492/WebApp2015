/**
 * Created by Gabriel on 2015-11-05.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieWatchlistButtonTemplate.html',
    'models/watchlist',
    'models/watchlistMovie',
    'models/movie'
], function($, _, Backbone, MovieWatchlistButtonTemplate, Watchlist, WatchlistMovie, Movie){
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
            var movieToAdd = new Movie({trackId : movieId});
            var watchlistToModify;
            movieToAdd.fetch({
                success: function(response){
                    var movies = [];
                    movies.push(movieToAdd);
                    watchlistToModify = new Watchlist({watchlistId : watchlistId, movies:movies});
                    console.log(watchlistToModify);
                    watchlistToModify.save({
                        success:function(ret){
                            console.log("sdfs");
                            router.navigate('movie/'+movieId, {trigger: true});
                        }
                    });


                }

            });

        }
    });
    return MovieWatchlistButtonView;
});