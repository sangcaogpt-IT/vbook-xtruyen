function execute(url) {
    var browser = Engine.newBrowser();
    browser.setUserAgent(UserAgent.android());

    var doc = browser.launch(url, 15000);
    if (!doc) {
        browser.close();
        return Response.error("Không tải được trang chương.");
    }

    var selectors = [
        ".reading-content", ".chapter-content", ".chapter-c", ".chapter-text",
        ".content-chapter", "#chapter-content", "#chapter-c",
        ".entry-content", ".post-content", "article"
    ];

    var el = null;
    for (var i = 0; i < selectors.length; i++) {
        var x = doc.select(selectors[i]).first();
        if (x && x.text().trim().length > 300) {
            el = x;
            break;
        }
    }

    if (!el) {
        var body = doc.select("body").first();
        if (body) {
            body.select("script,style,iframe,form,button,select,input,nav,footer,header,aside,.comments,.comment,.tts,.ads,.advertisement").remove();
            var text = body.text().trim();
            browser.close();
            if (text.length > 500) {
                return Response.success("<p>" + text.replace(/\n+/g, "</p><p>") + "</p>");
            }
        } else {
            browser.close();
        }
        return Response.error("Không tìm thấy nội dung chương.");
    }

    el.select("script,style,iframe,form,button,select,input,nav,footer,header,aside,.comments,.comment,.tts,.ads,.advertisement").remove();
    var html = el.html();
    browser.close();
    return Response.success(Html.clean(html, ["p","br","div"]));
}
