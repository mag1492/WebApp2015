define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/tvshow/seasonInfoTemplate.html',
    'models/season',
    '../errorHandler'
], function($, _, Backbone, swal, SeasonInfoTemplate, Season){
    var TvShowView = Backbone.View.extend({
        template : _.template(SeasonInfoTemplate),
        el: ".seasonX-info",

        initialize: function(id){
          this.tvshow = new Season({"id": id});
        },

        render: function(){
            var that = this;
            this.tvshow.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                     that.$el.html(that.template({season: response.toJSON()}));
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        }
    });
    return TvShowView;
});