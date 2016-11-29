function indexload () {
	$.ajax({//轮播图
		url:"assets/Json/lcarousel.json",
		dataType:"json",
		success:function (res) {
			//console.log(res);
			//生成轮播图的结构和图片
			var $ul = $("<ul></ul>");
			var $lcarousel = $("<div></div>").addClass("lcarousel");
			$.each(res, function(idx,item) {
				var $li = $("<li></li>");
				var $img = $("<img />");
				$img.attr({src:item.imgurl}).appendTo($li);
					$li.appendTo($ul);
			});
			$ul.prependTo($lcarousel);
			$lcarousel.prependTo($(".wraper"));
			//调用轮播图方法
			$lcarousel.lcarousel({
				width:1100,
				height:400,
				type:"x"
			});
		}
	});
	
	var $img = $(".image");
	$.map($img,function (item,idx) {
		//经过图片是显示商品信息
		$(item).on("mouseenter",function () {
			$(this).parent(".tab_wrap").css({position:"relative"});
			$(this).parent().find(".etc_wrap").css({display:"block"});
		}).on("mouseleave",function () {//离开图片是隐藏商品信息
			$(this).parent(".tab_wrap").css({position:"inherit"});
			$(this).parent().find(".etc_wrap").css({display:"none"});
		});
	});
	//新品
	(function new_list() {
		$.ajax({
			url:"assets/Json/new_list.json",
			dataType:"json",
			success:function (res) {
				//console.log(res);
				var $ul = $("<ul></ul>");
				$.each(res, function(idxs,items) {
//						console.log(items.id);
					var $li = $("<li></li>");
					var $a = $("<a></a>");
					var $img = $("<img />");
					$img.attr({src:items.imgurl}).appendTo($a);
					$a.attr({href:items.url}).appendTo($li);
					$("<p></p>").html(items.gicon).addClass("GIcon").appendTo($li);
					$li.append($("<p></p>").addClass("Gtitle").append($("<a></a>").attr({href:items.url}).html(items.han_title)));
					$("<p></p>").addClass("Gtitle").append($("<a></a>").attr({href:items.url}).html(items.title)).appendTo($li);
					$("<p></p>").addClass("Gname").append($("<a></a>").attr({href:items.url}).html(items.english_title)).appendTo($li);
					$("<p></p>").addClass("Gprice").html(items.price).appendTo($li);
					$li.appendTo($ul);
				});
				$ul.addClass("goodslist").appendTo($(".new_list"));
			}
		});
	})();
	//爆款商品
	(function goods_list() {
		$.ajax({
			url:"assets/Json/goodslist.json",
			dataType:"json",
			success:function (res) {
				//console.log(res);
				//生成一个ul
				var $ul = $("<ul></ul>");
				//便利goodslist.json，即res
				$.each(res, function(idxs,items) {
					var $li = $("<li></li>");
					var $a = $("<a></a>");
					var $img = $("<img />");
					//给$img添加src
					$img.attr({src:items.imgurl}).appendTo($a);
					//给$a添加href
					$a.attr({href:items.url}).appendTo($li);
					$("<p></p>").html(items.gicon).css({"color":"red","font-weight": "bold","font-size":"14px"}).appendTo($li);
					$li.append($("<p></p>").addClass("Gtitle").append($("<a></a>").attr({href:items.url}).html(items.han_title)));
					$("<p></p>").addClass("Gtitle").append($("<a></a>").attr({href:items.url}).html(items.title)).appendTo($li);
					$("<p></p>").addClass("Gname").append($("<a></a>").attr({href:items.url}).html(items.english_title)).appendTo($li);
					$("<p></p>").addClass("Gprice").html(items.price).appendTo($li);
					$li.appendTo($ul);
				});
				$ul.addClass("goodslist").appendTo($(".goods_list"));
			}
		});
	})();
}
