function execute(url) {
    var response = fetch(url);
    if (!response.ok) return Response.error("Không tải được chương: HTTP " + response.status);
    var doc = response.html();
    var selectors = [".chapter-content",".chapter-c",".chapter-text",".reading-content",".entry-content",".post-content",".content-chapter","#chapter-content","#chapter-c","#reading-content","article"];
    var el = null;
    for (var i=0;i<selectors.length;i++){ var x=doc.select(selectors[i]).first(); if(x && x.text().trim().length>200){el=x;break;} }
    if (!el) return Response.error("Không tìm thấy nội dung chương.");
    el.select("script,style,iframe,form,button,select,input,nav,footer,header,.comments,.comment,.tts,.ads,.advertisement").remove();
    return Response.success(el.html());
}