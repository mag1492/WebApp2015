define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var User = Backbone.Model.extend({
        initialize: function (options) {
            options || (options = {});
            this.name = options.name;
            this.password = options.password;
            this.email = options.email;
            this.url = 'https://umovie.herokuapp.com/signup';
        },

        parse: function(response) {
            return response.results;
        }
    });
    return User;
});