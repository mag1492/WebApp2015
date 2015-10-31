var app = app || {};

$(function(){
    var episodes = new app.Episodes({seasonId : "279175900"});
    var EpisodesView = Backbone.View.extend({
        template : _.template($('#season-episodes-template').html()),
        el: ".seasonX-episodes",
        model : episodes,

        render: function(){
            var that = this;
            episodes.fetch({
                success: function(response){
                    that.$el.html(that.template({episodes: response.toJSON()}));
                }
            });
        }
    });
    app.episodesView = new EpisodesView();
});