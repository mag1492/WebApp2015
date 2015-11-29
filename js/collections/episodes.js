define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var Episodes = Backbone.Collection.extend({

        initialize: function(options){
            options || (options= {});
            if(options.seasonId){
                this.seasonId = options.seasonId;
                this.url = 'https://umovie.herokuapp.com/unsecure/tvshows/season/'+ options.seasonId +'/episodes';
            }
        },

        parse: function(response){
            response.results.forEach(function (episode){
                var timeMilli = episode.trackTimeMillis,
                    min = (timeMilli/1000/60) << 0,
                    sec = (timeMilli/1000) % 60;
                episode.trackTimeMillis = min + " min";
            });

            return response.results;
        }
    });
    return Episodes;
});