define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var WatchlistAddMovie = Backbone.Model.extend({
        initialize: function (options) {
            options || (options = {});

                this.url = 'https://umovie.herokuapp.com/unsecure/watchlists/' + options.watchlistId + '/movies/';

        }
    });
    return WatchlistAddMovie;
});
