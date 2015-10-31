var app = app || {};

$(function(){

    var TVRouter = Backbone.Router.extend({
       routes: {
           "": "homeTVShow"
       },

        homeTVShow: function(){
            app.menuView.render();
            app.trailerEpisodeView.render();
            app.tvShowView.render();
            app.episodesView.render();

       }

    });

    app.tvRouter = new TVRouter();
    Backbone.history.start();
});