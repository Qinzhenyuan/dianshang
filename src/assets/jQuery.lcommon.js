function lcommon () {
	var $top_bar = $(".top_bar");
	var $right_nav = $(".right_nav");
	var $top_btn = $(".top_btn");
	var $right_btn = $(".right_btn");
	//吸顶菜单
	$(window).scroll(function () {
		var $scrolltop = $(document).scrollTop();
		if ($scrolltop >= 200) {
			$top_bar.fadeIn();
			$top_btn.fadeIn();
			$right_nav.animate({top:$top_bar.outerHeight()});
		} else{
			$top_bar.fadeOut();
			$top_btn.fadeOut();
			$right_nav.stop(true).animate({top:121});
		}
		$top_btn.on("click",function () {
			$("html body").stop().animate({scrollTop:0});
		});
	});
	//右边菜单
	$right_btn.on("click",function () {
		var $right = parseInt($right_nav.css("right"));
		var $top = parseInt($right_nav.css("top"));
		if ($right == 0 && $top == 121) {
			$right_nav.animate({right:-$right_nav.outerWidth()});
			$right_nav.css({top:121});
			$right_btn.html("<");
		}
		if ($right == 0 && $top == $top_bar.outerHeight()) {
			$right_nav.animate({right:-$right_nav.outerWidth()});
			$right_nav.css({top:$top_bar.outerHeight()});
			$right_btn.html("<");
		}
		if ($right == -$right_nav.outerWidth() && $top == 121) {
			$right_nav.animate({right:0});
			$right_nav.css({top:121});
			$right_btn.html(">");
			
		}
		if ($right == -$right_nav.outerWidth() && $top == $top_bar.outerHeight()) {
			
			$right_nav.animate({right:0});
			$right_nav.css({top:$top_bar.outerHeight()});
			$right_btn.html(">");
		}
	});
	//回到顶部
	
	//登录、注册
	var $login = $(".login");
	var $register = $(".register");
	var $reg_login = $(".reg_login");
	var $reg_register = $(".reg_register");
	var $register_pt = $(".register_pt");
	var $register_wholesale = $(".register_wholesale");
	var $login_pt = $(".login_pt");
	var $login_wholesale = $(".login_wholesale");
	var $pop_Ahlpa = $(".pop_Alpha");
	var $pop_login = $(".pop_login");
	var $pop_login_close = $(".pop_login_close");
	var $reg_select = $(".reg_select").find("li");
	
	$.each($reg_select,function (idx,item) {
		$(this).on("click",function () {
			$(this).addClass("cur");
			$(this).siblings().removeClass("cur");
			if (idx == 3) {
				wholesale();
				$pop_login.css({top:"30%"});
			}else if (idx == 2) {
				register();
				$pop_login.css({top:"50%"});
			}else if(idx == 1){
				login_wholesale()
				$pop_login.css({top:"50%"});
			}else if (idx == 0) {
				login();
				$pop_login.css({top:"50%"});
			}
			
		});
		
	});
	
	//点击事件
	$login.on("click",login);
	$register.on("click",register);
	$pop_login_close.on("click",close);
	$pop_Ahlpa.on("click",close);
	//登录显示
	function login() {
		$pop_Ahlpa.css({display:"block"});
		$pop_login.css({display:"block"});
		$reg_login.css({display:"block"});
		$login_pt.css({display:"block"});
		$login_wholesale.css({display:"none"});
		$reg_register.css({display:"none"});
		$register_pt.css({display:"none"});
		$register_wholesale.css({display:"none"});
		$pop_login.css({top:"50%"});
	}
	//注册显示
	function register() {
		$pop_Ahlpa.css({display:"block"});
		$pop_login.css({display:"block"});
		$reg_login.css({display:"none"});
		$login_pt.css({display:"none"});
		$login_wholesale.css({display:"none"});
		$reg_register.css({display:"block"});
		$register_pt.css({display:"block"});
		$register_wholesale.css({display:"none"});
		$pop_login.css({top:"50%"});
	}
	//关闭登录、注册
	function close () {
		$pop_Ahlpa.css({display:"none"});
		$pop_login.css({display:"none"});
		$reg_login.css({display:"none"});
		$login_pt.css({display:"none"});
		$login_wholesale.css({display:"none"});
		$reg_register.css({display:"none"});
		$register_pt.css({display:"none"});
		$register_wholesale.css({display:"none"});
	}
	//批发会员注册
	function wholesale() {
		$pop_Ahlpa.css({display:"block"});
		$pop_login.css({display:"block"});
		$reg_login.css({display:"none"});
		$login_pt.css({display:"none"});
		$login_wholesale.css({display:"none"});
		$reg_register.css({display:"block"});
		$register_pt.css({display:"none"});
		$register_wholesale.css({display:"block"});
	}
	//批发会员登录
	function login_wholesale () {
		$pop_Ahlpa.css({display:"block"});
		$pop_login.css({display:"block"});
		$reg_login.css({display:"block"});
		$login_pt.css({display:"none"});
		$login_wholesale.css({display:"block"});
		$reg_register.css({display:"none"});
		$register_pt.css({display:"none"});
		$register_wholesale.css({display:"none"});
	}
	//验证码
	//普通会员
	var $register_safe = $(".pop_register_item .safe");
	//批发会员
	var $wholesale_safe = $(".pop_wholesale_item .safe");
	var $li = $(".reg_register .reg_select li");
	function code () {
		$register_safe.html("");
		$wholesale_safe.html("");
		var random = "";
		for (var i = 1; i <= 4; i++) {
			random += parseInt(Math.random()*10);
		}
		$register_safe.html(random);
		$wholesale_safe.html(random);
	}
	code();
	$register_safe.on("click",function () {
		code();
	});
	$wholesale_safe.on("click",function () {
		code();
	});
	$li.on("click",function () {
		code();
	});
}

