define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var TvShow = Backbone.Model.extend({

        urlRoot: 'https://umovie.herokuapp.com/tvshows',

        parse: function(response){
            return response.results;
        }

    });
    return TvShow;
});