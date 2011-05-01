function isLower(char) {
    return char.toUpperCase() != char;
}
function wrapLowerCharsWithTag(text, tag) {
    var result = "";
    var processingLower = false;
    $.each(text, function(i, char) {
        var lower = isLower(char);
        if (lower && !processingLower) {
            result += "<" + tag + " style='font-size:70%;text-transform:uppercase;'>";
            processingLower = true;
        }
        if (!lower && processingLower) {
            result += "</" + tag + ">";
            processingLower = false;
        }
        result += char;
    });
    if (processingLower) {
        return result += "</" + tag + ">";
    } else {
        return result;
    }
}
function applyFix(elem) {
    elem.css("font-variant", "normal");
    elem.html(wrapLowerCharsWithTag(elem.text(), "small"));
}
function iterateAllElements() {
    $("body *").filter(
            function () {
                return $(this).css("font-variant") == "small-caps";
            }).each(function() {
        console.log("Apply small-caps web font fix for: " + this);
        applyFix($(this));
    });
}
function needsFix() {
    /**
     * Chrome used to have this issue. Now it's gone and has WebKit version 534.x.
     * Safari 5.0.5 still has the issue and has WebKit version 533.x.
     * This is why is assumed issue exists in WebKit versions below 534.
     */
    return $.browser.webkit && $.browser.version.split(".")[0] < 534
}
$(function() {
    if (needsFix()) {
        iterateAllElements();
    }
});