/**
 * Created by Gabriel on 2015-11-05.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var WatchlistAddMovie = Backbone.Model.extend({

        initialize: function (options) {
            if (options.watchlistId) {
                this.watchlistId = options.watchlistId;
                this.url = 'http://umovie.herokuapp.com/unsecure/watchlists/' + options.watchlistId + '/movies/';
                this.movies = options.movies;
            }
        }
    });

    return WatchlistAddMovie;
});
