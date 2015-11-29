define([
    'jquery',
    'underscore',
    'backbone',
    'models/user',
    'views/user/userWatchlistView',
    'text!templates/user/userMainTemplate.html'
], function($, _, Backbone,User,UserWatchlistView, UserMainTemplate){
    var UserMainView = Backbone.View.extend({
        initialize: function(id){
            this.user = new User(id);
        },
        template : _.template(UserMainTemplate),
        el: '.content',

        render: function(){
            var that = this;
            this.user.fetch({
                success: function(response){
                    console.log();
                    var user = response.toJSON();
                    user.following.push(user);
                    that.$el.html(that.template({user: user}));
                    var view = new UserWatchlistView(user.id);
                    that.$el.append(view.render());
                }
            });
        }
    });

    return UserMainView;
});