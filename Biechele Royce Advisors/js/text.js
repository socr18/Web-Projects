 $(document).ready(function () {
     $('#Default > ul').addClass('levelone');

     $('ul.levelone > li').append('<div class="mblock"></div>');

     if (sessionStorage.firstVisit === 'true') {
         // Stores visit
         $('.popout').hide();
     } else {
         $('.popout').delay(1000).fadeIn(500);
     }

     $('.close').click(function() {

         sessionStorage.firstVisit = true;

         $('.popout').hide();
     });

     $('nav .intouch').click(function(){
         $('.popout').show();
     });

     $('.prjctimg').has('img').show();

     var iheight = $('.active a img').height();

     $('.slideshow').css('height', iheight + 107);

 });

$( window ).resize(function() {
    var iheight = $('.active a img').height();
    $('.slideshow').css('height', iheight + 107);
 });


$( document ).ready(function () {
    $( '.pagination li' ).eq(0).addClass('active');

    // hover over effects for home page slides - show active slide
    $( '.pagination li' ).eq(0).hover(
        function() {
            $('.slideset li').removeClass('active');
            $('.slideset li:nth-child(1)').addClass('active');
        }, function() {}
    );

    $( '.pagination li' ).eq(1).hover(
        function() {
            $('.slideset li').removeClass('active');
            $('.slideset li:nth-child(2)').addClass('active');
        }, function() {}
    );

    $( ".pagination li" ).eq(2).hover(
        function() {
            $('.slideset li').removeClass('active');
            $('.slideset li:nth-child(3)').addClass('active');
        }, function() {}
    );

    $( '.pagination li' ).hover(
        function() {
            $('.pagination li').removeClass('active');
            $( this ).addClass('active');
            $('.slideset li').hide();
            $('.slideset li.active').fadeIn('slow');
        }, function() {}
    );


if (document.cookie.indexOf('wauguid') != -1) {
$('.memberslogin').show();
$('.memberslogout').hide();
 }

if (document.cookie.indexOf('wauguid') >= 0) {
$('.memberslogout').show();
}

        });


function deleteCookies() {

   var allcookies = document.cookie.split(";");

   for (var i = 0; i < allcookies.length; i++) {
        var cookie = allcookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    window.location.replace("/");

}
});
