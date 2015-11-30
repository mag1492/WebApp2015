define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/menuTemplate.html'
], function ($, _, Backbone, menuTemplate) {
    var AppView = Backbone.View.extend({
        el: '.menu',
        render: function () {
            var that = this;
            $(this.el).html(menuTemplate);
            if($.cookie('token') == undefined){
                $('#watchlist-link').remove();
                $('#search-bar').remove();
                $('.input-group-btn').remove();
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
