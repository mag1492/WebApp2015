var app = app || {};

$(function() {

    MovieMainView = Backbone.View.extend({

        template : _.template($('#movie-main-template').html()),
        el: '.content',

        render: function (id) {
            this.$el.html(this.template());
            this.movieView = new MovieView(id);
            this.movieTrailerView = new app.movieTrailerView(id);
            this.movieSupplementaryInfosView = new app.movieSupplementaryInfosView(id);

            this.$el.append(this.movieView.render());
            this.$el.append(this.movieTrailerView.render());
            this.$el.append(this.movieSupplementaryInfosView.render());
        }
    });

    app.movieMainView = new MovieMainView();
});