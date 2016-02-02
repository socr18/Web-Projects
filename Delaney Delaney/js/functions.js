var alwaysAlertExceptions = true;
var playing = false;

// Utility function used by replaceAll that does a global find and replace
function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

// Finds all instances of a string and replaces them with the supplied value
function replaceAll(string, find, replace) {
    if (string != null) {
        return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }
    else {
        return null;
    }
}

String.prototype.replaceAll = function (find, replace) {
    return replaceAll(this, find, replace);
}

// Generic error function that will be called in the event that an error occurs during processing of an AJAX request
function JSError(result) {
    debugger;
    console.log(result);
    LogJSException(result.responseText == null ? result.statusText : result.responseText);
}

//This function will log the exception information to the database and will alert the user as requested
function LogJSException(e, doAlert) {
    try {
        debugger;
        var callingMethod = "N/A";
        if (LogJSException.caller != null) {
            callingMethod = LogJSException.caller.name;
        }

        var jsFile = document.currentScript == null ? "" : document.currentScript.src;

        var data = {
            exception: window.location + "\r\n" + e.message + "\r\n" + e.stack,
            methodName: callingMethod,
            fileName: jsFile
        };

        if (doAlert || alwaysAlertExceptions) {
            alert("One or more errors occurred in method: " + callingMethod + "\r\nError(s): \r\n" + e);
        }
    }
    catch (ex) {
        alert(ex);
    }
}

// This combines the standard AJAX parameters into a common method that only takes the dynamic fields
function GenericAJAXRequest(data, url, usePost, successMethod, errorMethod, async, dataType) {
    try {
        if (async == null) {
            async = true;
        }

        //AJAX request
        $.ajax({
            url: url,
            type: (usePost ? 'POST' : 'GET'),
            async: async,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            dataType: dataType == null ? "json" : dataType,
            crossDomain: true,
            success: successMethod,
            error: errorMethod
        });
    }
    catch (e) {
        LogJSException(e);
    }
}

function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

function getFormattedDate(duration) {
    var d = Date.now();

    d += duration;

    d = new Date(d);

    var h = addZero(d.getHours(), 2);
    var m = addZero(d.getMinutes(), 2);
    var s = addZero(d.getSeconds(), 2);
    var ms = addZero(d.getMilliseconds(), 3);

    return (h % 12) + ":" + m + ":" + s + ":" + ms + (h > 12 ? " PM" : " AM");
}

var soundHandle;

function GetNextSound() {
    try {
        GenericAJAXRequest({}, "SoundLoader.aspx/GetNextSound", true, ProcessSound, JSError, false);
    }
    catch (ex) {
        LogJSException(ex);
    }
}

function ProcessSound(response) {
    try {
        if (response != null) {
            var url = response.d.FilePath;
            var duration = response.d.NextDuration;
            console.log(response);
            console.log("File Path: " + url);
            console.log("Duration: " + duration + "ms");
            //alert(url);

            if (url != "" && url != null) {
                var audio = PlayAudio(url);

                audio.onended = function () {
                    playing = false;
                    duration = duration / $("#Divisor").val();//Temporary
                    console.log("New Duration:" + duration + "ms");

                    $("#audio").append("<div><span>New Duration:</span> " + (duration / 1000) + "s @ " + getFormattedDate(duration) + "</div>");

                    soundHandle = setTimeout(function () { GetNextSound() }, duration);
                }

                //var startNext = function () {
                //    StopSounds();
                //    if (audio.ended) {
                //        duration = duration / 100;//Temporary
                //        console.log("New Duration:" + duration + "ms");

                //        soundHandle = setTimeout(GetNextSound(), duration);
                //    }
                //    else {
                //        //if (confirm("Wait some more?"))
                //        soundHandle = setTimeout(startNext, 10 * 1000);//Wait 10 seconds and try again
                //    }
                //}

                //startNext();
            }
            else {
                alert("No sound files were found");
            }
        }
        else {
            alert("Null response");
        }
    }
    catch (e) {
        //alert(e);
        LogJSException(e);
    }
}

function PlayOneSound(response) {
    try {
        if (!response) {
            GenericAJAXRequest({}, "SoundLoader.aspx/GetNextSound", true, PlayOneSound, JSError, false);
        }
        else {
            var audio = PlayAudio(response.d.FilePath);
            audio.onended = function () {
                playing = false;
            }
        }
    }
    catch (ex) {
        LogJSException(ex);
    }
}

function PlayAudio(url) {
    var audio = new Audio(url);
    try {
        StopSounds();

        if (!playing) {
            audio.play();
            playing = true;

            //$("#audio").click();
            //$("#audio").attr("src", url).trigger("play");
            //$("#audio").play();
        }
    }
    catch (e) {
        //alert(e);
        LogJSException(e);
    }

    return audio;
}

function StopSounds() {
    console.log("Sound Handle: " + soundHandle);

    if(soundHandle)
        for (var n = soundHandle - 10; n < soundHandle + 1; n++) {
            if(n > 0)
                clearTimeout(n);
    }
}
