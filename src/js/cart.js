function goodsCart () {//购物车方法
	var listcookie = getCookie("goodscke");
	var goodList = JSON.parse(listcookie);
	//console.log(goodList);
	var $ul = $("<ul />");
	var sum = 0;
	var sums = 0;
	for (var i = 0; i < goodList.length; i++) {
		var $li = $("<li />");
		var $divdetail = $("<div/>").addClass("goods_detail");
		var $p = $("<p/>").addClass("table_cell");
		var $pp = $("<p/>");
		//单样商品的总价
		sum = goodList[i].price*goodList[i].num;
		//所有商品的总价
		sums += sum;
		//生成购物车商品样式
		$("<input/>").attr({type:"checkbox",name:"chb",checked:"checked"}).appendTo($divdetail);
		$("<a/>").append($("<img/>").attr({src:goodList[i].img}).addClass("good_img")).appendTo($divdetail);
		$("<span/>").addClass("gname").html(goodList[i].entitle).appendTo($p);
		$("<br/>").appendTo($p);
		$("<span/>").addClass("gcs").html(goodList[i].color+"/"+goodList[i].size).appendTo($p);
		$("<br/>").appendTo($p);
		$("<a/>").attr({title:"修改",}).addClass("cart_edit").appendTo($p);
		$("<a/>").attr({title:"收藏",}).addClass("cart_fav").appendTo($p);
		$("<a/>").attr({title:"删除",}).addClass("cart_del").appendTo($p);
		$("<div/>").addClass("goods_title").append($p).appendTo($divdetail);
		$divdetail.appendTo($li);
		$("<div/>").addClass("goods_price").append($("<span/>").html("¥"+goodList[i].price)).appendTo($li);
		$("<div/>").addClass("goods_emoney").append($("<span/>").html("¥"+goodList[i].emoney)).appendTo($li);
		$("<a/>").addClass("reduce").appendTo($pp);
		$("<input/>").attr({type:"text",name:"qty",maxlength:"3"}).addClass("goodsnum").val(goodList[i].num).appendTo($pp);
		$("<a/>").addClass("plus").appendTo($pp);
		$("<div/>").addClass("goods_qty").append($pp).appendTo($li);
		$("<div/>").addClass("goods_sum").append($("<span/>").html("¥"+sum)).appendTo($li);
		$li.appendTo($ul);
	}
	$ul.appendTo($(".cart_body"));
	
	var $listprice = $(".list_k .cart_price");
	var $hdyhprice = $(".hdyh_k .cart_price");
	var $hyyhprice = $(".hyyh_k .cart_price");
	$listprice.html(sums);
	$hdyhprice.html("0");
	$hyyhprice.html(sums);
}

function clicks () {//删除购物车内商品
	var $lis = $(".cart_body ul li");
	var $del = $lis.find(".cart_del");
	var $reduce = $lis.find(".reduce");
	var $plus = $lis.find(".plus");
	$.each($del, function(idx,ele) {//遍历删除按钮
		$(this).on("click",function () {
			//获取cookie
			var listcookie = getCookie("goodscke");
			var goodList = JSON.parse(listcookie);
			//移除当前商品
			$lis.eq(idx).remove();
			//删除cookie数组中的当前下标
			goodList.splice(idx,1);
			//存入cookie中
			var goodscookie = JSON.stringify(goodList);
			var d = new Date(10);
			//把字符串存入cookie中
			var goodscke = setCookie("goodscke",goodscookie,d,"/");
			//更新购物车商品总件数
			listcart();
			//重新拉取cookie设置购物车
			goodsCart()
		});
	});
	
}