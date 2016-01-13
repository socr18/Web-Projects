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
});


        $('.calendar .calendar-wrap').each(function () {
            var sd = new Date($(this).find('.date-start').text());
            var strMonth = MPMonthsFull[sd.getMonth()];
            var newStrMonth = strMonth.slice(0,3);
            var strDate = sd.getDate();


            $(this).find('.date-start').html('<div class="cal-day">' + strDate + '</div><div class="cal-month">' + newStrMonth + '</div>' );
        });
$( document ).ready(function() {

    var a = $('.grant-logo');

    do $(a.slice(0,5)).wrapAll('<div class="large-12 medium-12 small-12 fleft" />');
    while((a = a.slice(5)).length>0)

    $('.mp-form-field-input input').keyup(function() {

        var incometotal =
            parseInt($('#government-grants_6358-1').val()) +
            parseInt($('#foundation-corporate-grants_6359-1').val()) +
            parseInt($('#united-way_6360-1').val()) +
            parseInt($('#individual-contributions_6361-1').val()) +
            parseInt($('#earned-income_6362-1').val()) +
            parseInt($('#interest-income_6363-1').val()) +
            parseInt($('#membership-income_6364-1').val()) +
            parseInt($('#inkind-support_6365-1').val()) +
            parseInt($('#other-income_6366-1').val());

        $('#total-income_6367-1').val(incometotal);

        var expensetotal =
            parseInt($('#salaries-wages_6369-1').val()) +
            parseInt($('#employee-benefits-taxes_6370-1').val()) +
            parseInt($('#total-personnel-costs_6371-1').val()) +
            parseInt($('#bank-investment-fees_6372-1').val()) +
            parseInt($('#depreciation-expense_6373-1').val()) +
            parseInt($('#equip-rental-maintenance_6374-1').val()) +
            parseInt($('#food-costs_6375-1').val()) +
            parseInt($('#fundraising-development-expenses_6376-1').val()) +
            parseInt($('#insurance-expense_6377-1').val()) +
            parseInt($('#marketing-advertising_6378-1').val()) +
            parseInt($('#postage-delivery_6379-1').val()) +
            parseInt($('#professional-development_6380-1').val()) +
            parseInt($('#professional-fees_6381-1').val()) +
            parseInt($('#rent-occupancy_6382-1').val()) +
            parseInt($('#supplies-materials_6383-1').val()) +
            parseInt($('#telephone-expense_6384-1').val()) +
            parseInt($('#travel-expense_6385-1').val()) +
            parseInt($('#other-expense_6386-1').val()) +
            parseInt($('#miscellaneous-expenses_6387-1').val()) +
            parseInt($('#non-personnel-costs_6388-1').val());


        $('#total-expenses_6389-1').val(expensetotal);

        var netotal = incometotal - expensetotal;

        $('#net-total_6391-1').val(netotal);

    });

});
