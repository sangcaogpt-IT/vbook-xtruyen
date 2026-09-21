function execute(url) {
    var response = fetch(url);
    if (!response.ok) return Response.error("Không tải được trang truyện: HTTP " + response.status);
    var doc = response.html();
    var h1 = doc.select("h1").first();
    var name = h1 ? h1.text().trim() : "XTruyen";
    var cover = "";
    var img = doc.select('meta[property="og:image"]').first();
    if (img) cover = img.attr("content") || "";
    if (!cover) {
        var firstImg = doc.select("img").first();
        if (firstImg) cover = firstImg.absUrl("src") || firstImg.attr("data-src") || firstImg.attr("src") || "";
    }
    var text = doc.select("body").text();
    var author = "";
    var m = text.match(/Tác giả\s*[:\-]?\s*([^\n\r]{1,80})/i);
    if (m) author = m[1].trim();
    var meta = doc.select('meta[name="description"]').first();
    var description = meta ? (meta.attr("content") || "") : "";
    return Response.success({name:name,cover:cover,host:"https://xtruyen.vn",author:author,description:description,detail:"",ongoing:!/Hoàn thành|Đã hoàn thành|Full/i.test(text)});
}