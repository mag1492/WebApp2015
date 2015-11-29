define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/searchMainTemplate.html',
    'views/search/actorSearchView',
    'views/search/movieSearchView',
    'views/search/userSearchView',
    'views/search/tvSeasonSearchView'
], function($, _, Backbone, SearchMainTemplate, ActorSearchView, MovieSearchView, UserSearchView, TvSeasonSearchView){

    var SearchMainView = Backbone.View.extend({

        template : _.template(SearchMainTemplate),
        el: '.content',

        render: function (searchField) {
            this.$el.html(this.template());
            this.actorSearchView = new ActorSearchView(searchField);
            this.movieSearchView = new MovieSearchView(searchField);
            this.userSearchView = new UserSearchView(searchField);
            this.tvSeasonSearchView = new TvSeasonSearchView(searchField);

            this.$el.append(this.actorSearchView.render());
            this.$el.append(this.movieSearchView.render());
            this.$el.append(this.userSearchView.render());
            this.$el.append(this.tvSeasonSearchView.render());

        }
    });

    return SearchMainView;
});