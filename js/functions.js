$(window).load(function() {

    //When scrolling, automatically highlight the current location
    $(document).scroll(function() {
        //Find the closest div with a title
        var divs = $("*[id]").filter("div").filter(function() {
            return $(this).children("h3, h4, h5, h6").length > 0;
        });

        //Define the current position to be the middle of the screen.
        //var scrollOffset = $(document).scrollTop() + ($(window).height() / 2);

        //Define the current position to be the top of the screen
        var scrollOffset = $(document).scrollTop();

        var closest = null;
        var smallestDistance = Number.MAX_VALUE;

        //Find the section closest to the current scroll position
        divs.each(function() {
            var offset = $(this).offset().top;
            var distance = scrollOffset - offset;
            if (distance >= 0 && distance < smallestDistance) {
                smallestDistance = distance;
                closest = $(this);
            }
        });

        if (closest != null) {
            var id = closest.attr("id") + "-link";
            //Reset the color of all of the links
            $(".content-table").find("a").css({
                "color": "",
                "text-decoration": ""
            });
            //And set the closest link to black
            $("." + id).css({
                "color": "#000000",
                "text-decoration": "underline"
            });
        }

    });

    //Downloads the DebugTool.zip file, and navigates to the installation section of the manual
    $(".download").click(function (e) {
        e.preventDefault();
        var iframe = jQuery("<iframe/>", {
            style: "display:none;"
        });
        $("body").append(iframe);
        iframe.attr("src", "downloads/DebugTool.zip");
        window.location.href = "manual_en.html#installation";
    });

    //When loading the window, add an automatically generated table of contents. Add a link to each div
    //which has both a title (as a <hx> component) and an id.

    var content = $(".content-table");

    $("*[id]").filter("div").each(function() {
        var id = $(this).attr("id");
        var title = $(this).children("h3, h4, h5, h6");
        if (title.length > 0) {
            //Hacky: Set the margin based on which kind of "hx" the title is, also make the font smaller
            var node = title.prop("nodeName");
            var margin = node == "H3" ? 0 : (node == "H4" ? 10 : (node == "H5" ? 20 : 30));
            var fontSize = node == "H3" ? 1.3 : (node == "H4" ? 1.2 : (node == "H5" ? 1.1 : 1.0));
            var link = jQuery("<a/>", {
                "href": "#" + id,
                "html": title.html(),
                "style": "margin-left: " + margin + "px; font-size: " + fontSize + "em;",
                "class": id + "-link"
            });
            content.append(link);
            content.html(content.html() + "<br>");
        }
    });

    //Any clicked link to a local id cause to scroll slowly, not immediately move
    $('a[href^="#"]').click(function(e) {
        // target element id
        var id = $(this).attr('href');

        // target element
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }

        // prevent standard hash navigation (avoid blinking in IE)
        e.preventDefault();

        // top position relative to the document
        var pos = $(id).offset().top;

        // animated top scrolling
        moveTo(pos);
    });

    //Setup the floating content buttons to hide the content after clicking
    $(".floating-content a").click(function () {
        toggleFloatingContent();
    });
});

function downloadBinaries() {
        window.location.href = "manual_en.html#installation"
}

function downloadSource() {
    //TODO
}

function downloadExample(name) {
    window.open("examples/" + name, "Download");
}

function download(file, page) {
    window.open(file, "Download");
    window.location.href = page;
    /*var iframe = jQuery("<iframe/>", {
        style: "display:none;"
    });
    $("body").append(iframe);
    iframe.attr("src", file);
    window.location.href = page;*/
}

//Animate moving to the given position
function moveTo(pos) {
    $('body, html').animate({scrollTop: pos}, 1000);
}

function toggleFloatingContent() {
    var floating = $(".floating-content");
    floating.toggle();
}