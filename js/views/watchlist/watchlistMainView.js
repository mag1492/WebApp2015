define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/watchlist/watchlistsMainTemplate.html',
    'models/watchlist'
], function($, _, Backbone, WatchlistMainTemplate, Watchlist){
    var WatchlistMainView = Backbone.View.extend({

        template : _.template(WatchlistMainTemplate),
        el: '.content',

        initialize: function(id){
            this.watchlists = new Watchlist();
        },

        render: function(){
            var that = this;
            this.watchlists.fetch({
                success: function(response){
                    that.$el.html(that.template({watchlists: response.toJSON()}));
                }
            });
        },
    });

   return WatchlistMainView;
});