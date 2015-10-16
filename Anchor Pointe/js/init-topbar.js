$(window).scroll(function() {

    var scroll = $(this).scrollTop();

    if (scroll >= 100 || $(window).width() < 640) {
        $('.logo img').css('height', '75px');
        $('.logo img').css('width', 'auto');
        $('.fixed-menu-padding').slideUp();
        $('.default-menu .logo').css('padding','10px 0');
        $('.default-menu ul li').css('padding','22px 0');
        $('.default-menu ul ul').css('top','45px');
    } else {
        $('.logo img').removeAttr('style');
        $('.fixed-menu-padding').slideDown();
        $('.default-menu ul li a').removeAttr('style');
        $('.default-menu ul li').removeAttr('style');
        $('.default-menu ul ul').removeAttr('style');
    }
});
