
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/genresFilterTemplate.html',
    'collections/moviesGenres'
], function($, _, Backbone, GenresFilterTemplate, MoviesGenres){
    var GenresFilterView = Backbone.View.extend({
        template : _.template(GenresFilterTemplate),
        el: ".genres-filter",

        initialize: function(){
            this.genres = new MoviesGenres();
        },

        render: function(){
            var that = this;
            console.log(this.genres);
            this.genres.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    console.log("succes!");
                    that.$el.html(that.template({genres: response.toJSON()}));
                }
            });
        }
    });
    return GenresFilterView;
});