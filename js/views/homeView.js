var app = app || {};

$(function() {

    HomeView = Backbone.View.extend({

        template : _.template($('#home-template').html()),
        el: '.content',

        render: function () {
            this.$el.html(this.template());
            owlCarouselSetup();
        }
    });

    app.homeView = new HomeView();
});

function owlCarouselSetup() {

    $("#actors-carousel").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        autoHeight: false,
        autoPlay: 2000,
        stopOnHover: true
    });


    $("#recently-added-carousel").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        autoHeight: false,
        autoPlay: 2000,
        stopOnHover: true
    });

    var owl = $("#header-carousel");

    owl.owlCarousel({
        navigation: true,
        singleItem: true,
        transitionStyle: "fade"
    })
}

function goToRecentlyAdded(){
    document.location.href="#recently-added";
}