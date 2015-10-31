var app = app || {};

$(function(){

    app.Episodes = Backbone.Collection.extend({
        seasonId : "",
        url : 'https://umovie.herokuapp.com/unsecure/tvshows/season/noseason/episodes',

        initialize: function(options){
            options || (options= {});
            if(options.seasonId){
                this.seasonId = options.seasonId;
                this.url = 'https://umovie.herokuapp.com/unsecure/tvshows/season/'+ options.seasonId +'/episodes';
            }
        },

        parse: function(response){
            return response.results;
        }
    });
});