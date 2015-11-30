define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/userResultTemplate.html',
    'collections/searchResult/userResult'
], function($, _, Backbone, UserResultTemplate, UserResult){
    var userSearchView = Backbone.View.extend({
        template : _.template(UserResultTemplate),
        el: ".user-result",

        initialize: function(searchField){
            this.users = new UserResult({"searchField" : searchField});

        },

        render: function(){
            var that = this;
            this.users.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    that.$el.html(that.template({users: response.toJSON()}));
                }
            });
        }
    });
    return userSearchView;
});