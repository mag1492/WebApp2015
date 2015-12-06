define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/moviesGenresFilterTemplate.html',
    'text!templates/search/moviesResultTemplate.html',
    'collections/searchResult/moviesResult',
    'collections/moviesGenres',
    'views/movie/movieWatchlistButtonView'
], function($, _, Backbone, MoviesGenresFilterTemplate, MovieResultTemplate, MovieResult, MoviesGenres, MovieWatchlistButtonView){
    var GenresFilterView = Backbone.View.extend({
        template : _.template(MoviesGenresFilterTemplate),

        initialize: function(options){
            this.genres = new MoviesGenres();
            this.TvshowsSeasonResult = new MovieResult(options);
            this.tvshowEl = options.el;
            this.setElement(".movies-genres-filter");

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
            'click .movies-genre-chk': 'filterGenre'
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
                    $(that.tvshowEl).html(_.template(MovieResultTemplate)({movies: response.toJSON(), searchField : that.TvshowsSeasonResult.searchField, isGeneral : that.TvshowsSeasonResult.isGeneral}));
                    response.toJSON().forEach(function(movie){
                        var view = new MovieWatchlistButtonView(movie.trackId);
                        $(that.tvshowEl).append(view.render());
                    });
                }
            });
    }

    });
    return GenresFilterView;

});