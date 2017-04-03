//Allow to add a back-button to go back to some previous page.
//The button is inserted in the top-left corner at a fixed position.
function addBackButton(text, url) {
    var button = jQuery("<a/>", {
        "href": url,
        "html": text,
        "class": "btn btn-default",
        "id": "back"
    });
    $("body").prepend(button);
    $("body").css("margin-top", "50px");
}

//Switch between the before and after picture
function switchBeforeAndAfter() {
    var p = $("#before_and_after");
    var img = p.find("img");
    var imgSrc = img.attr("src");
    if (imgSrc.search("before") > -1) {
        fadeInImage(p.find("img"), "images/debugging_now.JPG");
    } else {
        fadeInImage(p.find("img"), "images/debugging_before.JPG");
    }
    p.find("button").toggleClass("disabled");
    p.find("button").each(function() {
        if ($(this).hasClass("disabled")) {
            $(this).removeAttr("onClick");
        } else {
            $(this).attr("onClick", "switchBeforeAndAfter();");
        }
    });
}


function fadeInImage(img, src, height) {
    img.fadeOut(500, function() {
        img.attr("src", src);
        img.fadeIn(500);
    });
}