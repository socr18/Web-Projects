var jqxhr = $.getJSON("http://stenz.dynamic.marketpath.com/get/directory-data/c1bd67ee-7a07-4ce9-97a7-6b0ea615b5f7", function (data) {
            
    $.each(data,function(i,val){
        if(val.category == 'Commercial') {
            console.log( data[i]["company"] + " " + data[i].category);
        }
    });
})
    
          .done(function(data) {
              console.log(data);
          })
          .fail(function() {
              console.log( "error" );
          })
          .always(function() {
              console.log( "complete" );
          });
