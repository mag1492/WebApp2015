require.config({
    paths: {
        // Major libraries
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
        backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
        'bootstrap': 'libs/bootstrap/bootstrap',

        // Require.js plugins
        text: 'libs/require/text',

        templates: '../templates'
    },
    shim: {
        /* Set bootstrap dependencies (just jQuery) */
        'bootstrap' : ['jquery']
    }

});

require([
    'views/app',
    'router',
    'vm'
], function(AppView, Router, Vm){
    var appView = Vm.create({}, 'AppView', AppView);
    appView.render();
    Router.initialize({appView: appView});
});

