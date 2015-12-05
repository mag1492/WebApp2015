define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/tvshow/seasonEpisodeTrailerTemplate.html',
    'collections/episodes',
    'models/youtube',
    '../errorHandler'
], function($, _, Backbone, swal, SeasonEpisodeTrailerTemplate, Episodes, Youtube){
    var TrailerEpisodeView = Backbone.View.extend({
        template : _.template(SeasonEpisodeTrailerTemplate),
        el: ".season-info-trailer",

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
                    var episodes = response.toJSON();
                    this.youtube = new Youtube({"movieTitle": episodes[0].artistName});
                    this.youtube.fetch({
                        success: function(response){
                            var episode = response.toJSON();
                            that.$el.html(that.template({youtube: "http://www.youtube.com/watch_popup?v=" + episode.items[0].id.videoId}));
                        }
                    });
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        }
    });
    return TrailerEpisodeView;
});