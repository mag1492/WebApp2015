define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/watchlist/watchlistMovieTemplate.html',
    'text!templates/watchlist/watchlistEmptyTemplate.html',
    'models/watchlistMovie',
    'models/tokenInfo',
    'models/watchlistDeleteMovie',
    '../errorHandler'
], function($, _, Backbone, swal, WatchlistMovieTemplate, WatchlistEmptyTemplate, WatchlistMovie, TokenInfo, WatchlistDeleteMovie){
    var WatchlistMainView = Backbone.View.extend({

        template : _.template(WatchlistMovieTemplate),
        templateEmpty : _.template(WatchlistEmptyTemplate),
        el: '.content',

        initialize: function(){
            this.watchlistMovie = new WatchlistMovie({"watchlistId" : this.options.id});
            this.tokenInfo = new TokenInfo();
        },

        render: function(){
            var that = this;
            this.watchlistMovie.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    var watchlist = response.toJSON();
                    if(watchlist.movies.length < 1) {
                        that.$el.html(that.templateEmpty({watchlistMovie: watchlist}));
                    } else {
                        that.tokenInfo.fetch({
                            beforeSend: function(xhr) {
                                xhr.setRequestHeader('Authorization', $.cookie('token'));
                            },
                            success: function(response) {
                                watchlist.isMine = true;
                                if(watchlist.owner.id != response.toJSON().id){
                                    watchlist.isMine = false;
                                }

                                that.$el.html(that.template({watchlistMovie: watchlist}));
                            },
                            error: function(ret, jqXHR){
                                showError(jqXHR.status);
                            }
                        });
                    }
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            })
        },
        deleteMovie: function(watchlistId, movieId){
            var movie = new WatchlistDeleteMovie({movieId : movieId, watchlistId:watchlistId});
            movie.destroy({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success:function(ret){
                    window.location.replace('#/watchlist');
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            })
        }
    });

    return WatchlistMainView;
});