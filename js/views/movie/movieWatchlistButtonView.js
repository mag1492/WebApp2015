define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/movie/movieWatchlistButtonTemplate.html',
    'models/watchlist',
    'models/watchlistAddMovie',
    'models/movie',
    'models/tokenInfo'
], function($, _, Backbone, swal, MovieWatchlistButtonTemplate, Watchlist, WatchlistAddMovie, Movie, TokenInfo){
    var MovieWatchlistButtonView = Backbone.View.extend({
        template : _.template(MovieWatchlistButtonTemplate),

        initialize: function(id){
            this.watchlist = new Watchlist({});
            this.movieId = id;
            this.tokenInfo = new TokenInfo();
            this.$el = $(".watchlist-button" + id);
        },

        render: function(){
            var that = this;
            this.watchlist.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    var watchlists = response.toJSON();
                    that.tokenInfo.fetch({
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Authorization', $.cookie('token'));
                        },
                        success: function(response){
                            var loggedUser = response.toJSON();
                            var loggedUserWatchlists = [];
                            for (var prop in watchlists) {
                                if (watchlists.hasOwnProperty(prop)) {
                                    if(typeof(watchlists[prop].owner) != 'undefined'){
                                        if(loggedUser.id == watchlists[prop].owner.id){
                                            loggedUserWatchlists.push(watchlists[prop]);
                                        }
                                    }
                                }
                            }
                            var retour = {"movieId" : that.movieId, "response" : loggedUserWatchlists};
                            that.$el.html(that.template({watchlists: retour}));
                            $('#myModal'+that.movieId).appendTo("body");
                        }
                    });
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        },

        addMovie: function(watchlistId, movieId){
            var movie = new Movie({trackId : movieId});

            movie.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success:function(response){
                    var watchlist = new WatchlistAddMovie({watchlistId:watchlistId});
                    watchlist.save(movie.attributes[0], {
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Authorization', $.cookie('token'));
                        },
                        success:function(ret){
                            $('#myModal'+movieId).modal('toggle');
                            window.location.replace('#/watchlist/'+watchlistId);
                        }
                    })
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        }
    });
    return MovieWatchlistButtonView;
});
