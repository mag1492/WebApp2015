define([
    'jquery',
    'underscore',
    'backbone',
    'models/tokenInfo',
    'text!templates/menuTemplate.html'
], function ($, _, Backbone, TokenInfo, menuTemplate) {
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
                $('#srch-term').remove();
                $('.input-group-btn').remove();
            }else{
                this.tokenInfo.fetch({
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', $.cookie('token'));
                    },
                    success: function (response) {
                        var loggedUser = response.toJSON();
                        that.$el.html(that.template({loggedUser: loggedUser}));
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

function menuRedirect(){
    document.location.href="#/search/" + $("#srch-term").val();
}
