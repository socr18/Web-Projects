</script>
<script src = "https://az480170.vo.msecnd.net/e2ce2d76-02ff-4ebc-8e64-519164387db4/docs/60591976-d94c-49ed-acd3-52ef4bfd281d/jquery.bxslider.js"></script>
<script>

var arr = [];
var filter = [];

function gallery(filter) {

    var success = function (data) {

        //data downloaded so we call parseJSON function
        //and pass downloaded data

        var json = $.parseJSON(data);
        arr = $.parseJSON(data);

        filter = 'strategy';

        for (var i = 0; i < json.length; i++) {

            //add images to gallery

            if (JSON.stringify(arr[i]['services']).indexOf(filter) > 0) {

                $('.bxslider2').append('<li data-order="' + arr[i]['strategy-sort'] + '"> <a href="' + json[i]['page-url'] + '"><h2>' + arr[i]['client-name'] + '</h2><img src="' + json[i]['website-url'] + '" alt="' + json[i]['client-name'] + '" /></a></li>');

                if (arr[i]['sort-industry'] > 0) {

                    $('.featured-logo').append('<div class="my-5 columns" data-order="' + arr[i]['sort-industry'] + '"><a href="/' + arr[i]['page-url'] + '"><img src="' + arr[i]['logo-url'] + '" alt="" /></a></div>');

                }

            }

        }

        var $slider = $('.bxslider2');

            $('.bxslider2 li').each(function(i){
                if ( $(this).data('order') === 'undefined' || $(this).data('order') === '' ) {
                    var numb = 100 + i;
                    $(this).attr('data-order', numb);
                }
            });

            $slider.find('li').sort(function (a, b) {
                return +a.getAttribute('data-order') - +b.getAttribute('data-order');
            })
            .appendTo($slider);

        var $logos = $('.featured-logo');

           $logos.find('div').sort(function (a, b) {
                return +a.getAttribute('data-order') - +b.getAttribute('data-order');
            })
            .appendTo($logos);

        $('.featured-logo div:gt(4)').remove();

        $('.bxslider2').bxSlider({
            auto: true,
                    mode: 'fade',
                    speed: 4000
        });

    }

    function successFilter(filter) {

        $('.bxslider2').empty();

        for (var i = 0; i < arr.length; i++) {

            //add images to gallery

            if (JSON.stringify(arr[i]['industry']).indexOf(filter) > 0) {

                $('.bxslider2').append('<li> <a href="' + arr[i]['page-url'] + '"><img src="' + arr[i]['website-url'] + '" alt="' + arr[i]['client-name'] + '" /><h2>' + arr[i]['client-name'] + '</h2></a></li>');
            }
        }

        $('.flex-area h2').empty();

        $('.service-detail.' + filter + ' h2').clone().insertAfter('.flex-area h1');

        $('.bxslider2').bxSlider({
            auto: true,
                    mode: 'fade',
                    speed: 4000
        });

    };

    if (arr == null || arr.length == 0) {

        //start ajax request

        $.ajax({
            url: "//mp-site.dynamic.marketpath.com/get/directory-data/4a743f66-194b-4ddb-aa5f-c148f51d55d8",
                     //force to handle it as text
                    dataType: "text",
                    success: success
        });
    }
    else {
        successFilter(filter);
    }

}

gallery();
