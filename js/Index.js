$(document).ready(function() {

    $("#actors-carousel").owlCarousel({
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3],
        autoHeight: false,
        autoPlay: 2000,
        stopOnHover: true
    });

});

$(document).ready(function() {

    $("#recently-added-carousel").owlCarousel({
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3],
        autoHeight: false,
        autoPlay: 2000,
        stopOnHover: true
    });

});

$(document).ready(function() {

    var owl = $("#header-carousel");

    owl.owlCarousel({
        navigation : true,
        singleItem : true,
        transitionStyle : "fade"
    });
});

function redirect(){
    document.location.href="Index.html";
}