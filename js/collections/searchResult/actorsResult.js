define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var ActorsResult = Backbone.Collection.extend({
        initialize: function(options){
            options || (options= {});
            if(options.searchField){
                this.searchField = options.searchField;
                this.url = 'https://umovie.herokuapp.com/unsecure/search/actors?q=' + options.searchField.searchField;
            }
        }
    });
    return ActorsResult;
});