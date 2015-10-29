var app = app || {};

$(function(){

    var SiliconS01 = new app.Season({"id" : "279175900"});

    var TVShowsView = Backbone.View.extend({
        template : _.template($('#season-info-template').html()),
        el: ".seasonX-info",
        model : SiliconS01,

        render: function(){
            var that = this;
            SiliconS01.fetch({
                success: function(response){
                     that.$el.html(that.template({season: response.toJSON()}));
                }
            });
        }
    });
    app.tvShowView = new TVShowsView();
});