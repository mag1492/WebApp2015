/**
 * Created by Gabriel on 2015-10-14.
 */
$(function() {

    var menuView = new MenuView();

    router = new Router();
    router.on('route:homeFromOtherPage', function() {
        menuView.render();
    });

    Backbone.history.start();
});