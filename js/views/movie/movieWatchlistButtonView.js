/**
 * Created by Gabriel on 2015-11-05.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieWatchlistButtonTemplate.html',
    'models/watchlist'
], function($, _, Backbone, MovieWatchlistButtonTemplate, Watchlist){
    var MovieWatchlistButtonView = Backbone.View.extend({
        template : _.template(MovieWatchlistButtonTemplate),
        el: ".watchlist-button",

        initialize: function(id){
            this.watchlist = new Watchlist({});
            this.movieId = id;
        },

        render: function(){
            var that = this;
            this.watchlist.fetch({
                success: function(response){

                    var retour = {"movieId" : that.movieId, "response" : response.toJSON()};
                    console.log(retour);
                    that.$el.html(that.template({watchlists: retour}));
                }
            });

        }
    });
    return MovieWatchlistButtonView;
});