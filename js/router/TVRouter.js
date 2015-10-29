var app = app || {};

$(function(){

    var RouterTvShows = Backbone.Router.extend({
       routes: {
           "": "home"
       },

       home: function(){
        console.log("this is home");
       }

    });



})