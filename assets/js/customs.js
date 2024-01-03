$(document).ready(function() {
    var swiper = new Swiper(".label-slider", {
        spaceBetween: 0,
        slidesPerView: "auto",
        freeMode: false,
        watchSlidesProgress: false,
        // simulateTouch: false
    });
    var swiper2 = new Swiper(".content-slider", {
        autoHeight: true,
        spaceBetween: 0,
        navigation: false,
        thumbs: {
            swiper: swiper,
        },

    });
    $('.menu-toggle').click(function() {
        $('.main-menu ul').toggleClass('show');
    });
    $('.head-search-toggle').click(function() {
        $('.head-search-form').toggleClass('show');
    });

    $(document).on('click', function(event) {

        if (!$(event.target).closest('.head-search-form').length && !$(event.target).closest('.main-menu').length) {

            $('.head-search-form').removeClass('show');
        };
        if (!$(event.target).closest('.main-menu').length && !$(event.target).closest('.main-menu').length) {

            $('.main-menu ul').removeClass('show');
        };

    });
});