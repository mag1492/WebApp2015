define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var Actor = Backbone.Model.extend({
        initialize: function(options){
            options || (options= {});
            if(options.actorId){
                this.actorId = options.actorId;
                this.url = 'https://umovie.herokuapp.com/actors/'+ options.actorId;
            }
        },

        parse: function(response) {
            return response.results;
        }
    });
    return Actor;
});