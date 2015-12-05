define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/tvSeasonResultTemplate.html',
    'collections/searchResult/tvshowsSeasonResult'
], function($, _, Backbone, TvSeasonResultTemplate, TvshowsSeasonResult){
    var TvSeasonSearchView = Backbone.View.extend({
        template : _.template(TvSeasonResultTemplate),

        initialize: function(options){
            this.tvSeasons = new TvshowsSeasonResult( options);
            if(options.isGeneral == true){
                this.setElement(options.el);
            }else{
                this.setElement(".content");
            }

        },

        render: function(){
            var that = this;
            this.tvSeasons.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    that.$el.html(that.template({tvSeasons: response.toJSON(), searchField : that.tvSeasons.searchField, isGeneral : that.tvSeasons.isGeneral}));

                }
            });
        }
    });
    return TvSeasonSearchView;
});