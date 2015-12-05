define([
    'jquery',
    'underscore',
    'backbone',
    'sweetalarm',
    'text!templates/movie/movieTrailerTemplate.html',
    'models/movie',
    'models/youtube',
    '../errorHandler'
], function($, _, Backbone, swal, MovieTrailerTemplate, Movie, YoutubeMovie){
    var MovieTrailerView = Backbone.View.extend({
        template : _.template(MovieTrailerTemplate),
        el: ".movie-info-trailer",

        initialize: function(id){
            this.movie = new Movie({"trackId" : id});
        },

        render: function(){
            var that = this;
            this.movie.fetch({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', $.cookie('token'));
                },
                success: function(response){
                    var movie = response.toJSON();
                    this.youtube = new YoutubeMovie({"movieTitle": movie[0].trackName});
                    this.youtube.fetch({
                        success: function(response){
                            var movie = response.toJSON();
                            that.$el.html(that.template({youtube: "http://www.youtube.com/watch_popup?v=" + movie.items[0].id.videoId}));
                        }
                    });
                },
                error: function(ret, jqXHR){
                    showError(jqXHR.status);
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