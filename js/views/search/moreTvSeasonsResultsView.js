define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/searchMainTemplate.html',
    'views/search/tvSeasonSearchView',
    'views/search/tvshowsGenresFilterView'
], function($, _, Backbone, SearchMainTemplate, TvSeasonSearchView,TvshowsFilterView){

    var SearchMainView = Backbone.View.extend({

        template : _.template(SearchMainTemplate),
        el: '.content',

        render: function (searchField) {
            this.$el.html(this.template());
            var optionsTvSeasons = {searchField : searchField, isGeneral : false, el : ".tv-season-result"};
            var optionsTvshowsGenres = {searchField : searchField, isGeneral : false, el : ".tv-season-result"};

            this.tvSeasonSearchView = new TvSeasonSearchView(optionsTvSeasons);
            this.tvshowsGenresFilterView = new TvshowsFilterView(optionsTvshowsGenres);

            this.$el.append(this.tvSeasonSearchView.render());
            this.$el.append(this.tvshowsGenresFilterView.render());

        }
    });

    return SearchMainView;
});