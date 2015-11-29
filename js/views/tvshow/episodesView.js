define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow/SeasonEpisodeTemplate.html',
    'views/tvshow/episodeListView',
    'collections/episodes'
], function($, _, Backbone, SeasonEpisodeTemplate, EpisodeListView, Episodes){
    var EpisodesView = Backbone.View.extend({
        template : _.template(SeasonEpisodeTemplate),
        el: ".seasonX-episodes",

        initialize: function(id){
            this.season = new Episodes({"seasonId" : id});
        },

        render: function(){
            var that = this;
            this.season.fetch({
                success: function(response){
                    that.episodes = response.toJSON();
                    that.$el.html(that.template({episodes: response.toJSON()}));
                    var url = that.episodes[0].artworkUrl100.replace("100x100", "200x200");
                    $("#cover").css("background", "url("+ url +") no-repeat");
                    that.searchEpisode("");
                    $('#search-episode').keypress(function() {
                        var dInput = this.value;
                        that.searchEpisode(dInput);
                    });
                }
            });
        },
        searchEpisode:function(searchTerms){
            var view = new EpisodeListView();
            var episodeResult = [];
            if(searchTerms.trims != "") {
                this.episodes.forEach(function (episode) {
                    if (episode.trackName.toUpperCase().indexOf(searchTerms.toUpperCase()) > -1) {
                        episodeResult.push(episode);
                    }
                });
            }
            this.$el.append(view.render(episodeResult));

        }
    });
    return EpisodesView;
});