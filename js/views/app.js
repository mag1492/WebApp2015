define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'models/tokenInfo',
    'text!templates/menuTemplate.html',
    'collections/searchResult/autocompleteCollection',
    'collections/searchResult/userResult',
    'collections/searchResult/actorItunes',
    'collections/searchResult/tvshowItunes',
    'awesomplete',
    'views/errorHandler'
], function ($, _, Backbone, swal, TokenInfo, menuTemplate, AutocompleteCollection, Users, Actors, TvShows) {
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
                this.usersCollection = new Users({searchField: text});
                this.actorsCollection = new Actors(text);
                this.tvShowCollection = new TvShows(text);

                var deferreds = [];
                deferreds.push(this.usersCollection.fetch({
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', $.cookie('token'));
                    }}),
                    this.actorsCollection.fetch({
                        dataType:"JSONP"
                    }),
                    this.autocompleteCollection.fetch({
                        dataType:"JSONP"
                    }),
                    this.tvShowCollection.fetch({
                        dataType:"JSONP"
                    })
                );

                $.when(deferreds[0], deferreds[1], deferreds[2], deferreds[3]).done(function(response1, response2, response3, response4){
                    that.list = [];
                    response3[0].results.forEach(function(result) {
                        that.list.push(result.trackName);
                    });
                    response4[0].results.forEach(function(result) {
                        that.list.push(result.artistName);
                    });
                    response1[0].forEach(function(result) {
                        that.list.push(result.name);
                    });
                    response2[0].results.forEach(function(result) {
                        that.list.push(result.artistName);
                    });
                    var uniqueArray = that.list.filter(function(elem, pos, arr) {
                        return arr.indexOf(elem) == pos;
                    });
                    that.awesomplete.list = uniqueArray;
                    that.awesomplete.evaluate();
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
