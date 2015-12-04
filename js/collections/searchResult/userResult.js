define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var userResult = Backbone.Collection.extend({
        initialize: function(options){
                this.searchField = options.searchField;
                this.url = 'https://umovie.herokuapp.com/unsecure/search/users?q=' + options.searchField;
        }
    });
    return userResult;
});