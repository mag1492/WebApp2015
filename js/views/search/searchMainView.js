define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/searchMainTemplate.html',
    'views/search/actorSearchView',
    'views/search/movieSearchView',
    'views/search/userSearchView',
    'views/search/tvSeasonSearchView',
    'views/search/genresFilterView'
], function($, _, Backbone, SearchMainTemplate, ActorSearchView, MovieSearchView, UserSearchView, TvSeasonSearchView, GenresFilterView){

    var SearchMainView = Backbone.View.extend({

        template : _.template(SearchMainTemplate),
        el: '.content',

        render: function (searchField) {
            this.$el.html(this.template());
            var optionsActor = {searchField : searchField, isGeneral : true, el : ".actor-result"};
            var optionsUser = {searchField : searchField, isGeneral : true, el : ".user-result"};
            var optionsMovies = {searchField : searchField, isGeneral : true, el : ".movie-result"};
            var optionsTv = {searchField : searchField, isGeneral : true, el : ".tv-season-result"};
            this.actorSearchView = new ActorSearchView(optionsActor);
            this.movieSearchView = new MovieSearchView(optionsMovies);
            this.userSearchView = new UserSearchView(optionsUser);
            this.tvSeasonSearchView = new TvSeasonSearchView(optionsTv);
            this.genresFilterView = new GenresFilterView();

            this.$el.append(this.actorSearchView.render());
            this.$el.append(this.movieSearchView.render());
            this.$el.append(this.userSearchView.render());
            this.$el.append(this.tvSeasonSearchView.render());
            this.$el.append(this.genresFilterView.render());

        }
    });

    return SearchMainView;
});