    /* Pop up message for leaving the site */
     $("a").each(function (i) {
                    var linkref = $(this).attr('href');
                    if (linkref) {

                      if ( (linkref.indexOf("http://www.northparkccu.org/") < 0 ) && (linkref.indexOf("https://www.itsme247.com/") < 0) && (linkref != "https://internetloanapplication.cudl.com/npccu/")) {
                            $(this).click(function () { return confirmation(); });
                        }
                    }
     });

/* Message for pop for leaving the site */
function confirmation() {
var msg = "Please Note:You are now leaving northparkccu.org. Thank you for visiting. NorthPark Community Credit Union provides links to third-party websites as an opportunity for our members. NorthPark Community Credit Union has no responsibility for nor does it control, endorse or guarantee any aspect of your use of this linked site. Sites may have different privacy, security and accessibility standards. Please review their terms and conditions, and privacy and security policies."




return confirm(msg);
}

