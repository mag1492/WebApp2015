/**
 * Created by Gabriel on 2015-11-06.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var WatchlistDeleteMovie = Backbone.Model.extend({
        initialize: function (options) {
            options || (options = {});
            this.id = options.movieId;
            this.url = 'https://umovie.herokuapp.com/unsecure/watchlists/' + options.watchlistId + '/movies/' + options.movieId;

        }
    });
    return WatchlistDeleteMovie;
});
