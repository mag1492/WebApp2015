/**
 * Created by Gabriel on 11/19/2015.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/tvEpisodesResultTemplate.html',
    '../../collections/searchResult/tvshowsEpisodeResult'
], function($, _, Backbone, TvEpisodesResultTemplate, TvshowsEpisodeResult){
    var TvEpisodeSearchView = Backbone.View.extend({
        template : _.template(TvEpisodesResultTemplate),
        el: ".tv-episode-result",

        initialize: function(searchField){
            this.tvEpisodes = new TvshowsEpisodeResult({"searchField" : searchField});

        },

        render: function(){
            var that = this;

            this.tvEpisodes.fetch({
                success: function(response){
                    that.$el.html(that.template({tvEpisodes: response.toJSON()}));
                }
            });

        }
    });
    return TvEpisodeSearchView;
});