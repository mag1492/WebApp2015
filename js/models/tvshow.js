define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var TvShow = Backbone.Model.extend({

        urlRoot: 'https://umovie.herokuapp.com/unsecure/tvshows',

        parse: function(response){
            return response.results;
        }

    });
    return TvShow;
});