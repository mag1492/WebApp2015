define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var Season = Backbone.Model.extend({

        urlRoot: 'https://umovie.herokuapp.com/unsecure/tvshows/season',

        parse: function(response){
            response.results.forEach(function (season){
                var date = new Date(Date.parse(season.releaseDate));
                season.releaseDate = date.toLocaleDateString();
            });
            return response.results;
        }

    });
    return Season;
});