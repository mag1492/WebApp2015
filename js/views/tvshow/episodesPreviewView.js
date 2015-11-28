define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow/episodePreviewTemplate.html',
    'collections/episodes',
    'models/youtubeEpisode'
], function($, _, Backbone, episodePreviewTemplate, Episodes, YoutubeEpisode){
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
                    this.episodesList = response.toJSON();
                    that.$el.html(that.template({episodes: response.toJSON()}));

                    this.episodesList.forEach(function(episode){
                        var searchSeasonAndEpisodeNumber = "episode " + episode.trackNumber + " " +
                                                           episode.collectionName;

                        this.link = "";
                        var that = this;
                        this.youtubeLink = new YoutubeEpisode({"searchEpisode": searchSeasonAndEpisodeNumber});
                        this.youtubeLink.fetch({
                            success: function(response){
                                var youtubeLink = response.toJSON();
                                that.link = "http://www.youtube.com/watch_popup?v=" + youtubeLink.items[0].id.videoId;
                                $('#myModal'+episode.trackNumber).find(".episodePreviewButton").attr("onclick", "document.location.href='" + that.link + "'");
                            }
                        });
                    })
                }
            });
        }
    });

    return TrailerEpisodeView;
});