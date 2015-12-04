define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var ActorsResult = Backbone.Collection.extend({
        initialize: function(options){
            this.searchField = options.searchField;
            this.isGeneral = options.isGeneral;
            if(options.isGeneral){
                this.url = 'https://umovie.herokuapp.com/unsecure/search/actors?q=' + options.searchField;
            }
            else{
                this.url = 'https://umovie.herokuapp.com/unsecure/search/actors?q=' + options.searchField+ '&limit=40';

            }
        },
        parse: function(response) {
            return response.results;
        }
    });
    return ActorsResult;
});