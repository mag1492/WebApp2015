define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/signup/signupTemplate.html',
    'models/userSignup',
    'text!templates/signup/signupSuccessTemplate.html',
    '../errorHandler'
], function($, _, Backbone, swal, SignUpTemplate, User, SignUpSuccessTemplate){
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
            var username =  $("#form-username").val();
            var email =  $("#form-email").val();
            var password =  $("#form-password").val();

            if(this.isEmpty(username)){
                emptyUsername();
            }else if(this.isEmpty(password)){
                emptyPassword();
            }else if(!this.isEmailValid(email)){
                invalidEmail();
            }else if(this.isEmailValid(email) && !this.isEmpty(password) && !this.isEmpty(username)){
                var user = new User({name : username, email : email, password : password});
                user.save(user.attributes, {
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    data: $.param(user.attributes).toString(),
                    success: function(ret){
                        that.renderSuccess();
                    },
                    error: function(){
                        signInError();
                    }
                });
            }
        },

        isEmailValid: function(email){
            var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return regex.test(email);
        },

        isEmpty: function(string){
            return string == "" || /^\s+$/.test(string);
        }
    });
    return SignUpView;
});
