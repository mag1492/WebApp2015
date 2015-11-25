define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/signup/signupTemplate.html'
], function($, _, Backbone, SignUpTemplate){
    var SignUpView = Backbone.View.extend({
        template : _.template(SignUpTemplate),
        el: ".content",

        initialize :function(){

        },

        render: function(){
            this.$el.html(this.template());

        },
        addMovie: function(watchlistId, movieId){
            var user = new User({trackId : movieId});
            user.save(movie.attributes[0], {
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                success:function(ret){
                    $('#myModal').modal('toggle');
                    window.location.replace('#/watchlist/'+watchlistId);
                }
            })
        }
    });
    return SignUpView;
});
