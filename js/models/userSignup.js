define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var User = Backbone.Model.extend({
        initialize: function (options) {
            options || (options = {});
            this.name = options.name;
            this.email = options.email;
            this.password = options.password;
            this.url = 'https://umovie.herokuapp.com/signup';
        },

        parse: function(response) {
            return response.results;
        }
    });
    return User;
});