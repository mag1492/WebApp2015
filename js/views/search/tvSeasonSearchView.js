define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/tvSeasonResultTemplate.html',
    '../../collections/searchResult/tvshowsSeasonResult'
], function($, _, Backbone, TvSeasonResultTemplate, TvshowsSeasonResult){
    var TvSeasonSearchView = Backbone.View.extend({
        template : _.template(TvSeasonResultTemplate),
        el: ".tv-season-result",

        initialize: function(searchField){
            this.tvSeasons = new TvshowsSeasonResult({"searchField" : searchField});

        },

        render: function(){
            var that = this;
            this.tvSeasons.fetch({
                success: function(response){
                    that.$el.html(that.template({tvSeasons: response.toJSON()}));
                }
            });
        }
    });
    return TvSeasonSearchView;
});