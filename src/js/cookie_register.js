function cookie_register (urls) {
	var $register_txt = $(".pop_register_item .txtgb");
	var $register_pwd = $(".pop_register_item .pwdbg");
	var $register_repwd = $(".pop_register_item .reg_pwdbg");
	var $register_name = $(".pop_register_item .namebg");
	var $register_sex = $(".pop_register_item .selectbg");
	var $register_phone = $(".pop_register_item .cphonebg");
	var $register_code = $(".pop_register_item .codebg");
	var $register_safe = $(".pop_register_item .input_code .safe");
	var $register_agree = $(".pop_register_tip .agree input");
	var $register_subimt = $(".pop_register_submit");
	var $register_txt_error = $(".pop_register_item .txt_error");
	var $register_pwd_error = $(".pop_register_item .pwd_error");
	var $register_sex_error = $(".pop_register_item .sex_error");
	var $register_phone_error = $(".pop_register_item .phone_error");
	var $register_code_error = $(".pop_register_item .code_error");
	
	//电子邮件失去焦点事件
	$register_txt.on("blur",function () {//电子邮件格式验证
		var pattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if (pattern.test($(this).val())) {
			$register_txt_error.html("");
			//验证成功则添加一个自定义属性为true
			$(this).attr({ble:"true"});
		} else{//验证不成功则添加一个自定义属性为false
			$register_txt_error.html("电子邮件格式错误");
			$(this).attr({ble:"false"});
		}
	});
	//密码是否一致
	$register_repwd.on("blur",function () {//密码一致验证
		if ($(this).val() == $register_pwd.val()) {//验证成功则添加一个自定义属性为true
			$register_pwd_error.html("");
			$(this).attr({ble:"true"});
		} else{//验证不成功则添加一个自定义属性为false
			$register_pwd_error.html("密码不一致");
			$(this).attr({ble:"false"});
		}
	});

	//验证手机号是否正确
	$register_phone.on("blur",function () {//手机号码格式验证
		var pattern = /^[1]\d{10}$/;
		if (pattern.test($(this).val())) {//验证成功则添加一个自定义属性为true
			$register_phone_error.html("");
			$(this).attr({ble:"true"});
		} else{//验证不成功则添加一个自定义属性为false
			$register_phone_error.html("手机号格式错误");
			$(this).attr({ble:"false"});
		}
	});
	//验证码
	$register_code.on("blur",function () {//验证码验证
		if ($(this).val() == $register_safe.html()) {//验证成功则添加一个自定义属性为true
			$register_code_error.html("");
			$(this).attr({ble:"true"});
		} else{//验证不成功则添加一个自定义属性为false
			$register_code_error.html("验证码错误");
			$(this).attr({ble:"false"});
		}
	});
	
	function ble () {
		$.each($(".pop_register_input input"), function(idx,item) {//当输入框为空是设置自定义属性为false
			if ($(item).val() == "") {
				$(item).attr({ble:"false"});
			}
		});
		//用户名不为空时自定义属性为true
		if ($register_name.val() != "") {
			$register_name.attr({ble:"true"});
		} 
		//密码不为空时自定义属性为true
		if ($register_pwd.val() != "") {
			$register_pwd.attr({ble:"true"});
		}
		if ($register_agree.prop("checked") == true) {//如果checked设置自定义属性为true
			$register_agree.attr({ble:"true"});
		} else{//否则设置自定义属性为false
			$register_agree.attr({ble:"false"});
		}
	}
	
	//点击注册事件
	$register_subimt.on("click",function () {
		ble();
		var d = new Date(10);
		var $input = $(".pop_register_input input");
		console.log($input.eq(1));
		console.log($input);
		var h = true;
		for (var i = 0; i < $input.length; i++) {
			console.log( typeof $input.eq(i).attr("ble"));
			if ($input.eq(i).attr("ble") == "false") {
				h = false;
				break;
			}
		}
		if (h) {
			//把注册信息存入cookie
			var email = setCookie("email",$register_txt.val(),d,"/");
			var password = setCookie("password",$register_pwd.val(),d,"/");
			var username = setCookie("username",$register_name.val(),d,"/");
			var sex = setCookie("sex",$register_sex.val(),d,"/");
			var phone = setCookie("phone",$register_phone.val(),d,"/");
			//注册完跳转到当前页面
			$register_subimt.attr({href:urls});
		}
	});
}
