var app = app || {};

$(function() {

    MenuView = Backbone.View.extend({

        template : _.template($('#menu-template').html()),
        el: '.menu',

        render: function () {
            this.$el.html(this.template());
        }
    });

    app.menuView = new MenuView();
});