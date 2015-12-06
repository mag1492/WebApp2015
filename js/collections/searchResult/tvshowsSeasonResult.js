define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var TvShowSeasonResult = Backbone.Collection.extend({
        initialize: function(options){
            this.searchField = options.searchField;
            this.isGeneral = options.isGeneral;
            if(options.isGeneral){
                this.url = 'https://umovie.herokuapp.com/search/tvshows/seasons?q='+ options.searchField;
            }
            else{
                this.url = 'https://umovie.herokuapp.com/search/tvshows/seasons?q=' + options.searchField+ '&limit=40';

            }
        },
        parse: function(response) {
            return response.results;
        }
    });
    return TvShowSeasonResult;
});