var app = app || {};

$(function() {
    var chuckNorris = new app.Actor({"id" : "129377537"});

    ActorView = Backbone.View.extend({
        template : _.template($('#actor-info-template').html()),
        el: '.actor-info',
        model : chuckNorris,
        render: function () {
            var that = this;
            chuckNorris.fetch({
                success: function (ret) {
                    that.$el.html(that.template({actor: ret.toJSON()}));
                }
            })
        }
    });

    app.actorView = new ActorView();
});