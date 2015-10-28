/**
 * Created by Gabriel on 2015-10-27.
 */
$(function() {
    ChuckNorrisMovies = Backbone.Collection.extend({
        url : 'https://umovie.herokuapp.com/unsecure/actors/129377537/movies',
        parse: function(response) {
            return response.results;
        }
    });
});