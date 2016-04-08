<script>

var arr = [];       

function roster() {
        
    var success = function (data) {        

        //data downloaded so we call parseJSON function
        //and pass downloaded data
              
        var json = $.parseJSON(data);        
        arr = $.parseJSON(data);
              
        for (var i = 0; i < json.length; i++) {        

            //add player and coaches to the roster

            if () {
 
                $('.upcoming-events').append('<div class="event"><div class="event-date"><div class="event-day">' + json[i]['StartDate'] + '</div><div class="event-time">' + json[i]['Tags']['StartTime'] + '</div></div><div class="event-detail"><div class="event-name">' + json[i]['Tags']['Gender'] + ' ' + json[i]['Tags']['Classes'] + ' ' + json[i]['Tags']['Sport'] + '</div><div class="event-location">@' + json[i]['Location'] + '</div></div></div>');

            }

        }
            
    }

    if (arr == null || arr.length == 0) {

       //start ajax request
              
        $.ajax({        
            url: "//aaosteopathy.blob.core.windows.net/warren/calendar/sports-all.json",
                     //force to handle it as text
                    dataType: "text",
                    success: success      
        });    
    }
      
}

roster();
</script>
