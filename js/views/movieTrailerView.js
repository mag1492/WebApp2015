var app = app || {};

$(function(){
    app.movieTrailerView = Backbone.View.extend({
        template : _.template($('#movie-trailer-template').html()),
        el: ".movie-info-trailer",

        initialize: function(id){
            this.movie = new app.Movie({"trackId" : id});
        },

        render: function(){
            var that = this;
            this.movie.fetch({
                success: function(response){
                    var movie = response.toJSON();
                    $(".trailer-background").css("background", "url("+ movie[0].artworkUrl100 +") ");
                    that.$el.html(that.template({movie: response.toJSON()}));
                }
            });
        }
    });
});