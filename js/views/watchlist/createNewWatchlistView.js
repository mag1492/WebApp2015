define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/watchlist/createNewWatchlistTemplate.html',
    'models/watchlist'
], function($, _, Backbone, CreateNewWatchlistViewTemplate, Watchlist){
    var CreateNewWatchlistView = Backbone.View.extend({

        template : _.template(CreateNewWatchlistViewTemplate),
        el: '.content',

        events:{
            "click .createOrUpdate": "createOrUpdateWatchlist"
        },

        initialize:function(options){
            this.idIsUndefined = 'false';
            this.watchlistOption= 'none';

            if(typeof options.id != 'undefined'){
                this.watchlistOption = options.id.toString();
                console.log(this.watchlistOption);
                this.watchlist = new Watchlist({id: options.id});
            }
            else{
                this.idIsUndefined = 'true';
                this.watchlist = new Watchlist({id: null});
            }
        },

        render: function(){
            var that = this;
            if(this.idIsUndefined === 'false'){
                that.watchlist.fetch({
                    success: function(response){
                        that.$el.html(that.template({watchlist: response.toJSON()}));
                    },
                    error: function(){
                        alert("Error Not Found.\n The watchlist's id:" + that.watchlistOption + " was not found.");
                    }
                });
            }
            else{
                this.$el.html(this.template({watchlist: null}));
            }
        },

        createOrUpdateWatchlist: function(){
            var watchlistID = $("#id").val();

            if(typeof watchlistID != 'undefined'){
                var watchlist = {
                    name: $("#watchlistName").val(),
                    id: watchlistID
                };
            }
            else{
                var watchlist = {
                    name: $("#watchlistName").val()
                };
            }

            var  aWatchlist = new Watchlist();
            aWatchlist.save(watchlist, {
                success: function(){
                    console.log("Adding was a success!");
                    Backbone.history.navigate('watchlist', true);
                }
            });
        }
    });

    return CreateNewWatchlistView;
});