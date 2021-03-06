define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/tvshow/episodePreviewTemplate.html',
    'collections/episodes',
    'models/youtubeEpisode',
    '../errorHandler'
], function($, _, Backbone, swal, episodePreviewTemplate, Episodes, YoutubeEpisode){
    var TrailerEpisodeView = Backbone.View.extend({
        template : _.template(episodePreviewTemplate),
        el : ".modalEpisode",

        initialize: function(id){
            this.episodes = new Episodes({"seasonId" : id});
        },

        render: function(){
            var that = this;
            this.episodes.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    this.episodesList = response.toJSON();
                    that.$el.html(that.template({episodes: response.toJSON()}));

                    this.episodesList.forEach(function(episode){
                        var url = episode.artworkUrl100.replace("100x100", "120x120");
                        $("#myModal" + episode.trackNumber).find("#cover-episode").css("background", "url("+ url +") center center no-repeat");

                        var searchSeasonAndEpisodeNumber = "episode " + episode.trackNumber + " " +
                                                           episode.collectionName;

                        this.link = "";
                        var that = this;
                        this.youtubeLink = new YoutubeEpisode({"searchEpisode": searchSeasonAndEpisodeNumber});
                        this.youtubeLink.fetch({
                            success: function(response){
                                var youtubeLink = response.toJSON();
                                that.link = "http://www.youtube.com/watch_popup?v=" + youtubeLink.items[0].id.videoId;
                                $('#myModal'+episode.trackNumber).find(".episode-preview-button").attr("onclick", "document.location.href='" + that.link + "'");
                            }
                        });
                    })
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        }
    });

    return TrailerEpisodeView;
});