define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actor/actorInformationTemplate.html',
    'models/actor'
], function($, _, Backbone, actorInformationTemplate, Actor){
    var ActorView = Backbone.View.extend({
        template : _.template(actorInformationTemplate),
        el: '.actor-info',

        initialize: function(id){
            this.actor = new Actor({"actorId" : id});
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

    return ActorView;
});