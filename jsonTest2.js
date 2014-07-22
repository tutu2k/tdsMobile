function loadInfo() {
    $.getJSON("http://www.tadashishoji.com.cn/getcontent/getpost.php?type=gallery&pid=7853", function(data) {
        $("#iGallery").html("");//清空info内容
        $.each(data.comments, function(i, item) {
            $("#iGallery").append(
            "<li><a title=\""+ item.title +"\" href=\""+ item.url +"\"><img src=\""+ item.n_url +"\"/></a></li>";
        });
        });
}