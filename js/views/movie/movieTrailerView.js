define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movie/movieTrailerTemplate.html',
    'models/movie',
    'models/youtube'
], function($, _, Backbone, MovieTrailerTemplate, Movie, YoutubeMovie){
    var MovieTrailerView = Backbone.View.extend({
        template : _.template(MovieTrailerTemplate),
        el: ".movie-info-trailer",

        initialize: function(id){
            this.movie = new Movie({"trackId" : id});
        },

        render: function(){
            var that = this;
            this.movie.fetch({
                success: function(response){
                    var movie = response.toJSON();
                    this.youtube = new YoutubeMovie({"movieTitle": movie[0].trackName});
                    this.youtube.fetch({
                        success: function(response){
                            var movie = response.toJSON();
                            that.$el.html(that.template({youtube: "http://www.youtube.com/v/" + movie.items[0].id.videoId}));
                        }
                    });
                }
            });
        },

        searchTrailer: function() {
        var q = $('#query').val();
        var request = gapi.client.youtube.search.list({
            q: q,
            part: 'snippet'
        });

        request.execute(function(response) {
            var str = JSON.stringify(response.result);
            $('#search-container').html('<pre>' + str + '</pre>');
        });
        }

    });
    return MovieTrailerView;
});