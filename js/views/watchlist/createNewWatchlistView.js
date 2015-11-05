define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/watchlist/createNewWatchlistTemplate.html',
    'models/watchlist'
], function($, _, Backbone, CreateNewWatchlistView, Watchlist){
    var CreateNewWatchlistView = Backbone.View.extend({

        template : _.template(CreateNewWatchlistView),
        el: '.content',

        initialize:function(options){
            this.optionsIdUndefined = 'false';
            if(typeof options.id != 'undefined'){
                this.watchlist = new Watchlist({id: options.id});
            }
            else{
                console.log("options is undefined");
                this.optionsIdUndefined = 'true';
                this.watchlist = new Watchlist({id: null});
            }
        },

        render: function(){
            var that = this;
            if(this.optionsIdUndefined === 'true'){
                this.$el.html(this.template({watchlist: null}));
            }
            else{
                that.watchlist.fetch({
                    success: function(response){
                        that.$el.html(that.template({watchlist: response.toJSON()}));
                    }
                });
            }

        }
    });

    return CreateNewWatchlistView;
});