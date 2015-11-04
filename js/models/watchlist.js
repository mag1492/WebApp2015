define([
    'underscore',
    'backbone'
], function(_, Backbone){

    var Watchlist = Backbone.Model.extend({
        url: 'http://umovie.herokuapp.com/unsecure/watchlists'
    });

    return Watchlist
});