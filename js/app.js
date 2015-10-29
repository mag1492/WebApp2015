<<<<<<< HEAD
var app = app || {};

$(function(){

=======
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
>>>>>>> fe1cbaa23c2356b11138a70a93dff009e31f9a14
});