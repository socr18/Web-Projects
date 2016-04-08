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

            if ((json[i]['level']) === '"V"') {
 
                $('#tab1').append('<div class="player-detail"><div class="player-no">' + json[i]['no'] + '</div><div class="player-name">' + json[i]['name'] + '</div><div class="player-grade">' + json[i]['grade'] + '</div><div class="player-position">' + json[i]['position'] + '</div><div class="player-height">' + json[i]['height'] + '</div><div class="player-weight">' + json[i]['weight'] + '</div></div>');

            } else if ((json[i]['level']) === 'JV') {
                    
                $('#tab2').append('<div class="player-detail"><div class="player-no">' + json[i]['no'] + '</div><div class="player-name">' + json[i]['name'] + '</div><div class="player-grade">' + json[i]['grade'] + '</div><div class="player-position">' + json[i]['position'] + '</div><div class="player-height">' + json[i]['height'] + '</div><div class="player-weight">' + json[i]['weight'] + '</div></div>');

            } else if ((json[i]['level']) === 'Freshman') {
                    
                $('#tab3').append('<div class="player-detail"><div class="player-no">' + json[i]['no'] + '</div><div class="player-name">' + json[i]['name'] + '</div><div class="player-grade">' + json[i]['grade'] + '</div><div class="player-position">' + json[i]['position'] + '</div><div class="player-height">' + json[i]['height'] + '</div><div class="player-weight">' + json[i]['weight'] + '</div></div>');

            } else if ((json[i]['level']) === 'Coach') {
                    
                $('#tab4').append('<div class="player-detail"><div class="player-name">' + json[i]['name'] + '</div><div class="player-position">' + json[i]['level'] + '</div></div>');

            }

        }
            
    }

    if (arr == null || arr.length == 0) {

       //start ajax request
              
        $.ajax({        
            url: "//mp-site.dynamic.marketpath.com/get/directory-data/4a743f66-194b-4ddb-aa5f-c148f51d55d8",
                     //force to handle it as text
                    dataType: "text",
                    success: success      
        });    
    }
      
}

roster();
</script>
