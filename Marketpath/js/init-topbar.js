$(window).scroll(function() {

    var scroll = $(this).scrollTop();

    if (scroll >= 100 || $(window).width() < 640) {
        $('.logo img').css('height', '55px');
        $('.logo img').css('padding', '10px 0');
        $('.topmenu').css('background','#122355');
        $('.fixed-menu-padding').slideUp();
        $('.default-menu ul li').css('padding','18px 0');
        $('.default-menu ul li a').css('font-size','18px');
        $('.search').css('padding','20px 0 0 0');
    } else {
        $('.logo img').removeAttr('style');
        $('.topmenu').removeAttr('style');
        $('.fixed-menu-padding').slideDown();
        $('.default-menu ul li a').removeAttr('style');
        $('.default-menu ul li').removeAttr('style');
        $('.search').removeAttr('style');
    }
});
