define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow/SeasonEpisodeTemplate.html',
    'collections/episodes'
], function($, _, Backbone, SeasonEpisodeTemplate, Episodes){
    var EpisodesView = Backbone.View.extend({
        template : _.template(SeasonEpisodeTemplate),
        el: ".seasonX-episodes",

        initialize: function(id){
          this.episodes = new Episodes({"seasonId" : id});
        },

        render: function(){
            var that = this;
            this.episodes.fetch({
                success: function(response){
                    that.$el.html(that.template({episodes: response.toJSON()}));
                    $("#cover").css("background", "url("+ response.toJSON()[0].artworkUrl100 +") ");
                }
            });
        }
    });
    return EpisodesView;
});