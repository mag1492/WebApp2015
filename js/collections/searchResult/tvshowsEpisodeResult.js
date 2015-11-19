define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var TvShowEpisodesResult = Backbone.Collection.extend({
        initialize: function(options){
            options || (options= {});
            if(options.searchField){
                this.searchField = options.searchField;
                this.url = 'https://umovie.herokuapp.com/unsecure/search/tvshows/episodes?q=' + options.searchField.searchField;
            }
        }
    });
    return TvShowEpisodesResult;
});