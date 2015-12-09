define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'models/tokenInfo',
    'text!templates/menuTemplate.html',
    'collections/searchResult/autocompleteCollection',
    'awesomplete'
], function ($, _, Backbone, swal, TokenInfo, menuTemplate, AutocompleteCollection) {
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
                    },
                    error: function(ret, jqXHR){
                        showError(jqXHR.status);
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
                            if(result.attributes.kind === "feature-movie")
                                that.list.push(result.attributes.trackName);
                            if(result.attributes.kind === "tv-episode" || result.attributes.kind === "artist")
                                that.list.push(result.attributes.artistName);
                        });
                        var uniqueArray = that.list.filter(function(elem, pos,arr) {
                            return arr.indexOf(elem) == pos;
                        });
                        that.awesomplete.list = uniqueArray;
                        that.awesomplete.evaluate();
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
