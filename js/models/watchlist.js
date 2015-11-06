define([
    'underscore',
    'backbone'
], function(_, Backbone){

    var Watchlist = Backbone.Model.extend({
        urlRoot: 'http://umovie.herokuapp.com/unsecure/watchlists'

    });

    return Watchlist
});