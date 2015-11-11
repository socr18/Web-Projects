$(window).scroll(function() {

    var scroll = $(this).scrollTop();

    if (scroll >= 100 || $(window).width() < 640) {
        $('.logo img').css('height', '75px');
        $('.fixed-menu-padding').slideUp();
        $('.default-menu ul li').css('padding','22px 0');
        $('.default-menu ul li a').css('font-size','20px');
        $('.default-menu ul li:nth-child(4)').css('padding','0');
    } else {
        $('.logo img').removeAttr('style');
        $('.fixed-menu-padding').slideDown();
        $('.default-menu ul li a').removeAttr('style');
        $('.default-menu ul li').removeAttr('style');
    }
});
