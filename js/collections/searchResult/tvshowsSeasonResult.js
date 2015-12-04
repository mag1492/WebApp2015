define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var TvShowSeasonResult = Backbone.Collection.extend({
        initialize: function(options){
                this.searchField = options.searchField;
                this.url = 'https://umovie.herokuapp.com/unsecure/search/tvshows/seasons?q=' + options.searchField;
        },
        parse: function(response) {
            return response.results;
        }
    });
    return TvShowSeasonResult;
});