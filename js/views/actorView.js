var app = app || {};

$(function() {
    var chuckNorris = new app.Actor({"id" : "129377537"});

    ActorView = Backbone.View.extend({
        template : _.template($('#actor-info-template').html()),
        el: '.actor-info',

        initialize: function(id){
            this.actor = new app.Actor({"actorId" : id});
        },

        render: function () {
            var that = this;
            this.actor.fetch({
                success: function (ret) {
                    that.$el.html(that.template({actor: ret.toJSON()}));
                }
            })
        }
    });

    app.actorView = new ActorView();
});