define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var Movie = Backbone.Model.extend({
        initialize: function (options) {
            options || (options = {});
            if (options.trackId) {
                this.trackId = options.trackId;
                this.url = 'https://umovie.herokuapp.com/unsecure/movies/' + options.trackId;
            }
        },

        parse: function (response) {
            return response.results;
        }
    });
    return Movie;
});
