define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actor/actorMainTemplate.html',
    'views/actor/actorMoviesView',
    'views/actor/actorView'
], function($, _, Backbone, actorMainTemplate, ActorMoviesView, ActorView){

    var ActorMainView = Backbone.View.extend({

        template : _.template(actorMainTemplate),
        el: '.content',

        render: function (id) {
            this.$el.html(this.template());
            this.actorMoviesView = new ActorMoviesView(id);
            this.actorView = new ActorView(id);
            this.$el.append(this.actorMoviesView.render());
            this.$el.append(this.actorView.render());
        }
    });

    return ActorMainView;
});