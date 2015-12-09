define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'models/tokenInfo',
    'text!templates/watchlist/watchlistsMainTemplate.html',
    'models/watchlist',
    '../errorHandler'
], function($, _, Backbone, swal, TokenInfo, WatchlistMainTemplate, Watchlist){
    var WatchlistMainView = Backbone.View.extend({

        template : _.template(WatchlistMainTemplate),
        el: '.content',

        initialize: function(id){
            this.watchlists = new Watchlist();
            this.tokenInfo = new TokenInfo();
        },

        render: function(){
            var that = this;
            this.watchlists.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    var watchlists = response.toJSON();
                    that.tokenInfo.fetch({
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Authorization', $.cookie('token'));
                        },
                        success: function(response){
                            var loggedUser = response.toJSON();
                            var loggedUserWatchlists = [];
                            for (var prop in watchlists) {
                                if (watchlists.hasOwnProperty(prop)) {
                                    if(typeof(watchlists[prop].owner) != 'undefined'){
                                        if(loggedUser.id == watchlists[prop].owner.id){
                                            loggedUserWatchlists.push(watchlists[prop]);
                                        }
                                    }
                                }
                            }
                            that.$el.html(that.template({watchlists: loggedUserWatchlists}));
                        },
                        error: function(ret, jqXHR){
                            showError(jqXHR.status);
                        }
                    });
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        },
    });

   return WatchlistMainView;
});