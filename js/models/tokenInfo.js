define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var TokenInfo = Backbone.Model.extend({
        initialize: function(options){
            options || (options= {});
            this.url = 'https://umovie.herokuapp.com/tokenInfo/';
        }

    });
    return TokenInfo;
});