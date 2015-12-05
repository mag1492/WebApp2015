define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/search/tvSeasonResultTemplate.html',
    'collections/searchResult/tvshowsSeasonResult',
    '../errorHandler'
], function($, _, Backbone, swal, TvSeasonResultTemplate, TvshowsSeasonResult){
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
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        }
    });
    return TvSeasonSearchView;
});