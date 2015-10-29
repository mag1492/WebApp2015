/**
 * Created by Gabriel on 2015-10-27.
 */
$(function() {
    Actor = Backbone.Model.extend({
        urlRoot : 'https://umovie.herokuapp.com/unsecure/actors',
        parse: function(response) {
            return response.results;
        }
    });
});