define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/signup/signupTemplate.html',
    'models/User',
    'text!templates/signup/signupSuccessTemplate.html'
], function($, _, Backbone, SignUpTemplate, User, SignUpSuccessTemplate){
    var SignUpView = Backbone.View.extend({
        template : _.template(SignUpTemplate),
        successTemplate : _.template(SignUpSuccessTemplate),

        el: ".content",

        render: function(){
            this.$el.html(this.template());

        },

        events: {
            'submit form': 'submit'
        },

        render: function(){
            this.$el.html(this.successTemplate());
        },

        submit: function(){
            var user = new User({name : $("#form-username").val(), email : $("#form-email").val(), password : $("#form-password").val()});
            user.save(user.attributes, {
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                data: $.param(user.attributes).toString(),
                success: function(ret){
                    document.getElementById("search-theme-form").action = renderSuccess();
                }
            });
        }

    });
    return SignUpView;
});
