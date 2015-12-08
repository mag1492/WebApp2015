define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/search/moviesGenresFilterTemplate.html',
    'text!templates/search/moviesResultTemplate.html',
    'collections/searchResult/moviesResult',
    'collections/moviesGenres',
    'views/movie/movieWatchlistButtonView',
    '../errorHandler'
], function($, _, Backbone, Swal, MoviesGenresFilterTemplate, MovieResultTemplate, MovieResult, MoviesGenres, MovieWatchlistButtonView){
    var GenresFilterView = Backbone.View.extend({
        template : _.template(MoviesGenresFilterTemplate),

        initialize: function(options){
            this.genres = new MoviesGenres();
            this.MovieResult = new MovieResult(options);
            this.movieEl = options.el;
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
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        },

        events: {
            'click .movies-genre-chk': 'filterGenre'
        },

        filterGenre: function(e){
            var id = $(e.currentTarget)[0].id;
            if(e.currentTarget.checked){
                this.MovieResult.addGenre(id);
            } else{
                this.MovieResult.removeGenre(id);
            }
            var that = this;
            var movies = [];
            if(this.MovieResult.genres.length > 0) {
                this.MovieResult.genres.forEach(function (genre) {
                    that.MovieResult.addGenreUrl(genre);
                    that.MovieResult.fetch({
                        async: false,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', $.cookie('token'));
                        },
                        success: function (response) {
                            movies.push(response.toJSON());
                        }
                        ,
                        error: function(ret, jqXHR){
                            showError(jqXHR.status);
                        }
                    });
                    that.MovieResult.removeGenreUrl(genre);
                });
                var arr = [];
                for (var k in movies) {
                    arr = arr.concat(movies[k]);
                }

                $(that.movieEl).html(_.template(MovieResultTemplate)({movies: arr, searchField : that.MovieResult.searchField, isGeneral : that.MovieResult.isGeneral}));
                arr.forEach(function(movie){
                    var view = new MovieWatchlistButtonView(movie.trackId);
                    $(that.movieEl).append(view.render());
                });
            }else{
                that.MovieResult.fetch({
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', $.cookie('token'));
                    },
                    success: function (response) {
                        $(that.movieEl).html(_.template(MovieResultTemplate)({movies: response.toJSON(), searchField : that.MovieResult.searchField, isGeneral : that.MovieResult.isGeneral}));
                         response.toJSON().forEach(function(movie){
                         var view = new MovieWatchlistButtonView(movie.trackId);
                         $(that.movieEl).append(view.render());
                         });
                    },
                    error: function(ret, jqXHR){
                        showError(jqXHR.status);
                    }
                });
            }

    }

    });
    return GenresFilterView;

});