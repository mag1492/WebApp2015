define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var TvShowEpisodesResult = Backbone.Collection.extend({
        initialize: function(searchField){
                this.searchField = searchField;
                this.url = 'https://umovie.herokuapp.com/unsecure/search/tvshows/episodes?q=' + searchField.searchField;
        }
    });
    return TvShowEpisodesResult;
});