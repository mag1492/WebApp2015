
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/genresFilterTemplate.html',
    'text!templates/search/moviesResultTemplate.html',
    'collections/searchResult/moviesResult',
    'collections/moviesGenres'
], function($, _, Backbone, GenresFilterTemplate, MovieResultTemplate, MovieResult, MoviesGenres){
    var GenresFilterView = Backbone.View.extend({
        template : _.template(GenresFilterTemplate),

        initialize: function(options){
            this.genres = new MoviesGenres();
            this.movieResult = new MovieResult(options);
            this.movieEl = options.el;
            this.setElement(".genres-filter");

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
                this.movieResult.addGenre(id);
            } else{
                this.movieResult.removeGenre(id);
            }
            console.log(this.movieResult);
            var that = this;
            this.movieResult.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    $(that.movieEl).html(_.template(MovieResultTemplate)({movies: response.toJSON(), searchField : that.movieResult.searchField, isGeneral : that.movieResult.isGeneral}));
                }
            });
    }

    });
    return GenresFilterView;

});