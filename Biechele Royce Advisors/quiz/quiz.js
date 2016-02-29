var baseURL = "financial-health-results";
var quizURL = "financial-health-checklist";

var threshold1 = new Threshold(0, 3, "You need lots of help, but don't despair! It's never too late to take action to improve your finances & future.");
var threshold2 = new Threshold(4, 5, "You need an objective checkup to help raise your score! Now is the time to take action to reverse the trend");
var threshold3 = new Threshold(6, 7, "You're above average, but may want to follow up on some of your nos.");
var threshold4 = new Threshold(8, 10, "You are in excellent financial shape!  Congratulations!");
var defThreshold = new Threshold(-100000, 100000, "Please try again.");

var estateRetirement = new Service("Estate & Retirement Planning", "/estate-retirement-planning");
var wealthManagement = new Service("Wealth Management", "/wealth-management");
var insurancePlanning = new Service("Insurance Planning", "/insurance-planning");
var alternativeInvestments = new Service("Alternative Investments", "/alternative-investments");
var customPortfolios = new Service("Custom Portfolios", "/custom-portfolios");

var questions = [
    new Question("I know what I want to accomplish financially.", estateRetirement),
    new Question("I have outlined my financial plans on paper.", estateRetirement),
    new Question("I understand and am comfortable with the risk associated with my investments.", wealthManagement),
    new Question("I'm certain that myself or my parents are comfortably covered in the event of a need for long term care.", insurancePlanning),
    new Question("I fully understand the impact of inflation on retirement income.", estateRetirement),
    new Question("I am confident with my investment choices.", wealthManagement),
    new Question("I'm taking full advantage of alternative investments.", alternativeInvestments),
    new Question("I'm certain that if I died prematurely, my family would be financially safe.", insurancePlanning),
    new Question("I am confident I'm taking full advantage of investments to help me pay less taxes.", customPortfolios),
    new Question("My investments are coordinated with my estate plan.", estateRetirement)
];

function ProcessQuiz() {
    try {
        var url = baseURL + "?";

        var checks = $("input:checked");

        for (var n = 0; n < checks.length; n++) {
            var value = checks[n].value;
            //console.log(value);

            url += "q" + n + "=" + value + "&";
        }

        if (checks.length == questions.length) {
            window.location = url;
        }
        else {
            alert("You have not answered all of the questions yet");
        }
    }
    catch (e) {
        alert(e);
    }
}

function TallyResults() {
    try {
        var url = window.location.search;
        var source = $("#service-template").html();
        var template = Handlebars.compile(source);

        if (url != null && url != "?" && url != "") {
            var tally = 0;
            for (var n = 0; n < questions.length; n++) {
                var val = getParameterByName("q" + n);
                console.log("Q" + n + ": " + val);

                if (val == "0") {
                    var html = template(questions[n]);

                    $("#service-container").append(html);
                }
                tally += parseFloat(val);
            }

            console.log(tally);

            if (!isNaN(tally)) {
                var text = "Error!";
                if (tally >= threshold1.MinValue && tally <= threshold1.MaxValue) {
                    text = (threshold1.Text);
                }
                else if (tally >= threshold2.MinValue && tally <= threshold2.MaxValue) {
                    text = (threshold2.Text);
                }
                else if (tally >= threshold3.MinValue && tally <= threshold3.MaxValue) {
                    text = (threshold3.Text);
                }
                else if (tally >= threshold4.MinValue && tally <= threshold4.MaxValue) {
                    text = (threshold4.Text);
                }
                else {
                    text = (defThreshold.Text);
                }

                $("#threshold-display").html(text);
            }
            else {
                window.location = quizURL;
            }
        }
        else {
            window.location = quizURL;
        }
    }
    catch (e) {
        alert(e);
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function SetResult(val, index) {
    try {
        if (index < questions.length) {
            $("#question-" + (index + 1)).removeClass("hidden");
        }
        else {
            $("#buttonHolder").removeClass("hidden");
        }
    }
    catch (e) {
        alert(e);
    }
}

function LoadQuestions() {
    try {
        var source = $("#question-template").html();
        var template = Handlebars.compile(source);

        questions[0].Visible = "visible";

        for (var n = 0; n < questions.length; n++) {
            questions[n].Index = n + 1;
            questions[n].Visible = "visible"; //

            var html = template(questions[n]);

            $("#question-container").append(html);
        }
    }
    catch (e) {
        alert(e);
    }
}

function Question(text, service) {
    this.Text = text;
    this.Index = 0;
    this.Visible = "hidden";
    this.Service = service;
}

function Threshold(min, max, text) {
    this.Text = text;
    this.MinValue = min;
    this.MaxValue = max;
}

function Service(name, url) {
    this.Name = name;
    this.URL = url;
}
