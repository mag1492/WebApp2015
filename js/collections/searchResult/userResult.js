define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var userResult = Backbone.Collection.extend({
        initialize: function(searchField){
                this.searchField = searchField;
                this.url = 'https://umovie.herokuapp.com/unsecure/search/users?q=' + searchField.searchField;
        }
    });
    return userResult;
});