define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/signup/signupTemplate.html',
    'models/User'
], function($, _, Backbone, SignUpTemplate, User){
    var SignUpView = Backbone.View.extend({
        template : _.template(SignUpTemplate),
        el: ".content",

        render: function(){
            this.$el.html(this.template());

        },

        events: {
            'submit form': 'submit'
        },

        submit: function(form){
            var user = new User({name : $("#form-username").val(), password : $("#form-password").val(), email : $("#form-email").val()});
            user.save(user.attributes, {
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                success: function(ret){
                }
            })
        }
    });
    return SignUpView;
});
