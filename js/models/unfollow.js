define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var Unfollow = Backbone.Model.extend({
        initialize: function(options){
            this.id = options.id;
            this.url = 'https://umovie.herokuapp.com/follow/'+options.followerId;
        }

    });
    return Unfollow;
});