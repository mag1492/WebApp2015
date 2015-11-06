define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieMainTemplate.html',
    'views/movie/movieView',
    'views/movie/movieSupplementaryInfosView',
    'views/movie/movieTrailerView',
    'views/movie/movieWatchlistButtonView'
], function($, _, Backbone, MovieMainTemplate, MovieView, MovieSupplementaryInfosView, MovieTrailerView, MovieWatchlistButtonView){

    var MovieMainView = Backbone.View.extend({

        template : _.template(MovieMainTemplate),
        el: '.content',

        render: function (id) {
            this.$el.html(this.template());
            this.movieView = new MovieView(id);
            this.movieTrailerView = new MovieTrailerView(id);
            this.movieSupplementaryInfosView = new MovieSupplementaryInfosView(id);
            this.movieWatchlistButtonView = new MovieWatchlistButtonView(id);


            this.$el.append(this.movieView.render());
            this.$el.append(this.movieTrailerView.render());
            this.$el.append(this.movieSupplementaryInfosView.render());
            this.$el.append(this.movieWatchlistButtonView.render());
        }
    });

    return MovieMainView;
});