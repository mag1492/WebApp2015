define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieTrailerTemplate.html',
    'models/movie'
], function($, _, Backbone, MovieTrailerTemplate, Movie){
    var MovieTrailerView = Backbone.View.extend({
        template : _.template(MovieTrailerTemplate),
        el: ".movie-info-trailer",

        initialize: function(id){
            this.movie = new Movie({"trackId" : id});
        },

        render: function(){
            var that = this;
            this.movie.fetch({
                success: function(response){
                    var movie = response.toJSON();
                    that.$el.html(that.template({movie: response.toJSON()}));
                }
            });

        }
    });
    return MovieTrailerView;
});