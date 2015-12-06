define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var TvShowSeasonResult = Backbone.Collection.extend({
        initialize: function(options){
            this.searchField = options.searchField;
            this.isGeneral = options.isGeneral;
            this.genres = [];
            if(options.isGeneral){
                this.url = 'https://umovie.herokuapp.com/search/tvshows/seasons?q='+ options.searchField;
            }
            else{
                this.url = 'https://umovie.herokuapp.com/search/tvshows/seasons?q=' + options.searchField+ '&limit=40';

            }
        },
        parse: function(response) {
            return response.results;
        },
        addGenreUrl: function(genre) {
            this.url += '&genre=' + genre;
        },
        removeGenreUrl: function(genre){
            this.url = this.url.replace('&genre=' + genre, "")
        },
        addGenre: function(genre) {
            this.genres.push(genre);
        },
        removeGenre: function(genre){
            var index = this.genres.indexOf(genre);
            if (index > -1) {
                this.genres.splice(index, 1);
            }
        }
    });
    return TvShowSeasonResult;
});