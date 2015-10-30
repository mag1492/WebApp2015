var app = app || {};

$(function(){

    var Router = Backbone.Router.extend({
        routes: {
            "": "home"
        },

        home: function(){
            app.menuView.render();
        }

    });

    app.router = new Router();
    Backbone.history.start();

})