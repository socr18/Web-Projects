</script>
<script src="https://az480170.vo.msecnd.net/e2ce2d76-02ff-4ebc-8e64-519164387db4/docs/60591976-d94c-49ed-acd3-52ef4bfd281d/jquery.bxslider.js" ></script>
<script>
    var arr = [];
    var filter = [];
           
    function gallery(filter) {


        var success = function(data) {
   
            //data downloaded so we call parseJSON function
            //and pass downloaded data
            var json = $.parseJSON(data);
                arr = $.parseJSON(data);

            for( var i = 0; i < json.length; i++) {
                //console.log(json);
                //add images to gallery
                $('.bxslider2').append('<li> <a href="' + json[i]['page-url'] + '"><img src="' + json[i]['website-url'] + '" alt="' + json[i]['client-name'] + '" /> </a></li>');
            }

            $('.bxslider2').bxSlider({
                auto: true,
                mode: 'fade',
                speed: 4000
            });

        }

        function successFilter(filter) {

            $('.bxslider2').empty();

            for( var i = 0; i < arr.length; i++) {
               
                //add images to gallery
                if (JSON.stringify(arr[i]['industry']).indexOf(filter) > 0) {

                    $('.bxslider2').append('<li> <a href="' + arr[i]['page-url'] + '"><img src="' + arr[i]['website-url'] + '" alt="' + arr[i]['client-name'] + '" /> </a></li>');
                }
            }

            $('.flex-area h1').empty();

            $('.service-detail.' + filter + ' h2')html().clone().appendTo('.flex-area h1');

            $('.bxslider2').bxSlider({
                auto: true,
                mode: 'fade',
                speed: 4000
            });

        };


        if ( arr == null || arr.length == 0 ) {

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

$(document).ready(function () {
    $('.bxslider').bxSlider({
        auto: false,
        mode: 'horizontal',
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 1
    });
});

