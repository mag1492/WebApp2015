/**
 * Created by Gabriel on 11/19/2015.
 */
define([
    '../../libs/jquery/jquery-min',
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
            console.log('render episode view debut');

            this.tvEpisodes.fetch({
                async:false,
                success: function(response){
                    that.$el.html(that.template({tvEpisodes: response.toJSON()}));
                    console.log('render episode view fin');

                }
            });

        }
    });
    return TvEpisodeSearchView;
});