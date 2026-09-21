function execute(url) {
    var response = fetch(url);
    if (!response.ok) return Response.error("Không tải được mục lục: HTTP " + response.status);
    var doc = response.html(), out = [], seen = {};
    doc.select("a[href]").forEach(function(a) {
        var href = a.absUrl("href") || a.attr("href");
        if (!href || !/\/truyen\/[^\/]+\/chuong-[^\/?#]+\/?/i.test(href) || seen[href]) return;
        var name = a.text().trim();
        if (!name) { var m = href.match(/chuong-([^\/?#]+)/i); name = m ? "Chương " + m[1] : "Chương"; }
        seen[href] = true; out.push({name:name,url:href,host:"https://xtruyen.vn"});
    });
    if (!out.length) return Response.error("Không tìm thấy danh sách chương trên trang.");
    return Response.success(out);
}