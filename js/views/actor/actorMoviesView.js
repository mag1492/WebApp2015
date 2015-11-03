define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actor/actorMoviesTemplate.html',
    'collections/movies'
], function($, _, Backbone, actorMoviesTemplate, Movies){

    var ActorMoviesView = Backbone.View.extend({
        template : _.template(actorMoviesTemplate),
        el: '.actor-movies',
        initialize: function(id){
            this.movies = new Movies({"actorId" : id});
        },

        render: function () {
            var that = this;
            this.movies.fetch({
                success: function(ret) {
                    that.$el.html(that.template({movies: ret.toJSON()}));
                }
            });
        }
    });
    return ActorMoviesView;
});