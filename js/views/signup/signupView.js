define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/signup/signupTemplate.html',
    'models/userSignup',
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
            'click #submit-signup': 'submit'
        },

        renderSuccess: function(){
            this.$el.html(this.successTemplate());
        },

        submit: function(e){
            e.preventDefault();
            var that = this;
            var user = new User({name : $("#form-username").val(), email : $("#form-email").val(), password : $("#form-password").val()});
            user.save(user.attributes, {
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                data: $.param(user.attributes).toString(),
                success: function(ret){
                    that.renderSuccess();
                }
            });
        }

    });
    return SignUpView;
});
