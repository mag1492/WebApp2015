/**
 * Created by Gabriel on 2015-10-28.
 */
$(function() {

    var actor = new ActorView();
    var actorMovie = new ActorMoviesView();

    router = new Router();
    router.on('route:home', function() {
        actor.render();
        actorMovie.render();
    });

    Backbone.history.start();
});