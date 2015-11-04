define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow/tvShowMainTemplate.html',
    'views/tvshow/trailerEpisodeView',
    'views/tvshow/tvshowView',
    'views/tvshow/episodesView'
], function($, _, Backbone, TvShowMainTemplate, TrailerEpisodeView, TvShowView, EpisodesView){
    var TvshowMainView = Backbone.View.extend({

        template : _.template(TvShowMainTemplate),
        el: '.content',

        render: function(id) {
            this.$el.html(this.template());
            this.trailerEpisodeView = new TrailerEpisodeView(id);
            this.tvShowView = new TvShowView(id);
            this.episodesView = new EpisodesView(id);

            this.$el.append(this.trailerEpisodeView.render());
            this.$el.append(this.tvShowView.render());
            this.$el.append(this.episodesView.render());
        }
    });

    return TvshowMainView;
});