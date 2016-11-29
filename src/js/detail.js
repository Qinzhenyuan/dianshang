function listcart () {
	var oldcke = getCookie("goodscke");
	if (oldcke) {
		var good_list = JSON.parse(oldcke);
		var nums = 0;
		//循环遍历数组
		for (var i = 0; i < good_list.length; i++) {
			//数组中存在id与当前点击的商品id一样时改变当前下标中的num值
			nums += good_list[i].num;
		}
		var $cart = $(".cart a span");
		$cart.html(nums);
	}
	
}

function details () {
	$.ajax({
		url:"../assets/Json/lists.json",
		dataType:"json",
		success:function (res) {
			//便利goodslist.json，即res
			$.each(res, function(idxs,items) {
				//获取cookie中存储的id
				var listId = getCookie("listId");
				//当id与json中的id相等时根据json生成详情页中的图片等
				if (items.id == listId) {
					$("<span />").html(items.title).appendTo($(".goodview_nav"));
					$("<img/>").attr({src:items.imgurl}).appendTo($(".goodlist_img"));
					$("<strong />").html(items.english_title).appendTo($(".goods_title"));
					$("<p />").html(items.han_title).appendTo($(".goods_title"));
					$("<p />").html(items.title).appendTo($(".goods_title"));
					$("<span />").html(items.gicon).appendTo($(".goods_title"));
					$("<span />").html("¥ "+items.price).addClass("sell_price").appendTo($(".sell_content strong"));
					$(".emoney strong").html(parseInt(items.price/100));
					//放大镜插件
					$(".goodlist_img").lzoom();
					var $reduce = $(".reduce");
					var $plus = $(".plus");
					var $goodsnum = $(".goodsnum");
					$reduce.on("click",function () {
						var i = parseInt($goodsnum.val());
						if (i == "1") {
							$goodsnum.val(1);
						} else{
							$goodsnum.val(i-1);
						}
					});
					$plus.on("click",function () {
						var i = parseInt($goodsnum.val());
						$goodsnum.val(i+1);
					});
					//获取购物车按钮
					var $cart_btn = $(".cart_btn");
					//购物车点击事件
					//定义一个空数组
					var goodList = [];
					
					$cart_btn.on("click",function () {
						//定义一个空对象
						var goods = {};
						//获取已有的cookie
						var oldcookie = getCookie("goodscke");
						//当cookie为空时添加cookie
						if (oldcookie == "") {
							goods.id = items.id;
							goods.img = items.imgurl;
							goods.price = items.price;
							goods.entitle = items.english_title;
							goods.num = parseInt($goodsnum.val());
							goods.color = $(".gcolor").val();
							goods.size = $(".gsize").val();
							goods.emoney = parseInt($(".emoney strong").html());
							goodList.push(goods);
						} else{//当有cookie时
							//把cookie字符串转换为数组
							goodList = JSON.parse(oldcookie);
							//循环遍历数组
							var j = true;
							//遍历数组
							for (var i = 0; i < goodList.length; i++) {
								//数组中存在id与当前点击的商品id一样时改变当前下标中的num值
								if (goodList[i].id == items.id) {
									goodList[i].num = parseInt(goodList[i].num) + parseInt($goodsnum.val());
									j = false;
									break;//跳出循环
								}
							}
							if (j) {//当数组中没有相同的商品时
								//goodList中id不相等时生成一个新的对象存入数组中
								goods.id = items.id;
								goods.img = items.imgurl;
								goods.price = items.price;
								goods.entitle = items.english_title;
								goods.num = parseInt($goodsnum.val());
								goods.color = $(".gcolor").val();
								goods.size = $(".gsize").val();
								goods.emoney = parseInt($(".emoney strong").html());
								goodList.push(goods);
							}	
						}
						//把数组转换为字符串
						var goodscookie = JSON.stringify(goodList);
						var d = new Date(10);
						//把字符串存入cookie中
						var goodscke = setCookie("goodscke",goodscookie,d,"/");
						//加入购物车效果
						var $img = $(".goodlist_img img");
						//复制图片
						var $copyimg = $img.clone();
						var OFF = $img.offset();
						var oWidth = $img.outerWidth();
						
						$copyimg.css({//给复制图片添加样式
							position:"absolute",
							left:OFF.left,
							top:OFF.top,
							width:oWidth
						});
						//把复制图片添加到body
						$copyimg.appendTo("body");
						//获取购物车位置
						var $cartOFF = $(".header .cart").offset();
						var $cartOWidth = $(".header .cart").outerWidth();
						//复制图片运动到购物车位置
						$copyimg.animate({top:$cartOFF.top,left:$cartOFF.left+$cartOWidth,width:0,opacity:0},2000,function () {
							//图片到购物车位置后移除图片
							$copyimg.remove();
							//更新购物车商品总件数
							listcart();
						});
					});
				}
			});	
			
		}
	});
	
}