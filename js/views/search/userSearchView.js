define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/userResultTemplate.html',
    'collections/searchResult/userResult',
    'models/tokenInfo'
], function($, _, Backbone, UserResultTemplate, UserResult, TokenInfo){
    var userSearchView = Backbone.View.extend({
        template : _.template(UserResultTemplate),
        el: ".user-result",

        initialize: function(searchField){
            this.users = new UserResult({"searchField" : searchField});
            this.tokenInfo = new TokenInfo();

        },

        render: function(){
            var that = this;
            this.users.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response) {
                    var users = response.toJSON();
                    that.$el.html(that.template({users: users}));
                }
            });
        }
    });
    return userSearchView;
});