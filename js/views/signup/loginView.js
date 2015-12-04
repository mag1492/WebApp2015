define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/login/loginTemplate.html',
    'models/userLogin'
], function($, _, Backbone, swal, LoginTemplate, User){
    var LoginView = Backbone.View.extend({
        template : _.template(LoginTemplate),

        el: ".content",

        render: function(){
            this.$el.html(this.template());
        },

        events: {
            'submit form': 'submit'
        },

        submit: function(e){
            e.preventDefault();
            var that = this;
            var email = $("#form-email").val();
            var password =$("#form-password").val();

            if(!this.isEmailValid(email)){
                swal("We're sorry...", "Your email is invalid. Try again.", "warning");
            }else if(this.isPasswordEmpty(password)){
                swal("We're sorry...", "Your password is empty. Try again.", "warning");
            }else if(this.isEmailValid(email) && !this.isPasswordEmpty(password)){
                var user = new User({email : email, password : password});
                user.save(user.attributes, {
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    data: $.param(user.attributes).toString(),
                    success: function(ret){
                        goToHome();
                    },
                    error: function(ret){
                        swal("We're sorry...", "Something went wrong. Try again.", "error");
                    }
                });
            }
        },

        isEmailValid: function(email){
            var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return regex.test(email);
        },

        isPasswordEmpty: function(password){
           return password == "" || /^\s+$/.test(password);
        }

    });
    return LoginView;
});
