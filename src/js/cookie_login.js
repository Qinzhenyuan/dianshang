function cookie_login (urls) {//普通会员登录
	var $pop_login_submit = $(".login_pt .pop_login_submit");
	var $text = $(".login_pt .text");
	var $pwd = $(".login_pt .pwd");
	
	$pop_login_submit.on("click",function () {
		//获取普通会员注册信息的cookie
		var email = getCookie("email");
		var password = getCookie("password");
		//当账户密码都正确给点击按钮添加href属性跳转到当前页面
		if ($text.val() == email && $pwd.val() == password) {
			$pop_login_submit.attr({href:urls});
		}
	});
}