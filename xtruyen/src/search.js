function execute(key, page) {
    var p = page ? parseInt(page, 10) : 1;
    if (!p || p < 1) p = 1;
    var url = p > 1 ? "https://xtruyen.vn/page/" + p + "/?s=" + encodeURIComponent(key) : "https://xtruyen.vn/?s=" + encodeURIComponent(key);
    var response = fetch(url);
    if (!response.ok) return Response.error("Không tìm kiếm được: HTTP " + response.status);
    var doc = response.html();
    var out = [], seen = {};
    doc.select('a[href*="/truyen/"]').forEach(function(a) {
        var href = a.absUrl("href") || a.attr("href");
        if (!href || !/^https?:\/\/(www\.)?xtruyen\.vn\/truyen\/[^\/?#]+\/?$/i.test(href) || seen[href]) return;
        var name = a.text().trim();
        var img = a.select("img").first();
        if (!name && img) name = (img.attr("alt") || "").trim();
        if (!name) return;
        seen[href] = true;
        out.push({name:name, link:href, host:"https://xtruyen.vn", cover:img ? (img.attr("data-src") || img.attr("src") || "") : "", description:""});
    });
    var nextEl = doc.select('a[rel="next"],a.next,.nav-links .next,.pagination .next').first();
    return Response.success(out, nextEl ? String(p + 1) : null);
}