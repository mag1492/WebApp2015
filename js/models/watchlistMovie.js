define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var WatchlistMovie = Backbone.Model.extend({
        url : 'http://umovie.herokuapp.com/unsecure/watchlists/563925ff634eb80300b1f151',

        initialize: function (options) {
            if (options.watchlistId) {
                this.watchlistId = options.watchlistId;
                this.url = 'http://umovie.herokuapp.com/unsecure/watchlists/' + options.watchlistId;
            }
        }
    });

    return WatchlistMovie;
});
