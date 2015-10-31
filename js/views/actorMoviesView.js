var app = app || {};

$(function() {
    var movies = new app.ChuckNorrisMovies({"actorId" : "129377537"});
    ActorMoviesView = Backbone.View.extend({
        template : _.template($('#actor-movies-template').html()),
        el: '.actor-movies',
        collection : movies,
        render: function () {
            var that = this;
            movies.fetch({
                success: function (ret) {
                    that.$el.html(that.template({movies: ret.toJSON()}));
                }
            });
        }
    });
    app.actorMoviesView = new ActorMoviesView();
});