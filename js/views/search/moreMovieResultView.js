define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/searchMainTemplate.html',
    'views/search/movieSearchView',
    'views/search/genresFilterView'
], function($, _, Backbone, SearchMainTemplate, MovieSearchView,GenresFilterView){

    var SearchMainView = Backbone.View.extend({

        template : _.template(SearchMainTemplate),
        el: '.content',

        render: function (searchField) {
            this.$el.html(this.template());
            var optionsMovies = {searchField : searchField, isGeneral : false, el : ".movie-result"};
            var optionsMoviesGenre = {searchField : searchField, isGeneral : false, el : ".movie-result"};

            this.movieSearchView = new MovieSearchView(optionsMovies);
            this.genresFilterView = new GenresFilterView(optionsMoviesGenre);

            this.$el.append(this.movieSearchView.render());
            this.$el.append(this.genresFilterView.render());

        }
    });

    return SearchMainView;
});