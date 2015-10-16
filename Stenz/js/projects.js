$( document ).ready(function() {

    $('.project').each(function(i){
            if ( $(this).data('order') === '') {
                var numb = 100 + i;
                $(this).attr('data-order', numb);
            }
        });

  $('.project').sort(sorted).appendTo('.projectwrap');

  function sorted(a, b) {
            var aVal = parseInt(a.getAttribute('data-order'));
                bVal = parseInt(b.getAttribute('data-order'));
        return aVal -bVal;
    }

    $('.project').each( function() {
        var tes = $(this).data('category').split(',');
        for (i = 0; i < tes.length; i++) {
            $(this).addClass(tes[i]);
        }
    });
    
    $('.Commercial').show();

    $('.search').hover(function () {
       $('.searchwrap').show();
    });

    $('.searchclose').click(function() {
        $('.searchwrap').hide();
    });

});
