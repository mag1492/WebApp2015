define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/homeTemplate.html',
    'owl'
], function($, _, Backbone, homeTemplate){

    var HomeView = Backbone.View.extend({

        el: '.content',

        render: function () {
            $(this.el).html(homeTemplate);
            owlCarouselSetup();
        }
    });

    return HomeView;
});

function owlCarouselSetup() {

    $("#actors-carousel").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        autoHeight: false,
        autoPlay: 2000,
        stopOnHover: true,
        rewindNav : true
    });


    $("#recently-added-carousel").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        autoHeight: false,
        autoPlay: 2000,
        stopOnHover: true,
        rewindNav : true
    });
}

function goToRecentlyAdded(){
    document.location.href="#recently-added";
}