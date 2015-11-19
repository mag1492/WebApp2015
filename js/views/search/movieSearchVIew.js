/**
 * Created by Gabriel on 11/19/2015.
 */
define([
    '../../libs/jquery/jquery-min',
    'underscore',
    'backbone',
    'text!templates/search/moviesResultTemplate.html',
    '../../collections/searchResult/moviesResult'
], function($, _, Backbone, MoviesResultTemplate, MovieResult){
    var MovieSearchView = Backbone.View.extend({
        template : _.template(MoviesResultTemplate),
        el: ".movie-result",

        initialize: function(searchField){
            this.movies = new MovieResult({"searchField" : searchField});

        },

        render: function(){
            var that = this;
            console.log('render movie view debut');

            this.movies.fetch({
                success: function(response){
                    that.$el.html(that.template({movies: response.toJSON()}));
                    console.log('render movie view fin');

                }
            });
        }
    });
    return MovieSearchView;
});