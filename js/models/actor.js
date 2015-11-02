var app = app || {};

$(function() {
    app.Actor = Backbone.Model.extend({
        initialize: function(options){
            options || (options= {});
            if(options.actorId){
                this.actorId = options.actorId;
                this.url = 'https://umovie.herokuapp.com/unsecure/actors/'+ options.actorId;
            }
        },

        parse: function(response) {
            return response.results;
        }
    });
});