//name=value;[expires=date];[path=路径];[domain=域名];[secure]
//设置cookie
function setCookie (name,value,expres,path,domain,secure) {
	//name=value
	var cookieText = name + "=" + value;
	//失效时间expres=date
	if (expres instanceof Date) {
		cookieText += ";expres=" + expres; 
	}
	if (path) {
		cookieText += ";path=" + path; 
	}
	if (domain) {
		cookieText += ";domain=" + domain; 
	}
	if (secure) {
		cookieText += ";secure"; 
	}
	document.cookie = cookieText;
	return document.cookie;
}
//获取cookie
function getCookie (name) {
	var cookie = document.cookie;
	var arr = cookie.split("; ");
	for (var i = 0;i < arr.length; i++) {
		var arr2 = arr[i].split("=");
		if (arr2.length >= 2) {
			if (arr2[0] == name) {
				return arr2[1];
			}
		}
	}
	return "";
}
//删除cookie
function removeCookie (name) {
	var d = new Date();
    document.cookie = name + "=;expres=" + d;
	return document.cookie; 
}
