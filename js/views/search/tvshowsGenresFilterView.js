
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/tvshowsGenresFilterTemplate.html',
    'text!templates/search/tvSeasonResultTemplate.html',
    'collections/searchResult/tvshowsSeasonResult',
    'collections/tvshowsGenres'
], function($, _, Backbone, TvshowsGenresFilterTemplate, TvSeasonResultTemplate, TvshowsSeasonResult, TvshowsGenres){
    var TvshowsGenresFilterView = Backbone.View.extend({
        template : _.template(TvshowsGenresFilterTemplate),

        initialize: function(options){
            this.genres = new TvshowsGenres();
            this.TvshowsSeasonResult = new TvshowsSeasonResult(options);
            this.tvshowEl = options.el;
            this.setElement(".tvshows-genres-filter");

        },

        render: function(){
            var that = this;
            this.genres.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    that.$el.html(that.template({genres: response.toJSON()}));
                }
            });
        },

        events: {
            'click .tvshows-genre-chk': 'filterGenre'
        },

        filterGenre: function(e){
            var id = $(e.currentTarget)[0].id;
            if(e.currentTarget.checked){
                this.TvshowsSeasonResult.addGenre(id);
            } else{
                this.TvshowsSeasonResult.removeGenre(id);
            }
            console.log(this.TvshowsSeasonResult);
            var that = this;
            this.TvshowsSeasonResult.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    $(that.tvshowEl).html(_.template(TvSeasonResultTemplate)({tvSeasons: response.toJSON(), searchField : that.TvshowsSeasonResult.searchField, isGeneral : that.TvshowsSeasonResult.isGeneral}));
                }
            });
        }

    });
    return TvshowsGenresFilterView;

});