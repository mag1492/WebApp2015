define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var Follow = Backbone.Model.extend({
        initialize: function(options){
            options || (options= {});
                this.url = 'https://umovie.herokuapp.com/follow/';
        }

    });
    return Follow;
});