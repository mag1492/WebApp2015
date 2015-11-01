var app = app || {};

$(function(){

    app.trailerEpisodeView = Backbone.View.extend({
        template : _.template($('#season-episode-trailer-template').html()),
        el: ".season-info-trailer",

        initialize: function(id){
            this.episodes = new app.Episodes({"seasonId" : id});
        },

        render: function(){
            var that = this;
            this.episodes.fetch({
                success: function(response){
                    var episodes = response.toJSON();
                    $("#trailer-background").css("background", "url("+ episodes[0].artworkUrl100 +") ");
                    that.$el.html(that.template({episodes: response.toJSON()}));
                }
            });
        }
    });

});