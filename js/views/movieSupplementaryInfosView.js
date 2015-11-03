var app = app || {};

$(function(){

    app.movieSupplementaryInfosView = Backbone.View.extend({
        template : _.template($('#movie-supplementaryInfo-template').html()),
        el: "movie-supplementary-info",

        initialize: function(id){
            this.movie = new app.Movie({"trackId" : id});
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
});