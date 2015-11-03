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
                }
            });
        }
    });
    return MovieSupplementaryInfosView;
});