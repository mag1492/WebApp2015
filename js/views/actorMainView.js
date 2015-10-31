var app = app || {};

$(function() {

    ActorMainView = Backbone.View.extend({

        template : _.template($('#actor-main-template').html()),
        el: '.content',

        render: function () {
            this.$el.html(this.template());
            this.actorMoviesView = new ActorMoviesView();
            this.actorView = new ActorView();
            this.$el.append( this.actorMoviesView.render());
            this.$el.append( this.actorView.render() );
        }
    });

    app.actorMainView = new ActorMainView();
});