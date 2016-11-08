$(document).ready(function() {
	var audio = $("#audio").get(0);
	var play = $("#play");
	var current = $("#current-time");
	var duration = $("#duration");
	var progress = $("#progress");
	var next = $("#next");
	var previous = $("#previous");

	var pi = $("#p-i");
	var pii = $("#pii");
	var vi = $("#v-i");
	var yinliang = $("#yinliang");
	var bcir = $("#r");
	var jin = $("#jin");	
	var quan= $("#quan");	
	var dchu=$('#bottom-right')
	var chu1=$('#right-chu');
	var gb=$('#gb')
	
//时间
	function format(v) {
		v = Math.floor(v);
		var s = v % 60;
		s = (s < 10) ? ("0" + s) : s;
		var m = Math.floor(v / 60);
		return m + ':' + s;
	}
	audio.oncanplay = function() {
		duration.html(format(audio.duration))
	}
	
	
//	按钮
	play.on("touchend", function() {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	})
	$(audio).on("play", function() {
		$('#play').css({"background":"url(img/b2.jpg)no-repeat"},{"background-size":"cover"});
		//		console.log(this)
//		console.log($('#play').css)
	});
	$(audio).on("pause", function() {
		$("#play").css({"background":"url(img/b1.jpg)no-repeat"},{"background-size":"100%"});
	});










	//	音乐进度条变长
	$(audio).on("timeupdate", function() {
		current.html(format(audio.currentTime));
		var width = progress.width() * audio.currentTime / audio.duration;
		pi.css("width", width);
	})
	$(audio).on("timeupdate", function() {
		current.html(format(audio.currentTime));
		var left = progress.width() * audio.currentTime / audio.duration;
		pii.css("left", left);
	})

	pi.on("touchend", false);
	bcir.on("touchend", false);


	
	
	
	
//	静音
	
	
//	音量进度
	bcir.on("mousedown", function(e) {
		var r = bcir.width() / 2;
		var starts = r - e.offsetX;
		$(document).on("mousemove", function(e) {
			var left = e.clientX - yinliang.position().left + starts;
			var x = left / yinliang.width();
			audio.volume = x;
		})
		return false;
	})
	$(document).on("mouseup", function() {
		$(document).off("mousemove");
	})


	yinliang.on("click", function(e) {
		audio.volume = e.offsetX / yinliang.width();
		jin.removeAttr("v");
	});
	
	
//	静音
	jin.on("touchend", function() {
		if ($(this).attr("v")) {
			//自定义
			audio.volume = $(this).attr("v");
			$(this).removeAttr("v")
			$('#jin').css({"background":"url(img/yl1.jpg)"});

		} else {
			$(this).attr("v", audio.volume)
			audio.volume = 0;
			$('#jin').css({"background":"url(img/yl2.jpg)"});

		}

	})
	

		
$(audio).on("volumechange", function() {
		r.style.left = yinliang.width() * audio.volume - bcir.width() / 2 + "px";
	});
	
	






	//	歌曲
	var index = 1;
	var music = [{
		name: "Delacey",
		zuozhe: 'Delacey',
		src: "Delacey.mp3"
	},{
		name: "jessl",
		zuozhe: 'jessl',
		src: "jessl.mp3"
	},{
		name: "寂寞DNA",
		zuozhe: 'DNA',
		src: "DNA.mp3"
	}, {
		name: "hong",
		zuozhe: '红',
		src: "hong.mp3"
	}] 
	

	//添加歌曲列表

	function add() {
		$("#uls").empty();
		$.each(music, function(i, v) {

			var c = (i === index) ? "active" : "";

			$('<li class="' + c + '"><span>' + music[i].name + '</span><span>' + music[i].zuozhe + '</span><span>' + music[i].src + '</span></li>').appendTo("#uls");

		})
	}

	//歌曲链接

	$("#uls").on("touchend", "li", function() {
		$('#uls').find("li").removeClass("active");
		$(this).addClass("active")
		index = $(this).index();
		audio.src = music[index].src;
		audio.play();
	})
	add();
//	//	
//	//	
//	//下一首
//
	next.on("touchend", function() {
		var indexs = index + 1;
		if (indexs >= music.length) {
			indexs = 0;
		}
		$('#uls').find("li").removeClass("active");
		$('#uls').find("li").eq(indexs).addClass("active")

		
		audio.src = music[indexs].src;
		audio.play();

		index = indexs;
	})
//	next.on("touchend",function(){
//		$('#quan').css({"background":"url(img/11.jpg)no-repeat"},{"background-size":"100%"});
//	})

	//上一首

	previous.on("touchend", function() {
		var indexs = index - 1;
		if (indexs < 0) {
			indexs = 2;
		}
		$('#uls').find("li").removeClass("active");
		$('#uls').find("li").eq(indexs).addClass("active")

		audio.src = music[indexs].src;
		audio.play();

		index = indexs;
		
	})
//	previous.on("touchend",function(){
//		$('#quan').css({"background":"url(img/11.jpg)no-repeat"},{"background-size":"100%"});
//	})
	dchu.on("touchend",function(){
		chu1.css("display","block").animate({"height":"7rem"},1000)
	})
	gb.on("touchend",function(){
		chu1.css("display","none").animate({"height":"0rem"},1000)
	})
})