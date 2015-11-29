define([
    'jquery',
    'underscore',
    'backbone',
    'md5',
    'models/user',
    'views/user/userWatchlistView',
    'text!templates/user/userMainTemplate.html'
], function($, _, Backbone, md5, User, UserWatchlistView, UserMainTemplate){
    var UserMainView = Backbone.View.extend({
        initialize: function(id){
            this.user = new User(id);
        },
        template : _.template(UserMainTemplate),
        el: '.content',

        getGravatar: function(email, size) {
            var emailHash = $.md5(email);
            var gravatarUrl = "http://www.gravatar.com/avatar/"+emailHash+"?s="+size+"&d=http%3A%2F%2Fs21.postimg.org%2F68t2nogqv%2Flogo_Whitebg.jpg"
            return gravatarUrl;
        },

        render: function(){
            var that = this;
            this.user.fetch({
                success: function(response){
                    var user = response.toJSON();
                    that.$el.html(that.template({user: user}));

                    var avatar = that.getGravatar(user.email, 200);
                    $(".avatar-img").css("background", "url("+ avatar+") center center no-repeat");

                    user.following.forEach( function(follower){
                        var avatarFollower = that.getGravatar(follower.email, 100);
                        $("#follower"+follower.id).find(".avatar-img-follower").css("background", "url("+ avatarFollower+") no-repeat");
                    })


                    var view = new UserWatchlistView(user.id);
                    that.$el.append(view.render());
                }
            });
        }
    });

    return UserMainView;
});