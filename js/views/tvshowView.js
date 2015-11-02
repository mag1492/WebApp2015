var app = app || {};

$(function(){

    app.tvShowView = Backbone.View.extend({
        template : _.template($('#season-info-template').html()),
        el: ".seasonX-info",

        initialize: function(id){
          this.tvshow = new app.Season({"id": id});
        },

        render: function(){
            var that = this;
            this.tvshow.fetch({
                success: function(response){
                     that.$el.html(that.template({season: response.toJSON()}));
                }
            });
        }
    });
});