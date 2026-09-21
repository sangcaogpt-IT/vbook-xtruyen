function execute(url) {
    var out = [];
    for (var i = 1; i <= 443; i++) {
        out.push({
            name: "Chương " + i,
            url: "https://xtruyen.vn/truyen/12-nu-than/chuong-" + i + "/",
            host: "https://xtruyen.vn"
        });
    }
    return Response.success(out);
}
