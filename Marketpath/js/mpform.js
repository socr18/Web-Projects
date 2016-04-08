//# sourceMappingURL=MPForm.min.js.map
var mpFormSubmitPressed = !1,
    mpFormKeyPressTimeoutID = null,
    mpFormValidationID = "";
$(document).ready(function () {
    jQuery.validator.setDefaults({
        submitHandler: function (n) {
            var t = $("#inputCaptcha_" + n.id);
            $.when(t.length > 0 ? CheckCaptchaAJAX(t.val()) : {}).done(function (i) {
                t.length > 0 && i.d.length > 0 ? ($('<div class="mp-form-error-message-title">Please correct the following before continuing:<\/div>').appendTo("#" + n.id + " .mp-form-error-message"), $('<div class="mp-form-error-message-body"><\/div>').html(i.d).appendTo("#" + n.id + " .mp-form-error-message"), $("#imgCaptcha_" + n.id).length > 0 && ($("#imgCaptcha_" + n.id).attr("src", $("#inputCaptchaURL_" + n.id).val().replace("%%DATE-TICKS%%", (new Date).getTime())), t.val(""))) : n.submit()
            })
        },
        debug: !0,
        ignoreTitle: !0,
        errorContainer: ".mp-form-error-message",
        errorLabelContainer: ".mp-form-error-message .mp-form-error-message-body",
        errorClass: "mp-form-field-validation-error",
        errorElement: "div"
    });
    jQuery.validator.addMethod("captcha", function (n, t) {
        return this.optional(t) || $.ajax({
            url: MPRootURL + "ajax/BasePage.aspx/MatchCaptcha",
            data: JSON.stringify({
                strCaptcha: n
            })
        })
    }, "Sorry, you passed an invalid code. Please try again.");
    $("div > form[name]").validate();
    $("div > form[name]").each(function () {
        $(this).attr("action", $(this).find('input[name="posturi"]').val())
    })
});

//My stupid shit

$('form').each(function() {
    $(this).click(function() {
        $('input[type='submit']').attr('disabled','disabled');
        $(this).removeAttr('disabled');
        $(this).submit();
    });
  });

$("input[type='submit']").click(function (btn) {
    var btn = $(btn.target);
    var form = btn.attr("form");
    $("input[form!='" + form + "'][type='submit']").attr("disabled", true).each(alert(this.id));
});

/*
//# sourceMappingURL=MPUtilities.min.js.map
*/

function MPDeleteCookie(n, t, i) {
    MPGetCookie(n) && (document.cookie = n + "=" + (t ? ";path=" + t : "") + (i ? ";domain=" + i : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT")
}

function MPGotoPreviousPage() {
    MPPagingActive && MPPagingIndex > 1 && MPGotoPage(MPPagingIndex - 1)
}

function MPGotoNextPage() {
    MPPagingActive && MPPagingIndex < MPPagingTotalPages && MPGotoPage(MPPagingIndex + 1)
}

function MPGotoPage(n) {
    if (MPPagingActive && n >= 1 && n <= MPPagingTotalPages) {
        var i = new RegExp("/pg/\\d+$"),
            t = window.location.href;
        t = t.replace(i, "");
        window.location.href = t + "/pg/" + n
    }
}

function MPGlobalSearch(n, t, i, r) {
    var f = "",
        u;
    r && (f = "/" + r);
    t ? (u = MPRootURL + "search/" + encodeURI(t) + f + "?s=" + encodeURIComponent(n), i && (u = u + "&bytype=" + i), window.location.replace(u)) : window.location.assign(MPRootURL + "search/global" + f + "?s=" + encodeURIComponent(n))
}

function MPSendContactListEntryForm(n, t, i) {
    var r = "";
    $("#FormFieldInputName").val().length === 0 && (r += "   Name\n");
    IsValidEmail($("#FormFieldInputEmailAddress").val()) || (r += "   Valid Email Address\n");
    $("#FormFieldInputComments").val().length === 0 && (r += "   Comments\n");
    r.length === 0 ? $.ajax({
        url: MPRootURL + "ajax/BasePage.aspx/SendForm",
        data: JSON.stringify({
            intContactListEntryID: n,
            strRootURL: t,
            strIPAddress: i,
            strNameFrom: $("#FormFieldInputName").val(),
            strEmailAddress: $("#FormFieldInputEmailAddress").val(),
            strPhone: $("#FormFieldInputPhone").val(),
            strComments: $("#FormFieldInputComments").val()
        })
    }).done(function () {
        $("#ContactForm").html('<div id="ContactFormThankYou">Thank you. Your form was submitted successfully.<\/div>')
    }).fail(function () {
        alert("Sorry, there was an error submitting your form.")
    }) : alert("Please provide the following information:\n\n" + r)
}

function MPSendContactListEntryForm_callback() {
    $("#ContactForm").html('<div id="ContactFormThankYou">Thank you. Your form was submitted successfully.<\/div>')
}

function CheckCaptchaAJAX(n) {
    return $.ajax({
        url: MPRootURL + "ajax/BasePage.aspx/MatchCaptcha",
        data: JSON.stringify({
            strCaptcha: n
        })
    })
}

function IsValidEmail(n) {
    var t = new RegExp(/^([\!#\$%&'\*\+/\=?\^`\{\|\}~a-zA-Z0-9_-]+[\.]?)+[\!#\$%&'\*\+/\=?\^`\{\|\}~a-zA-Z0-9_-]+@{1}((([0-9A-Za-z_-]+)([\.]{1}[0-9A-Za-z_-]+)*\.{1}([A-Za-z]){1,6})|(([0-9]{1,3}[\.]{1}){3}([0-9]{1,3}){1}))$/i);
    return t.test(n)
}

function MPQueryString(n) {
    n = n.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var i = "[\\?&]" + n + "=([^&#]*)",
        r = new RegExp(i),
        t = r.exec(window.location.href);
    return t === null ? "" : t[1]
}

function _mpPing() {
    try {
        MPVisitorGUID || (MPVisitorGUID = MPGetCookie("MPVisitorGUID"));
        MPVisitorSessionGUID || (MPVisitorSessionGUID = MPGetCookie("MPVisitorSessionGUID"));
        MPSiteGUID || (MPSiteGUID = MPGetCookie("mpsid"));
        $.get(MPRootURL + "ajax/BasePage.aspx/PingTrack", {
            siteGuid: MPSiteGUID,
            strVisitorSessionGUID: MPVisitorSessionGUID,
            strVisitorGUID: MPVisitorGUID,
            strWebAccessUserGUID: MPGetCookie("wauguid") || "",
            strWebAccessUserSessionGUID: MPGetCookie("wausguid") || ""
        }, _mpPing_callback, "json")
    } catch (n) {}
}

function NoImageReplacement() {
    this.src = MPRootURL + "_images/noimage.jpg"
}

function _mpPing_callback() {
    window.setTimeout(_mpPing, 2e4)
}
var JSON, AjaxFailed;
JSON || (JSON = {}),
    function () {
        "use strict";

        function i(n) {
            return n < 10 ? "0" + n : n
        }

        function o(n) {
            return e.lastIndex = 0, e.test(n) ? '"' + n.replace(e, function (n) {
                var t = s[n];
                return typeof t == "string" ? t : "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + n + '"'
        }

        function u(i, f) {
            var s, l, h, a, v = n,
                c, e = f[i];
            e && typeof e == "object" && typeof e.toJSON == "function" && (e = e.toJSON(i));
            typeof t == "function" && (e = t.call(f, i, e));
            switch (typeof e) {
                case "string":
                    return o(e);
                case "number":
                    return isFinite(e) ? String(e) : "null";
                case "boolean":
                case "null":
                    return String(e);
                case "object":
                    if (!e) return "null";
                    if (n += r, c = [], Object.prototype.toString.apply(e) === "[object Array]") {
                        for (a = e.length, s = 0; s < a; s += 1) c[s] = u(s, e) || "null";
                        return h = c.length === 0 ? "[]" : n ? "[\n" + n + c.join(",\n" + n) + "\n" + v + "]" : "[" + c.join(",") + "]", n = v, h
                    }
                    if (t && typeof t == "object")
                        for (a = t.length, s = 0; s < a; s += 1) typeof t[s] == "string" && (l = t[s], h = u(l, e), h && c.push(o(l) + (n ? ": " : ":") + h));
                    else
                        for (l in e) Object.prototype.hasOwnProperty.call(e, l) && (h = u(l, e), h && c.push(o(l) + (n ? ": " : ":") + h));
                    return h = c.length === 0 ? "{}" : n ? "{\n" + n + c.join(",\n" + n) + "\n" + v + "}" : "{" + c.join(",") + "}", n = v, h
            }
        }
        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + i(this.getUTCMonth() + 1) + "-" + i(this.getUTCDate()) + "T" + i(this.getUTCHours()) + ":" + i(this.getUTCMinutes()) + ":" + i(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        });
        var f = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            n, r, s = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            t;
        typeof JSON.stringify != "function" && (JSON.stringify = function (i, f, e) {
            var o;
            if (n = "", r = "", typeof e == "number")
                for (o = 0; o < e; o += 1) r += " ";
            else typeof e == "string" && (r = e);
            if (t = f, f && typeof f != "function" && (typeof f != "object" || typeof f.length != "number")) throw new Error("JSON.stringify");
            return u("", {
                "": i
            })
        });
        typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
            function walk(n, t) {
                var r, u, i = n[t];
                if (i && typeof i == "object")
                    for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (u = walk(i, r), u !== undefined ? i[r] = u : delete i[r]);
                return reviver.call(n, t, i)
            }
            var j;
            if (text = String(text), f.lastIndex = 0, f.test(text) && (text = text.replace(f, function (n) {
                    return "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse");
        })
    }();
var MPCookie, MPSetCookie, MPGetCookie, MPRootURL, MPVisitorGUID, MPVisitorSessionGUID, MPSiteGUID, MPMonthsAbbreviated = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    MPMonthsFull = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    currentRequests = {};
(function (n) {
    n.fn.marginWidth = function () {
        try {
            return this.outerWidth(!0) - this.outerWidth()
        } catch (n) {
            return 0
        }
    };
    n.fn.marginHeight = function () {
        try {
            return this.outerHeight(!0) - this.outerHeight()
        } catch (n) {
            return 0
        }
    };
    n.fn.borderWidth = function () {
        try {
            return this.outerWidth() - this.innerWidth()
        } catch (n) {
            return 0
        }
    };
    n.fn.borderHeight = function () {
        try {
            return this.outerHeight() - this.innerHeight()
        } catch (n) {
            return 0
        }
    };
    n.fn.paddingWidth = function () {
        try {
            return this.innerWidth() - this.width()
        } catch (n) {
            return 0
        }
    };
    n.fn.paddingHeight = function () {
        try {
            return this.innerHeight() - this.height()
        } catch (n) {
            return 0
        }
    };
    n.fn._height = function (n) {
        try {
            var t = this.is("input") ? this.borderHeight() : 0;
            this.height(n - this.paddingHeight() - t)
        } catch (i) {
            this.height(n)
        }
        return this
    };
    n.fn._width = function (n) {
        try {
            var t = this.is("input") ? this.borderWidth() : 0;
            this.width(n - this.paddingWidth() - t)
        } catch (i) {
            this.width(n)
        }
        return this
    }
})(jQuery);
String.prototype.escapeHtml = function () {
    try {
        return this.replace(/\\/ig, "\\\\").replace(/\"/ig, '\\"')
    } catch (n) {}
    return this
};
String.prototype.trim = function () {
    try {
        var n = this.replace(/^\s+/g, "");
        return n.replace(/\s+$/g, "")
    } catch (t) {}
    return this
};
typeof MPSetCookie == "undefined" && (MPSetCookie = function (n, t, i, r, u, f) {
    var e, o;
    try {
        e = new Date;
        e.setTime(e.getTime());
        i && (i = i * 864e5);
        o = new Date(e.getTime() + i);
        document.cookie = n + "=" + escape(t) + (i ? ";expires=" + o.toUTCString() : "") + (r ? ";path=" + r : "") + (u ? ";domain=" + u : "") + (f ? ";secure" : "")
    } catch (s) {}
});
typeof MPCookie == "undefined" && (MPCookie = function (n, t, i, r, u, f) {
    try {
        if (typeof t == "undefined") return MPGetCookie(n);
        MPSetCookie(n, t, i, r, u, f)
    } catch (e) {}
    return
});
typeof MPGetCookie == "undefined" && (MPGetCookie = function (n) {
    var i = 0,
        r = [],
        t = "",
        u = "",
        f = "",
        e = !1;
    try {
        for (r = document.cookie.split(";"), i = 0; i < r.length; i++) {
            if (t = r[i].split("="), u = t[0].replace(/^\s+|\s+$/g, ""), u === n) return e = !0, t.length > 1 && (f = unescape(t[1].replace(/^\s+|\s+$/g, ""))), f;
            t = null;
            u = ""
        }
        if (!e) return null
    } catch (o) {}
    return null
});
$(document).ready(function () {
    $.ajaxPrefilter(function (n) {
        n.url && n.url.indexOf("://") === -1 && n.url.indexOf("~/") === -1 && n.url.indexOf(MPRootURL) === -1 && (n.url = MPRootURL + n.url);
        n.dataType === "json" && n.contentType && (n.contentType = "application/json; charset=utf-8")
    });
    $.ajaxSetup({
        type: "POST",
        dataType: "json"
    });
    $("img").filter(":not([onerror])").each(function () {
        this.onerror = NoImageReplacement
    })
}).ajaxError(function () {
    try {} catch (n) {}
});
typeof AjaxFailed == "undefined" && (AjaxFailed = function () {
    try {} catch (n) {}
});
