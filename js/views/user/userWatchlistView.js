define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/user/userWatchlistTemplate.html',
    'models/watchlist',
    '../errorHandler'
], function($, _, Backbone,swal, UserWatchlistTemplate, Watchlist){
    var WatchlistMainView = Backbone.View.extend({

        template : _.template(UserWatchlistTemplate),
        el: '.user-watchlist',

        initialize: function(id){
            this.watchlists = new Watchlist();
            this.userId = id;
        },

        render: function(){
            var that = this;
            this.watchlists.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    var watchlists = [];
                    var allWatchlist = response.toJSON();
                    for (var key in allWatchlist) {
                        if (allWatchlist.hasOwnProperty(key)) {
                            var owner = allWatchlist[key].owner;
                            if(owner != undefined){
                                if(owner.id == that.userId){
                                    watchlists.push(allWatchlist[key]);
                                }
                            }
                        }
                    }
                    that.$el.html(that.template({watchlists: watchlists}));
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
                }
            });
        }
    });

    return WatchlistMainView;
});