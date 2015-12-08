define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/search/userResultTemplate.html',
    'models/tokenInfo',
    'collections/searchResult/userResult',
    '../errorHandler'
], function($, _, Backbone, swal, UserResultTemplate, TokenInfo, UserResult){
    var userSearchView = Backbone.View.extend({
        template : _.template(UserResultTemplate),

        initialize: function(options){
            this.users = new UserResult(options);
            this.tokenInfo = new TokenInfo();

            if(options.isGeneral == true){
                this.setElement(options.el);
            }else{
                this.setElement(".content");
            }
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
                            that.$el.html(that.template({users: users, searchField : that.users.searchField, isGeneral : that.users.isGeneral}));
                        },
                        error: function(ret, jqXHR){
                            showError(jqXHR.status);
                        }
                    });
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        }
    });
    return userSearchView;
});