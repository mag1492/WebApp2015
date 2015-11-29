define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/tvshow/tvShowMainTemplate.html',
    'views/tvshow/trailerEpisodeView',
    'views/tvshow/tvshowView',
    'views/tvshow/episodesView',
    'views/tvshow/episodesPreviewView'
], function($, _, Backbone, TvShowMainTemplate, TrailerEpisodeView, TvShowView, EpisodesView, EpisodePreviewView){
    var TvshowMainView = Backbone.View.extend({

        template : _.template(TvShowMainTemplate),
        el: '.content',

        render: function(id) {
            this.$el.html(this.template());
            this.trailerEpisodeView = new TrailerEpisodeView(id);
            this.tvShowView = new TvShowView(id);
            this.episodesView = new EpisodesView(id);
            this.episodePreviewView = new EpisodePreviewView(id);

            this.$el.append(this.trailerEpisodeView.render());
            this.$el.append(this.tvShowView.render());
            this.$el.append(this.episodesView.render());
            this.$el.append(this.episodePreviewView.render());
        }
    });

    return TvshowMainView;
});