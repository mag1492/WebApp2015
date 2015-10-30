
$(function() {

    var actor = new ActorView();
    var actorMovie = new ActorMoviesView();

    router = new Router();
    router.on('route:homeActor', function() {
        actor.render();
        actorMovie.render();
    });

    Backbone.history.start();
});