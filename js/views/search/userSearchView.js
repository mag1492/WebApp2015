define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/userResultTemplate.html',
    'models/tokenInfo',
    'collections/searchResult/userResult'
], function($, _, Backbone, UserResultTemplate, TokenInfo, UserResult){
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
                    that.tokenInfo.fetch({
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', $.cookie('token'));
                        },
                        success: function (response) {
                            var loggedUser = response.toJSON();
                            users.forEach(function(user){
                                user.isFollowing = false;
                                if(user.name == loggedUser.name && user.email == loggedUser.email){
                                    user.isFollowing = null;
                                }
                                loggedUser.following.forEach(function(follower){
                                    if(user.name == follower.name && user.email == follower.email){
                                        user.isFollowing = true;
                                    }
                                });

                            });
                            console.log(users);
                            that.$el.html(that.template({users: users}));

                        }
                    });
                }
            });
        }
    });
    return userSearchView;
});