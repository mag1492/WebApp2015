define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var User = Backbone.Model.extend({
        initialize: function(options){
                this.id = options.id;
                this.url = 'https://umovie.herokuapp.com/users/'+ options.id;

        }
    });
    return User;
});