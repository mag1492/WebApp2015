var app = app || {};

$(function() {
    app.Actor = Backbone.Model.extend({
        urlRoot : 'https://umovie.herokuapp.com/unsecure/movies',
        parse: function(response) {
            return response.results;
        }
    });
});
