define([
    'jquery',
    'underscore',
    'backbone',
    'models/user',
    'text!templates/user/userMainTemplate.html'
], function($, _, Backbone,User, UserMainTemplate){
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
                    that.$el.html(that.template({user: response.toJSON()}));
                }
            });
        }
    });

    return UserMainView;
});