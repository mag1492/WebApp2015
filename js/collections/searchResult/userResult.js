define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var userResult = Backbone.Collection.extend({
        initialize: function(options){
            this.searchField = options.searchField;
            this.isGeneral = options.isGeneral;
            if(options.isGeneral){
                this.url = 'https://umovie.herokuapp.com/search/users?q='+ options.searchField;
            }
            else{
                this.url = 'https://umovie.herokuapp.com/search/users?q=' + options.searchField+ '&limit=40';

            }
        }
    });
    return userResult;
});