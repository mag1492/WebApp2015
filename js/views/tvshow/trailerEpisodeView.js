define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow/seasonEpisodeTrailerTemplate.html',
    'collections/episodes'
], function($, _, Backbone, SeasonEpisodeTrailerTemplate, Episodes){
    var TrailerEpisodeView = Backbone.View.extend({
        template : _.template(SeasonEpisodeTrailerTemplate),
        el: ".season-info-trailer",

        initialize: function(id){
            this.episodes = new Episodes({"seasonId" : id});
        },

        render: function(){
            var that = this;
            this.episodes.fetch({
                success: function(response){
                    var episodes = response.toJSON();
                    that.$el.html(that.template({episodes: response.toJSON()}));
                }
            });
        }
    });
    return TrailerEpisodeView;
});