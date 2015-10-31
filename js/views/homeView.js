var app = app || {};

$(function() {

    HomeView = Backbone.View.extend({

        template : _.template($('#home-template').html()),
        el: '.content',

        render: function () {
            this.$el.html(this.template());
        }
    });

    app.homeView = new HomeView();
});