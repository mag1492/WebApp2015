define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var Unfollow = Backbone.Model.extend({
        initialize: function(options){
            options || (options= {});
            this.url = 'https://umovie.herokuapp.com/follow/'+options.id;
        }

    });
    return Unfollow;
});