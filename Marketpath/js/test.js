<script src="https://az480170.vo.msecnd.net/e2ce2d76-02ff-4ebc-8e64-519164387db4/docs/60591976-d94c-49ed-acd3-52ef4bfd281d/jquery.bxslider.js" ></script>
<script>
    var arr = [];

$(document).ready(function () {
            $('.bxslider').bxSlider({
                auto: false,
                mode: 'horizontal',
                minSlides: 3,
                maxSlides: 3,
                moveSlides: 1
            });

            function gallery(filter) {

                var success = function(data) {

                        //data downloaded so we call parseJSON function
                        //and pass downloaded data
                            var json = $.parseJSON(data);
                            for( var i = 0; i < json.length; i++) {
                                //console.log(json);
                                //now json variable contains data in json format
                                //let's display a few items
                                $('.bxslider2').append('<li> <a href="' + json[i]['page-url'] + '"><img src="' + json[i]['website-url'] + '" alt="' + json[i]['client-name'] + '" /> </a></li>');
                            }

                            $('.bxslider2').bxSlider({
                                auto: true,
                                mode: 'fade',
                                speed: 4000
                            });
                        };

                var successFilter = function (data,filter) {

                        //data downloaded so we call parseJSON function
                        //and pass downloaded data

                            var json = $arr.parseJSON(data);
                            for( var i = 0; i < arr.length; i++) {
                                console.log(filter);
                                console.log(arr);s
                                //now json variable contains data in json format
                                //let's display a few items
                                 $('.bxslider2').append('<li> <a href="' + json[i]['page-url'] + '"><img src="' + json[i]['website-url'] + '" alt="' + json[i]['client-name'] + '" /> </a></li>');
                            }

                            $('.bxslider2').bxSlider({
                                auto: true,
                                mode: 'fade',
                                speed: 4000
                            });
                        };

                if ( arr == null || arr.length == 0 )
                    {
                //start ajax request
                    $.ajax({
                        url: "//mp-site.dynamic.marketpath.com/get/directory-data/4a743f66-194b-4ddb-aa5f-c148f51d55d8",
                        //force to handle it as text
                        dataType: "text",
                        success: success
                    });
                    }
                else{
                    successFilter(filter);
                }

            }

            gallery();
});
</script>
