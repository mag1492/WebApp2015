define([
    'jquery',
    'underscore',
    'backbone',
    'models/tokenInfo',
    'text!templates/menuTemplate.html',
    'collections/searchResult/autocompleteCollection',
    'awesomplete'
], function ($, _, Backbone, TokenInfo, menuTemplate, AutocompleteCollection) {
    var AppView = Backbone.View.extend({
        template : _.template(menuTemplate),
        el: '.menu',
        initialize: function(){
            this.tokenInfo = new TokenInfo();
        },
        events:{
            "input #srch-term" : "autocomplete"
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
        },
        autocomplete : function () {
            var text = $("#srch-term").val();
            var input = document.getElementById("srch-term");
            this.awesomplete = new Awesomplete(input);
            if(text.length >= 3){
                var that = this;
                this.autocompleteCollection = new AutocompleteCollection(text);
                this.autocompleteCollection.fetch({
                    dataType:"JSONP",
                    success: function (response) {
                        that.list = [];
                        response.forEach(function(result) {
                            that.list.push(result.attributes.trackName);
                        });
                        that.awesomplete.list = that.list;
                        that.awesomplete.evaluate();
                        //that.awesomplete.list = [];
                    }
                });
            }
            input.focus();
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
