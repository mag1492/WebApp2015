define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var TvShowSeasonResult = Backbone.Collection.extend({
        initialize: function(searchField){
                this.searchField = searchField;
                this.url = 'https://umovie.herokuapp.com/unsecure/search/tvshows/seasons?q=' + searchField.searchField;
        }
    });
    return TvShowSeasonResult;
});