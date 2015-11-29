require.config({
    shim: {
        /* Set bootstrap dependencies (just jQuery) */
        'bootstrap' : ['jquery'],
        'owl': ['jquery']
    },
    paths: {
        // Major libraries
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
        backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
        bootstrap: 'libs/bootstrap/bootstrap',
        owl: 'libs/owl-carousel/owl.carousel',
        md5: 'libs/md5/jquery.md5',

        // Require.js plugins
        text: 'libs/require/text',

        templates: '../templates'
    }
});

require([
    'views/app',
    'router',
    'vm',
    'bootstrap',
    'owl'
], function(AppView, Router, Vm){
    var appView = Vm.create({}, 'AppView', AppView);
    appView.render();
    Router.initialize({appView: appView});
});

