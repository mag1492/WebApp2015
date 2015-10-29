var app = app || {};

$(function(){

    app.Season = Backbone.Model.extend({

        urlRoot: 'https://umovie.herokuapp.com/unsecure/tvshows/seasons',

        parse: function(response){
            return response.results;
        }

    });

});