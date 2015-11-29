define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieInfoTemplate.html',
    'models/movie'
], function($, _, Backbone, MovieInfoTemplate, Movie){
    var MovieView = Backbone.View.extend({
        template : _.template(MovieInfoTemplate),
        el: '.movie-info',

        initialize: function(id){
            this.movie = new Movie({"trackId" : id});
        },

        render: function () {
            var that = this;
            this.movie.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function (ret) {
                    that.$el.html(that.template({movie: ret.toJSON()}));
                }
            })
        }
    });

    return MovieView;
});