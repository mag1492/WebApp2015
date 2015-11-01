var app = app || {};

$(function() {

    ActorMoviesView = Backbone.View.extend({
        template : _.template($('#actor-movies-template').html()),
        el: '.actor-movies',
        initialize: function(id){
            this.movies = new app.actorMovies({"actorId" : id});
        },

        render: function () {
            var that = this;
            this.movies.fetch({
                success: function(ret) {
                    that.$el.html(that.template({movies: ret.toJSON()}));
                }
            });
        }
    });
    app.actorMoviesView = new ActorMoviesView();
});