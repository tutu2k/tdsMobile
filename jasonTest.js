function getRecentlyViewed(code)
{
	var html = "";
	jQuery.ajax({
		type: "get",//使用get方法访问后台
		dataType: "jsonp",//返回json格式的数据
        jsonp:"callback",
		url: "http://www.tadashishoji.com.cn/getcontent/getpost.php",//要访问的后台地址
		data: "type=gallery&pid="+code,//要发送的数据
		//	 complete: function(){}
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			jQuery(msg).each( function(i, n){
				if(i==msg.length-1)
					html+="<li><a title=\""+n.title+"\" href=\""+n.url+"\"><img src=\""+n.s_url+"\" onload=\"afterLoad();\" /></a></li>";
				else
					html+="<li><a title=\""+n.title+"\" href=\""+n.url+"\"><img src=\""+n.s_url+"\" /></a></li>";
				
			});
			jQuery('#iGallery').html(html);
			sleep(1);
			$('#iGallery').imageflip();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		{
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
		}
	});
}

function afterLoad()
{
	$('#iGallery').imageflip();
}
