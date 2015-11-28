define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var YoutubeEpisode = Backbone.Model.extend({

        initialize: function (options) {
            var that = this;
            if (options.searchEpisode) {
                that.searchEpisode = options.searchEpisode;
                this.url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+that.searchEpisode+ 'preview&key=AIzaSyBTleoO45vwz_sL9Uq8elszsYpailZJZaw';
            }
        }
    });

    return YoutubeEpisode;
});