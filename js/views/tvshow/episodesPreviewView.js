define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow/episodePreviewTemplate.html',
    'collections/episodes',
    'models/youtube'
], function($, _, Backbone, episodePreviewTemplate, Episodes, Youtube){
    var TrailerEpisodeView = Backbone.View.extend({
        template : _.template(episodePreviewTemplate),
        el : ".modalStuff",

        initialize: function(id){
            this.episodes = new Episodes({"seasonId" : id});
        },

        render: function(){
            var that = this;
            this.episodes.fetch({
                success: function(response){
                    that.$el.html(that.template({episodes: response.toJSON()}));
                }
            });
        }
    });
    return TrailerEpisodeView;
});