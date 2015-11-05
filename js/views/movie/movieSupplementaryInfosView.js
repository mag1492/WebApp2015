define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieSupplementaryInfoTemplate.html',
    'models/movie'
], function($, _, Backbone, MovieSupplementaryInfoTemplate, Movie){
    var MovieSupplementaryInfosView = Backbone.View.extend({
        template : _.template(MovieSupplementaryInfoTemplate),
        el: ".movie-supplementary-info",

        initialize: function(id){
            this.movie = new Movie({"trackId" : id});
        },

        render: function(){
            var that = this;
            this.movie.fetch({
                success: function(response){
                    that.$el.html(that.template({movie: response.toJSON()}));
                    var url = response.toJSON()[0].artworkUrl100.replace("100x100", "200x300");
                    $("#cover").css("background", "url("+ url +") no-repeat");

                }
            });
        }
    });
    return MovieSupplementaryInfosView;
});