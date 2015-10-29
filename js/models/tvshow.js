var app = app || {};

$(function(){

    app.TvShow = Backbone.Model.extend({

        urlRoot: 'https://umovie.herokuapp.com/unsecure/tvshows',

        parse: function(response){
            return response.results;
        }

    });

});