var app = app || {};

$(function() {

    var TvshowMainView = Backbone.View.extend({

        template : _.template($('#tvshow-main-template').html()),
        el: '.content',

        render: function(id) {
            this.$el.html(this.template());
            this.trailerEpisodeView = new app.trailerEpisodeView(id);
            this.tvShowView = new app.tvShowView(id);
            this.episodesView = new app.episodesView(id);

            this.$el.append(this.trailerEpisodeView.render());
            this.$el.append(this.tvShowView.render());
            this.$el.append(this.episodesView.render());
        }
    });

    app.tvShowMainView = new TvshowMainView();
});