$( document ).ready(function() {

    $('#jointheteam .people').appendTo('.peepswrap');
    
    $('.people').each(function(i){
        if ( $(this).data('order') === '') {
            var numb = 100 + i;
            $(this).attr('data-order', numb);
        }
    });

    var $b = $('.peepswrap');

    $b.find('.people').sort(function (a, b) {
        return +a.getAttribute('data-order') - +b.getAttribute('data-order');
    })
    .appendTo( $b );

    $('.people').show();

    var a = $('.people');

    do $(a.slice(0,4)).wrapAll('<div class="row" />');   
    while((a = a.slice(4)).length>0);
    
    $('.people').each(function(){
        var elmt = $(this).attr("id");
        $(this).click(function() {
            $('.biowrap').hide();
            $(("." + elmt)).insertAfter( $(("#" + elmt)).closest(".row") ).slideDown();
            $('body').scrollTop($(this).offset().top + ($(this).height()/2));
        });
    });

    $('.biodetails.close').click(function() {
        $('.biowrap').hide();
    });
});
