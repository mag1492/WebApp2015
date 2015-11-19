/**
 * Created by Gabriel on 11/19/2015.
 */
define([
    '../../libs/jquery/jquery-min',
    'underscore',
    'backbone',
    'text!templates/search/actorResultTemplate.html',
    '../../collections/searchResult/actorsResult'
], function($, _, Backbone, ActorResultTemplate, ActorResult){
    var ActorSearchView = Backbone.View.extend({
        template : _.template(ActorResultTemplate),
        el: ".actor-result",

        initialize: function(searchField){
            this.actors = new ActorResult({"searchField" : searchField});

        },

        render: function(){
            var that = this;
            console.log('render actor view debut');

            this.actors.fetch({
                success: function(response){
                    that.$el.html(that.template({actors: response.toJSON()}));
                    console.log('render main view fin');

                }
            });

        }
    });
    return ActorSearchView;
});