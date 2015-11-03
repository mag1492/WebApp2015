var app = app || {};

$(function() {
    MovieView = Backbone.View.extend({
        template : _.template($('#movie-info-template').html()),
        el: '.movie-info',

        initialize: function(id){
            this.movie = new app.Movie({"trackId" : id});
        },

        render: function () {
            var that = this;
            this.movie.fetch({
                success: function (ret) {
                    that.$el.html(that.template({movie: ret.toJSON()}));
                }
            })
        }
    });

    app.movieView = new MovieView();
});