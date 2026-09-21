function execute(url) {
    var response = fetch(url);
    if (!response.ok) return Response.error("Không tải được chương: HTTP " + response.status);

    var doc = response.html();
    var body = doc.select("body").first();
    if (!body) return Response.error("Không tìm thấy nội dung trang.");

    body.select("script,style,iframe,form,button,select,input,nav,footer,header,aside,.comments,.comment,.tts,.ads,.advertisement").remove();

    var h1 = doc.select("h1").first();
    var h2 = doc.select("h2").first();
    var title = "";
    if (h1) title += "<h2>" + h1.text().trim() + "</h2>";
    if (h2) title += "<h3>" + h2.text().trim() + "</h3>";

    var html = body.html();
    return Response.success(title + Html.clean(html, ["p","br","div","h2","h3"]));
}
