define([
    'jquery',
    'underscore',
    'backbone',
    'models/tokenInfo',
    'awesomplete',
    'text!templates/menuTemplate.html'
], function ($, _, Backbone, TokenInfo, awesomplete, menuTemplate) {
    var AppView = Backbone.View.extend({
        template : _.template(menuTemplate),
        el: '.menu',
        initialize: function(){
            this.tokenInfo = new TokenInfo();
        },
        render: function () {
            var that = this;
            if($.cookie('token') == undefined){
                this.$el.html(that.template({loggedUser : undefined}));
                $('#watchlist-link').remove();
                $('#search-bar').remove();
                $('#logout').remove();
                $('.input-group-btn').remove();
            }else{
                this.tokenInfo.fetch({
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', $.cookie('token'));
                    },
                    success: function (response) {
                        var loggedUser = response.toJSON();
                        that.$el.html(that.template({loggedUser: loggedUser}));
                        $('#login-button').remove();
                    }
                });
            }
        }
    });
    return AppView;
});

var input = document.getElementById("srch-term");
var awesomplete = new Awesomplete(input);
awesomplete.list = ["Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails"];

function goToHome(){
    document.location.href="index.html";
}

function waitAndGoToHome(time){
    setTimeout("document.location.href = 'index.html';",time);
}

function waitAndGoToLogIn(time){
    setTimeout("document.location.href = 'index.html#/login';",time);
}

function menuRedirect(){
    document.location.href="#/search/" + $("#srch-term").val();
}

function logout(){
    $.removeCookie('token');
    location.reload();
}
