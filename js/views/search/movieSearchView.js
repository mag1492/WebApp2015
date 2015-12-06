define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/search/moviesResultTemplate.html',
    'collections/searchResult/moviesResult',
    'views/movie/movieWatchlistButtonView',
    '../errorHandler'
], function($, _, Backbone, swal, MoviesResultTemplate, MovieResult, MovieWatchlistButtonView){
    var MovieSearchView = Backbone.View.extend({
        template : _.template(MoviesResultTemplate),

        initialize: function(options){
            this.movies = new MovieResult(options);
                this.setElement(options.el);
        },

        render: function(){
            var that = this;
            this.movies.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    that.$el.html(that.template({movies: response.toJSON(), searchField : that.movies.searchField, isGeneral : that.movies.isGeneral}));
                    response.toJSON().forEach(function(movie){
                        var view = new MovieWatchlistButtonView(movie.trackId);
                        that.$el.append(view.render());
                    });
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        }
    });
    return MovieSearchView;
});