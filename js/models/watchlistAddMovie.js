define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var WatchlistAddMovie = Backbone.Model.extend({
        initialize: function (options) {
            options || (options = {});
            if (options.trackId) {
                this.trackId = options.trackId;
                this.url = 'https://umovie.herokuapp.com/unsecure/watchlists/' + options.watchlistId + '/movies/';
            }
        },

        parse: function (response) {
            return response.results;
        }
    });
    return WatchlistAddMovie;
});
