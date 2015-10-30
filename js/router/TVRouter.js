var app = app || {};

$(function(){

    var TVRouter = Backbone.Router.extend({
       routes: {
           "": "homeTVShow"
       },

        homeTVShow: function(){
            console.log("this is home TV");
            app.menuView.render();
            app.tvShowView.render();
            app.episodesView.render();
       }

    });

    app.tvRouter = new TVRouter();
    Backbone.history.start();
});