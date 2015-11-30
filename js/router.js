define([
    'jquery',
    'underscore',
    'backbone',
    'vm'
], function ($, _, Backbone, Vm) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'tvshow/:id': 'homeTVShow',
            'actor/:id': 'homeActor',
            'movie/:id': 'homeMovie',
            'watchlist': 'homeWatchlists',
            'watchlist/:id': 'homeOneWatchlist',
            'watchlist/:watchlistId/addMovie/:movieId' : 'addMovieToWatchlist',
            'watchlistNew': 'createNewWatchlist',
            'watchlistNew/:id': 'createNewWatchlist',
            'watchlist/:watchlistId/deleteMovie/:movieId' : 'deleteMovieFromWatchlist',
            'search/:searchField' : 'search',
            'signup':'signup',
            'user/:id' : 'user',
            'user/:id/following/:followerId' : 'follower',
            'login' : 'login',
            'follow/:id':'follow',
            'unfollow/:id/following/:followerId':'unfollow'
        }
    });

    var initialize = function(options){
        var appView = options.appView;
        var router = new AppRouter(options);
        router.on('route:home', function () {
            require(['views/homeView'], function (HomeView) {
                var homeView = Vm.create(appView, 'HomeView', HomeView);
                homeView.render();
            });
        });
        router.on('route:homeTVShow', function (id) {
            require(['views/tvshow/tvshowMainView'], function (TvShowMainView) {
                var tvShowView = Vm.create(appView, 'TvShowView', TvShowMainView);
                tvShowView.render(id);
            });
        });
        router.on('route:homeActor', function (id) {
            require(['views/actor/actorMainView'], function (ActorMainView) {
                var actorView = Vm.create(appView, 'ActorView', ActorMainView);
                actorView.render(id);
            });
        });
        router.on('route:homeMovie', function (id) {
            require(['views/movie/movieMainView'], function (MovieMainView) {
                var movieView = Vm.create(appView, 'MovieView', MovieMainView);
                movieView.render(id);
            });
        });
        router.on('route:homeWatchlists', function () {
            require(['views/watchlist/watchlistMainView'], function (WatchlistsMainView) {
                var watchlistsView = Vm.create(appView, 'WatchlistView', WatchlistsMainView);
                watchlistsView.render();
            });
        });
        router.on('route:homeOneWatchlist', function (id) {
            require(['views/watchlist/watchlistMovieView'], function (WatchlistMovieView) {
                var watchlistMovieView = Vm.create(appView, 'WatchlistMovieView', WatchlistMovieView, {id: id});
                watchlistMovieView.render();
            });
        });
        router.on('route:addMovieToWatchlist', function (watchlistId, movieId) {
            require(['views/movie/movieWatchListButtonView'], function (MovieWatchlistButtonView) {
                var movieWatchlistButtonView = Vm.create(appView, 'MovieWatchlistButtonView', MovieWatchlistButtonView, movieId);
                movieWatchlistButtonView.addMovie(watchlistId, movieId);
            });
        });
        router.on('route:createNewWatchlist', function (id) {
            require(['views/watchlist/createOrEditWatchlistView'], function (CreateWatchlistView) {
                var createWatchlistView = Vm.create(appView, 'CreateWatchlistView', CreateWatchlistView, {id: id});
                createWatchlistView.render();
            });
        });
        router.on('route:deleteMovieFromWatchlist', function (watchlistId, movieId) {
            require(['views/watchlist/watchlistMovieView'], function (WatchlistMovieView) {
                var watchlistMovieView = Vm.create(appView, 'MovieWatchlistButtonView', WatchlistMovieView, {watchlistId: watchlistId});
                watchlistMovieView.deleteMovie(watchlistId, movieId);
            });
        });
        router.on('route:search', function (searchField) {
            require(['views/search/searchMainView'], function (SearchMainView) {
                var searchMainView = Vm.create(appView, 'SearchMainView', SearchMainView);
                searchMainView.render(searchField);
            });
        });
        router.on('route:signup', function () {
            require(['views/signup/signupView'], function (SignupView) {
                var signupView = Vm.create(appView, 'SignUpView', SignupView);
                signupView.render();
            });
        });
        router.on('route:user', function (id) {
            require(['views/user/userMainView'], function (UserMainView) {
                var userMainView = Vm.create(appView, 'UserMainView', UserMainView,  {id: id});
                userMainView.render();
            });
        });
        router.on('route:login', function () {
            require(['views/signup/loginView'], function (LoginView) {
                var loginView = Vm.create(appView, 'LoginView', LoginView);
                loginView.render();
            });
        });
        router.on('route:follow', function (id) {
            require(['views/user/userMainView'], function (UserMainView) {
                var userMainView = Vm.create(appView, 'UserMainView', UserMainView,  {id: id});
                userMainView.addFollower();
            });
        });
        router.on('route:follower', function (id, followerId) {
            require(['views/user/userFollowerView'], function (UserFollowerView) {
                var userFollowerView = Vm.create(appView, 'UserFollowerView', UserFollowerView,  {id: id, followerId:followerId});
                userFollowerView.render();
            });
        });
        router.on('route:unfollow', function (id, followerId) {
            require(['views/user/userFollowerView'], function (UserFollowerView) {
                var userFollowerView = Vm.create(appView, 'UserFollowerView', UserFollowerView,  {id: id, followerId:followerId});
                userFollowerView.deleteFollower();
            });
        });
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
