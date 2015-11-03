var app = app || {};

$(function(){

    app.episodesView = Backbone.View.extend({
        template : _.template($('#season-episodes-template').html()),
        el: ".seasonX-episodes",

        initialize: function(id){
          this.episodes = new app.Episodes({"seasonId" : id});
        },

        render: function(){
            var that = this;
            this.episodes.fetch({
                success: function(response){
                    that.$el.html(that.template({episodes: response.toJSON()}));
                    $("#cover").css("background", "url("+ response.toJSON()[0].artworkUrl100 +") ");
                }
            });
        }
    });
});