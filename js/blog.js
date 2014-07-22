function getBlogList(code)
{
	var html = "";
	jQuery.ajax({
		type: "get",//使用get方法访问后台
		dataType: "jsonp",//返回json格式的数据
        jsonp:"callback",
		url: "http://www.tadashishoji.com.cn/getcontent/getpost.php",//要访问的后台地址
		data: "type=blog&numberposts=500&offset=1&category=" + code,//要发送的数据
		//	 complete: function(){}
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			jQuery(msg).each( function(i, n){
				html+="<li><a href=\"#detail\" data-transition=\"slide\" onclick=\"getBlogDetail('"+n.post_id+"')\">" +n.img+"<h3>"+n.title+"</h3><p>点击查看详情</p></a></li>";
			});
			jQuery('#blogView').html(html);
			jQuery('#blogView').listview("refresh"); 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		{
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
		}
	});
}
function getBlogDetail(detailID) {
	jQuery('#detailTitle').html("");
	jQuery('#blogDetail').html("");
	var html = "";
	jQuery.ajax({
		type: "get",//使用get方法访问后台
		dataType: "jsonp",//返回json格式的数据
        jsonp:"callback",
		url: "http://www.tadashishoji.com.cn/getcontent/getpost.php",//要访问的后台地址
		data: "type=post&pid="+detailID,//要发送的数据
		//	 complete: function(){}
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			jQuery(msg).each( function(i, n){
				html=n.content;
				jQuery('#detailTitle').html(n.title);
			});
			jQuery('#blogDetail').html(html);
		},
	});
	
}
