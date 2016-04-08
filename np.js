$(document).ready(function () {

    $('.bxslider').bxSlider({
                randomStart: true,
                controls: false
            });

    $('header .nav #Default').clone().appendTo('.leftside .nav');
    $('ul.login').clone().appendTo('.menu .tlogin');
    $('.importantinfo ul').clone().appendTo('.sitemap .nav');

    $(".leftside nav ul li a").each(function (i) {
        var linkref = $(this).attr('href');
        if ( linkref.indexOf(window.location.href) === 0) {
            $(this).parent().children().show();
            $(this).parent().parent().show();
            $(this).parent().parent().parent().addClass('nactive');
        }
    });

    $('.drop .question:empty').parent().hide();

            $('.leftside nav .nav ul li').click(function() {
                if ($(this).hasClass('nactive') == false) {
                    $(this).addClass('nactive');
                    $(this).children().show();
                } else {
                    $(this).removeClass('nactive');
                    $(this).children('ul').hide();
                }
            });

            $('.atm').click(function() {
                if ($(this).hasClass('activedrop') == false) {
                    $(this).addClass('activedrop');
                    $(this).children('.answer').show();
                } else {
                    $(this).removeClass('activedrop');
                    $(this).children('.answer').hide();
                }
            });

            $('.emailtexts').click(function() {
                if ($(this).hasClass('activedrop') == false) {
                    $(this).addClass('activedrop');
                    $(this).children('.answer').show();
                } else {
                    $(this).removeClass('activedrop');
                    $(this).children('.answer').hide();
                }
            });

            $('.estatements').click(function() {
                if ($(this).hasClass('activedrop') == false) {
                    $(this).addClass('activedrop');
                    $(this).children('.answer').show();
                } else {
                    $(this).removeClass('activedrop');
                    $(this).children('.answer').hide();
                }
            });

            $('.online').click(function() {
                if ($(this).hasClass('activedrop') == false) {
                    $(this).addClass('activedrop');
                    $(this).children('.answer').show();
                } else {
                    $(this).removeClass('activedrop');
                    $(this).children('.answer').hide();
                }
            });

            $('.debit').click(function() {
                if ($(this).hasClass('activedrop') == false) {
                    $(this).addClass('activedrop');
                    $(this).children('.answer').show();
                } else {
                    $(this).removeClass('activedrop');
                    $(this).children('.answer').hide();
                }
            });

            $('.checking').click(function() {
                if ($(this).hasClass('activedrop') == false) {
                    $(this).addClass('activedrop');
                    $(this).children('.answer').show();
                } else {
                    $(this).removeClass('activedrop');
                    $(this).children('.answer').hide();
                }
            });

    /* Login Pop-up Styles */
    $('.logint-old').hover(function(){
      $('.framepopup').addClass('hover');
    });

    $('.logint-old,.framepopup').mouseleave(function(){
      $(this).removeClass('hover');
    });

    /* Adding Sandbox Attribute to Iframe for mobile to stop redirect */

    var isMobile = window.matchMedia("only screen and (max-width: 767px)");

    if (isMobile.matches) {
        $('.framepopup iframe').attr('sandbox',' ');
    }

    /* Pop up message for leaving the site */
     $("a").each(function (i) {
                    var linkref = $(this).attr('href');
                    if (linkref) {
                      if (linkref.indexOf("http://www.northparkccu.org/") < 0 && linkref.indexOf("https://www.itsme247.com/") < 0 && linkref != "https://internetloanapplication.cudl.com/npccu/") {
                            $(this).click(function () { console.log('linkref.indexOf("http://www.northparkccu.org/")') });
                        }
                    }
     });
});

/* Message for pop for leaving the site */
function confirmation() {
var msg = "Please Note:You are now leaving northparkccu.org. Thank you for visiting. NorthPark Community Credit Union provides links to third-party websites as an opportunity for our members. NorthPark Community Credit Union has no responsibility for nor does it control, endorse or guarantee any aspect of your use of this linked site. Sites may have different privacy, security and accessibility standards. Please review their terms and conditions, and privacy and security policies."

return confirm(msg);
}
