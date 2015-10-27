/**
 * Created by Gabriel on 2015-10-27.
 */
$(function() {
    var randomActor = new Actor({"id" : "129377537"});
    var movies = new ActorMovies({});

    ActorView = Backbone.View.extend({
        template : _.template($('#header-template').html()),
        el: '.header',
        model : randomActor,
        render: function () {
            var that = this;
            randomActor.fetch({
                success: function (ret) {
                    that.$el.html(that.template({actor: ret.toJSON()}));
                }
            })
        }
    });

    ActorMoviesView = Backbone.View.extend({
        template : _.template($('#actor-movies-template').html()),
        el: '.actor-movies',
        collection : movies,
        render: function () {
            alert('here?');
            var that = this;
            movies.fetch({
                success: function (ret) {
                    that.$el.html(that.template({movies: ret.toJSON()}));
                }
            })
        }
    });
});