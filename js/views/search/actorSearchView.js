
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/actorResultTemplate.html',
    'collections/searchResult/actorsResult'
], function($, _, Backbone, ActorResultTemplate, ActorResult){
    var ActorSearchView = Backbone.View.extend({
        template : _.template(ActorResultTemplate),
        el: ".actor-result",

        initialize: function(searchField){
            this.actors = new ActorResult({"searchField" : searchField});
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