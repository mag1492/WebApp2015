
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/actorResultTemplate.html',
    'collections/searchResult/actorsResult'
], function($, _, Backbone, ActorResultTemplate, ActorResult){
    var ActorSearchView = Backbone.View.extend({
        template : _.template(ActorResultTemplate),

        initialize: function(options){
            this.actors = new ActorResult(options);
            this.setElement(options.el);

        },

        render: function(){
            var that = this;
            this.actors.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    that.$el.html(that.template({actors: response.toJSON()}));
                }
            });
        }
    });
    return ActorSearchView;
});