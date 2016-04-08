$(document).ready(function() {

     if (sessionStorage.firstVisit !== 'true') {
         // Stores visit
         $(window).scroll(function() {
              $('.popalert').slideDown(2000);
         });
     }

     $('.paclose').click(function() {
         sessionStorage.firstVisit = true;
         $('.popalert').hide();
         window.location = window.location.pathname;
     });

    $('.popalert').next().hide();

});
