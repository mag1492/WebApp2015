define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/movie/movieSupplementaryInfoTemplate.html',
    'models/movie',
    '../errorHandler'
], function($, _, Backbone, swal, MovieSupplementaryInfoTemplate, Movie){
    var MovieSupplementaryInfosView = Backbone.View.extend({
        template : _.template(MovieSupplementaryInfoTemplate),
        el: ".movie-supplementary-info",

        initialize: function(id){
            this.movie = new Movie({"trackId" : id});
        },

        render: function(){
            var that = this;
            this.movie.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    that.$el.html(that.template({movie: response.toJSON()}));
                    var url = response.toJSON()[0].artworkUrl100.replace("100x100", "200x300");
                    $("#cover").css("background", "url("+ url +") no-repeat");

                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        }
    });
    return MovieSupplementaryInfosView;
});