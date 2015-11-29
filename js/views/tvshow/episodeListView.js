define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow/episodeListTemplate.html'
], function($, _, Backbone, EpisodeListTemplate){
    var TrailerEpisodeView = Backbone.View.extend({
        template : _.template(EpisodeListTemplate),
        el: "#episode-search-list",

        render: function(episodes){
            this.$el.html(this.template({episodes: episodes}));
        }
    });
    return TrailerEpisodeView;
});