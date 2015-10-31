var app = app || {};

$(function() {

    ActorMainView = Backbone.View.extend({

        template : _.template($('#actor-main-template').html()),
        el: '.content',

        render: function () {
            this.$el.html(this.template());
        }
    });

    app.actorMainView = new ActorMainView();
});