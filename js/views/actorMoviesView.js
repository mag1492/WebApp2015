/**
 * Created by Gabriel on 2015-10-27.
 */
$(function() {
    var movies = new ChuckNorrisMovies({});
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
            })
        }
    });
});