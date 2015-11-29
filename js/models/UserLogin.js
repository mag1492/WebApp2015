define([
    'underscore',
    'backbone',
    'cookie'
], function(_, Backbone) {
    var User = Backbone.Model.extend({
        initialize: function (options) {
            options || (options = {});
            this.email = options.email;
            this.password = options.password;
            this.url = 'https://umovie.herokuapp.com/login';
        },

        parse: function(response) {
            var date = new Date();
            var minutes = 60;
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            $.cookie('token', response.token, { expires: date });
            return response.results;
        }
    });
    return User;
});