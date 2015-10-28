var app = app || {};

$(function(){

    app.Season = Backbone.Collection.extend({

        url : "/tvshows/season/",

        parse: function(response){
            return response.results;
        }

    });

});