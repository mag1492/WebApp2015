define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/login/loginTemplate.html',
    'models/userLogin'
], function($, _, Backbone, LoginTemplate, User){
    var LoginView = Backbone.View.extend({
        template : _.template(LoginTemplate),

        el: ".content",

        render: function(){
            this.$el.html(this.template());

        },

        events: {
            'click #submit-login': 'submit'
        },

        submit: function(e){
            e.preventDefault();
            var that = this;
            var user = new User({email : $("#form-email").val(), password : $("#form-password").val()});
            user.save(user.attributes, {
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                data: $.param(user.attributes).toString(),
                success: function(ret){
                    goToHome();
                }
            });
        }

    });
    return LoginView;
});
