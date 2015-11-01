var app = app || {};

$(function() {

    var TvshowMainView = Backbone.View.extend({

        template : _.template($('#tvshow-main-template').html()),
        el: '.content',

        render: function (id) {

        }
    });

    app.tvShowMainView = new TvshowMainView();
});