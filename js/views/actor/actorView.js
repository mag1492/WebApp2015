define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actor/actorInformationTemplate.html',
    'models/actor',
    '../errorHandler'
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
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function (ret) {
                    that.$el.html(that.template({actor: ret.toJSON()}));
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            })
        }
    });

    return ActorView;
});