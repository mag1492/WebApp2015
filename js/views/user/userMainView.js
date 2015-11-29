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

        getGravatar: function(email) {
            var emailHash = $.md5(email);
            console.log(emailHash);
            var gravatarUrl = "http://www.gravatar.com/avatar/"+emailHash+"?s=200&d=http%3A%2F%2Fs18.postimg.org%2F5co1s5md5%2Flogo_Opaque.gif"
            return gravatarUrl;
        },

        render: function(){
            var that = this;
            this.user.fetch({
                success: function(response){
                    var user = response.toJSON();
                    user.following.push(user);

                    var avatar = that.getGravatar(user.email);
                    var retour = ({avatar: avatar, user: user})
                    that.$el.html(that.template({user: retour}));
                    var view = new UserWatchlistView(user.id);
                    that.$el.append(view.render());
                }
            });
        }
    });

    return UserMainView;
});