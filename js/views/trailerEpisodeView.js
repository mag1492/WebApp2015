var app = app || {};

$(function(){

    var episodes = new app.Episodes({seasonId : "279175900"});
    console.log(episodes.seasonId);
    console.log(episodes.seasonId);
    console.log(episodes.url);

    var trailerView = Backbone.View.extend({
        template : _.template($('#season-episode-trailer-template').html()),
        el: ".season-info-trailer",
        model : episodes,

        render: function(){

            var that = this;
            episodes.fetch({
                success: function(response){
                    console.log("should be trailerview");
                    var episodes = response.toJSON();
                    $("#trailer-background").css("background", "url("+ episodes[0].artworkUrl100 +") ");
                    that.$el.html(that.template({episodes: response.toJSON()}));
                }
            });
        }
    });
    app.trailerEpisodeView = new trailerView();
});