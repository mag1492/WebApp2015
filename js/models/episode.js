var app = app || {};

$(function(){

    app.Episode = Backbone.Model.extend({

        urlRoot: 'https://umovie.herokuapp.com/unsecure/tvshows/season/id/episodes',

        parse: function(response){
            return response.results;
        }

    });
});