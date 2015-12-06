define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/searchMainTemplate.html',
    'views/search/movieSearchView',
    'views/search/moviesGenresFilterView'
], function($, _, Backbone, SearchMainTemplate, MovieSearchView,MoviesGenresFilterView){

    var SearchMainView = Backbone.View.extend({

        template : _.template(SearchMainTemplate),
        el: '.content',

        render: function (searchField) {
            this.$el.html(this.template());
            var optionsMovies = {searchField : searchField, isGeneral : false, el : ".movie-result"};
            var optionsMoviesGenres = {searchField : searchField, isGeneral : false, el : ".movie-result"};

            this.movieSearchView = new MovieSearchView(optionsMovies);
            this.moviesGenresFilterView = new MoviesGenresFilterView(optionsMoviesGenres);

            this.$el.append(this.movieSearchView.render());
            this.$el.append(this.moviesGenresFilterView.render());

        }
    });

    return SearchMainView;
});