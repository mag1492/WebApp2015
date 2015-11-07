define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var YoutubeMovie = Backbone.Model.extend({

        initialize: function (options) {
            var that = this;
            if (options.movieTitle) {
                that.movieTitle = options.movieTitle;
                this.url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=trailer'+that.movieTitle+'&key=AIzaSyBTleoO45vwz_sL9Uq8elszsYpailZJZaw';
            }
        }
    });

    return YoutubeMovie;
});