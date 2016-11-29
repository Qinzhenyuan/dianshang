function goods_list () {
	$.ajax({
		url:"../assets/Json/lists.json",
		dataType:"json",
		success:function (res) {
			//console.log(res);
			//生成一个ul
			var $ul = $("<ul></ul>");
			//便利goodslist.json，即res
			$.each(res, function(idxs,items) {
				//console.log(items.star);
				if (items.star == "1") {
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
					$("<p></p>").addClass("Gprice").html("¥ "+items.price).appendTo($li);
					$li.appendTo($ul);
					$li.on("click",$(".list_items"),function () {
						var listId = setCookie("listId",items.id);
					});
				}
				
			});
					
			var i = 1;
			$(window).scroll(function () {
				var $scrollTop = $(document).scrollTop();
				if ($scrollTop > $(document).height() - $(window).height() - $(".guarantee").outerHeight()-$(".footer").outerHeight()) {
					i++;
					$.each(res, function(idxs,items) {
						if (items.star == i) {
							console.log(items.star);
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
							$li.on("click",$(".list_items"),function () {
								var listId = setCookie("listId",items.id);
							});
						}
					});
				}
			});
			$ul.addClass("salelist").appendTo($(".list_items"));
		}
	});
	
	
	
}