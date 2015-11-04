define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/watchlist/watchlistMovieTemplate.html',
    'models/watchlistMovie'
], function($, _, Backbone, WatchlistMovieTemplate, WatchlistMovie){
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
        }
    });

    return WatchlistMainView;
});