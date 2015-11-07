define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var YoutubeMovie = Backbone.Model.extend({

        url : 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=saw&key=AIzaSyBTleoO45vwz_sL9Uq8elszsYpailZJZaw',

        initialize: function (options) {
            var that = this;
            if (options.movieTitle) {
                that.movieTitle = options.movieTitle;
                this.url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+that.movieTitle+'&key={AIzaSyBTleoO45vwz_sL9Uq8elszsYpailZJZaw}';
            }
        }
    });

    return YoutubeMovie;
});