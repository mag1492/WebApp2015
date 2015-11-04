define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow/seasonInfoTemplate.html',
    'models/season'
], function($, _, Backbone, SeasonInfoTemplate, Season){
    var TvShowView = Backbone.View.extend({
        template : _.template(SeasonInfoTemplate),
        el: ".seasonX-info",

        initialize: function(id){
          this.tvshow = new Season({"id": id});
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
    return TvShowView;
});