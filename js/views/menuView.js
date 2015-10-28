/**
 * Created by Gabriel on 2015-10-14.
 */
$(function() {

    MenuView = Backbone.View.extend({
        template : _.template($('#menu-template').html()),
        el: '.menu',
        render: function () {
            this.$el.html(this.template());
        }
    });
});