var app = app || {};

$(function() {
    app.ChuckNorrisMovies = Backbone.Collection.extend({
        url : 'https://umovie.herokuapp.com/unsecure/actors/129377537/movies',

        initialize: function(options){
            options || (options= {});
            if(options.actorId){
                this.actorId = options.actorId;
                this.url = 'https://umovie.herokuapp.com/unsecure/actors/'+ options.actorId +'/movies';
            }
        },

        parse: function(response) {
            return response.results;
        }
    });
});