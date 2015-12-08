define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'models/tokenInfo',
    'text!templates/menuTemplate.html',
    '../errorHandler'
], function ($, _, Backbone, swal, TokenInfo, menuTemplate) {
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
                    },
                    error: function(ret, jqXHR){
                        showError(jqXHR.status);
                    }
                });
            }
        }
    });
    return AppView;
});

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
