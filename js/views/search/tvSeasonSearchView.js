/**
 * Created by Gabriel on 11/19/2015.
 */
define([
    '../../libs/jquery/jquery-min',
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
            console.log('render season view debut');


            this.tvSeasons.fetch({
                success: function(response){
                    that.$el.html(that.template({tvSeason: response.toJSON()}));
                    console.log('render season view fin');


                }
            });

        }
    });
    return TvSeasonSearchView;
});