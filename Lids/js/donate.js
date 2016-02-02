function SendTransaction() {
    var req = {
        "environment": {
            "ID": "813A55E7-9158-4DC3-BB30-BBCEF8EC6D5D",
        },
        "transaction": {
            "BillingAddress": {
                "FirstName": $("#FirstName").val(),
                "LastName": $("#LastName").val(),
                "PhoneNumber": $("#Phone").val(),
                "Address1": $("#Address1").val(),
                "Address2": $("#Address2").val(),
                "City": $("#City").val(),
                "State": $("#State").val(),
                "ZipCode": $("#ZipCode").val(),
                "Country": $("#Country").val()
            },
            "CardInfo": {
                "CardNumber": {
                    "ValueIn": $("#CardNumber").val()//"4111111111111111"
                },
                "ExpirationMonth": $("#ExpirationMonth").val(),//"07",
                "ExpirationYear": $("#ExpirationYear").val(),//"18",
                "SecurityCode": {
                    "ValueIn": $("#SecurityCode").val()//"0000"
                },
                "CardholderName": $("#CardholderName").val(),
                //"CreditCardType": $("#CardType").val()
            },
            "ConfirmationEmailAddress": $("#email").val(),
            "ProcessAmount": $("#donate-amount").val()
        }
    };

    var data = {
        environment: (req.environment),
        transaction: (req.transaction)
    }

    var uri = $("#BaseURL").val() + "api/makepayment/0";

    try {
        //$.post(uri, data, alertResult, "json").error(alertResult);

                $.ajax({
                    url: uri,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: alertResult,
                    error: alertResult
                });
    }
    catch (e) { alert(e); }
}

//var doAlert = true;

function alertResult(a, b, c, d){

    try {
        var data = (a.d == null || a.d == "") ? JSON.stringify(a) : a.d;

        if ( a.Code != 0 ) {
            alert( a.Message + a.Errors)
        } else {
            window.location.href = "/home";
        }
    }
    catch (e) {
        alert(e);
    }
}

{
    "DataKeys": [{
        "Key": "msg-E00027",
        "Value": "The transaction was unsuccessful."
    }, {
        "Key": "refId",
        "Value": null
    }, {
        "Key": "sessionToken",
        "Value": null
    }, {
        "Key": "accountNumber",
        "Value": "XXXX4111"
    }, {
        "Key": "accountType",
        "Value": ""
    }, {
        "Key": "authCode",
        "Value": ""
    }, {
        "Key": "avsResultCode",
        "Value": "P"
    }, {
        "Key": "cavvResultCode",
        "Value": ""
    }, {
        "Key": "cvvResultCode",
        "Value": ""
    }, {
        "Key": "prePaidCard",
        "Value": null
    }, {
        "Key": "rawResponseCode",
        "Value": null
    }, {
        "Key": "refTransID",
        "Value": ""
    }, {
        "Key": "responseCode",
        "Value": "3"
    }, {
        "Key": "secureAcceptance",
        "Value": null
    }, {
        "Key": "shipTo",
        "Value": null
    }, {
        "Key": "testRequest",
        "Value": "0"
    }, {
        "Key": "transHash",
        "Value": "AAA1BB8B2E6F055C6EA704CFD4A00790"
    }, {
        "Key": "transId",
        "Value": "0"
    }, {
        "Key": "user-TransactionID",
        "Value": "a62fc149-08da-40ad-821a-16690453abdf"
    }, {
        "Key": "resp-err-6",
        "Value": "The credit card number is invalid."
    }],
    "Code": 100,
    "Message": "Error: E00027  The transaction was unsuccessful.",
    "Value": "Error: E00027  The transaction was unsuccessful.",
    "ReferenceKey": "",
    "TransactionID": "a62fc149-08da-40ad-821a-16690453abdf",
    "Errors": ["The credit card number is invalid."]
}
