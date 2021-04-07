var phone_width = $(window).width()*0.95;//canvas的宽度
var plus_1 = window.devicePixelRatio;//获取设备像素比
var img = document.getElementById("pic");
var img_w = 2558;//1.4150
var img_h = 1774;
var set_height = phone_width*(img_h/img_w);
//console.log(phone_width,set_height);
var small_width = phone_width*0.2;//smalldiv的宽度
var small_height = set_height*0.2;//samlldiv的高度
var small_div = document.getElementById("smalldiv");
small_div.style.width = small_width+"px";
small_div.style.height = small_height+"px";
var myCanvas = document.getElementById("myCanvas");
myCanvas.style.width = phone_width*0.55+"px";
myCanvas.style.height = set_height+"px";
myCanvas.width=phone_width*0.49*plus_1;
myCanvas.height=set_height*plus_1; 
myCanvas.style.marginLeft = "50%";
myCanvas.style.left = "-"+phone_width/2+"px";
var my_Canvas = document.getElementById("my_Canvas");
my_Canvas.style.width = phone_width+"px";
my_Canvas.style.height = set_height*1.5+"px";
my_Canvas.width=phone_width*plus_1;
my_Canvas.height=set_height*1.5*plus_1;
my_Canvas.style.marginLeft = "50%";
my_Canvas.style.left = "-"+phone_width/2+"px";
var ctx=myCanvas.getContext("2d");
var ctx_biger=my_Canvas.getContext("2d");

var img_biger = document.getElementById("pic_biger");
var smalldiv = $("#smalldiv");

var box_X = ""; //阴影横坐标
var box_Y = ""; //阴影纵坐标
var Name = new Array();
var j = 0;
var biao = "move"; //是否移动标志（move阴影移动，stay阴影消失，处于布点状态，保存布点后回复为move状态）
var state = "dian"; //点的状态标志（dian为布点状态，kan为布点保存后的状态，只能看参数）
por_obj = new Object();

function geturl(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
mui.plusReady(function() {
	//接收上一个页面的值
	var self = plus.webview.currentWebview();
	var sjc = self.CirSmp;
	var CSdA = self.CSdA;
//	console.log(sjc)
//	var my_popover = document.getElementById('my_popover'); //右上角菜单选项

	window.addEventListener('json', function(event) {
		ws = null;
		ws = plus.webview.currentWebview();
		// 显示遮罩层
		ws.setStyle({
			mask: "rgba(0,0,0,0.7)"
		});
		//关闭遮罩层
		ws.setStyle({
			mask: "none"
		});
	})
	window.addEventListener('json_1', function(event) {
		location.reload();
		ws = null;
		ws = plus.webview.currentWebview();
		// 显示遮罩层
		ws.setStyle({
			mask: "rgba(0,0,0,0.7)"
		});
		//关闭遮罩层
		ws.setStyle({
			mask: "none"
		});
	})
	mui.ajax(url + 'action_ins/point_get.php', {
		data: {
			scid: 1,
			sjc:sjc
		},
		type: "post",
		dataType: "json",
		timeout: 10000,
		success: function(data) {
			//	alert(data)
			var length = data.length;
			if(length > 1) {
				for(var i = 0; i < length - 1; i++) {
					var id = data[i].id;
					var X_zb = data[i].X;
					var Y_zb = data[i].Y;
					var X_father = data[i].X_father;
					var Y_father = data[i].Y_father;
					var name = data[i].测点类型;
					var cdzt = data[i].状态;
					var num = data[i].num;
					budian(id, X_zb, Y_zb, X_father, Y_father, name, cdzt, num);
				}
			}
			creat(length, X_zb, Y_zb, X_father, Y_father, data);
		},
		error: function(xhr, type, errorThrown) {
			console.log(type);
		}
	});
	var creat = function(length, X_zb, Y_zb, X_father, Y_father, data) {
		document.body.ontouchmove = function(e) {
			var loc = windowTocanvas(myCanvas, e.touches[0].pageX, e.touches[0].pageY);
			var x = parseInt(loc.x);
			var y = parseInt(loc.y);
			var mar_top = parseInt(loc.mar_t);
			var mar_left = parseInt(loc.mar_l);

			if(biao == "move") {
				smalldiv.show();
			}

			if(x < 0 && y < set_height) { //当鼠标的X坐标小于图片与div遮罩层的x坐标和是ｄｉｖｘ＝０；
				divX = mar_left;
			} else if(x >= 0 && x < phone_width - smalldiv.width() && y < set_height) { //鼠标的X坐标在图片内部并且小于图片最右边的X坐标
				divX = x + mar_left;
			} else if(x >= phone_width - smalldiv.width() && y < set_height) { //鼠标的X坐标大于图片的最右边的X坐标 （Y轴同理）
				divX = mar_left + phone_width - smalldiv.width();
			}

			if(y < 0) {
				divY = mar_top;
			} else if(y >= 0 && y < set_height - smalldiv.height()) {
				divY = mar_top + y;
			} else if(y > set_height - smalldiv.height() && y <= set_height) {
				divY = mar_top + set_height - smalldiv.height();
			} else if(y > set_height) {

			}
			smalldiv.css("top", divY).css("left", divX);
			var X = (divX - mar_left) * (img_w * 0.5 / phone_width);
			var Y = (divY - mar_top) * (img_w * 0.5 / phone_width);
			var M = small_width * (img_w * 0.5 / phone_width);
			var N = small_height * (img_w * 0.5 / phone_width);
			if(biao == "move") {
				ctx_biger.drawImage(img_biger, X * 2, Y * 2, M * 2, N * 2, 0, 0, 1968.7878, 1424.0265);//1.38255
			}
//			var zb = document.getElementById("zb");

			box_X = divX - mar_left;
			box_Y = divY - mar_top;

			for(var j = 0; j < length - 1; j++) {
				var cdzt = data[j].状态;
				if(cdzt == "save") {
					var X_zb = data[j].X;
					var Y_zb = data[j].Y;
					var X_father = data[j].X_father;
					var Y_father = data[j].Y_father;
					var num = data[j].num;
					var d_x = X_zb * phone_width;
					var d_y = Y_zb * set_height;
					var port = document.getElementById("port");
					var mainWidth = port.offsetWidth;
					var port_obj = port.getBoundingClientRect(); //用于获取点相对于视窗的位置集合
					var bbox = my_Canvas.getBoundingClientRect();
					var mar_top = bbox.top;
					var mar_left = bbox.left;
					var y_y = document.getElementById(data[j].num);
					var classname = y_y.getAttribute('class');
					classVal = classname.replace("bar", "Bar");
					y_y.setAttribute("class", classVal);
					var dian_left = (X_father * 4.95 + d_x + mar_left - port_obj.left - mainWidth / 2) - X * 2.65;
					var dian_top = (Y_father * 4.95 + d_y + mar_top - port_obj.top - mainWidth / 2) - Y * 2.65;
					y_y.style.marginLeft = dian_left + "px";
					y_y.style.marginTop = dian_top + "px";

					var diana = document.getElementById("dian");
					var dian_style = diana.getBoundingClientRect(); //用于获取点相对于视窗的位置集合
					var ca_mar_T = mar_top - dian_style.top;
					var ca_ma_L = mar_left - dian_style.left;
					if(dian_top < ca_mar_T || dian_top > (ca_mar_T + set_height)) {
						y_y.style.display = "none";
					} else {
						y_y.style.display = "block";
					}
				} else {
					
				}
//				console.log(dian_style.top + "||" + mar_top);
				zb.innerHTML = "坐标：" + (dian_top + "^" + ca_mar_T) + "||" + (y + "^" + mar_top);
			}
		};
	}
	var budian = function(id, X_zb, Y_zb, X_father, Y_father, name, cdzt, num) {
		var diana = document.getElementById("dian");
		var spa = document.createElement('span');
		spa.className = "mui-badge mui-badge-warning bar";
		spa.innerHTML = num;
		spa.id = num;
		spa.zt = cdzt;
		var uid = id;
		spa.style.display = "block";
		diana.appendChild(spa);

		//点击查看
		spa.addEventListener('tap', function() {
			if(spa.zt == "save") {
				ws = null;
				ws = plus.webview.currentWebview();
				// 显示遮罩层
				ws.setStyle({
					mask: "rgba(0,0,0,0.7)"
				});
				//打开新webview，模仿弹窗
				mui.openWindow({
					url: 'content.html',
					id: 'content',
					styles: {
						width: '70%',
						height: '58%',
						margin: 'auto'
					},
					extras: {
						uid: uid
					},
					show: {
						autoShow: true, //页面loaded事件发生后自动显示
						aniShow: 'slide-in-right', //页面显示动画
						duration: '100' //页面动画持续时间
					},
					waiting: {
						autoShow: false, //自动显示等待框
					},
				});
			} else {

			}
		});
	}

	function windowTocanvas(myCanvas, x, y) {
		var bbox = myCanvas.getBoundingClientRect();
		return {
			x: x - bbox.left,
			y: y - bbox.top,
			mar_t: bbox.top,
			mar_l: bbox.left,
		};
	}

	var point_x = ""; //放大区点横坐标
	var point_y = ""; //放大区点纵坐标
	var save_point = document.getElementById("save_point");

	my_Canvas.ontouchend = function(e) {};
	var flage = 0;
	mui('#dian').on('tap', 'span', function() { //布点点击
		var por = new Array(); //存点坐标
		var span_id = this.id;
		var span_zt = this.zt;
		//	alert(span_zt)
		var num = this.innerHTML; //编号
		var id_arr = span_id.split("|");
		var point_name = id_arr[0];
		var carid = id_arr[1]; //实测卡片id
		//	alert(this.name)
		if(span_zt != "save") {
			biao = "stay";
			smalldiv.hide();
			var point_id = this.id;
			var point = document.getElementById(point_id);
			var num = point.innerHTML;
			var port = document.getElementById("port");
			var mainWidth = port.offsetWidth;
			var port_obj = port.getBoundingClientRect(); //用于获取点相对于视窗的位置集合
			if(span_zt == "0") { //判断是否为待点区的点
				Name[j] = point_id;
				//			alert(Name)
				flage = 0;
				var classname = this.className;
				classVal = classname.replace("bar", "Bar");
				this.setAttribute("class", classVal);
				if(this.style.display == "block" && flage == 0) {
					this.style.display = "none";
					this.title = "y";
				}
				j++;
			}

		} else {

		}

		my_Canvas.ontouchstart = function(e) { //布点
			flage = 1;
			var loc = windowTocanvas(my_Canvas, e.touches[0].pageX, e.touches[0].pageY);
			point_x = parseInt(loc.x);
			point_y = parseInt(loc.y);
			var mar_top = parseInt(loc.mar_t);
			var mar_left = parseInt(loc.mar_l);
			//		var zb = document.getElementById("zb");
			//	    zb.innerHTML = "坐标："+(point_x)+"||"+(point_y); 

			point.style.display = "block";
			point.style.marginLeft = (point_x + mar_left - port_obj.left - mainWidth / 2) + "px";
			point.style.marginTop = (point_y + mar_top - port_obj.top - mainWidth / 2) + "px";

			por = [point_x / phone_width, point_y / set_height, box_X*2, box_Y*2, num]; //X坐标
			por_obj[point_id] = por; //将点及对应的坐标存入对象 
  
		}; 
	});   

	save_point.onclick = function() { 
		var bts = ["确认", "取消"];
		var messageStr = "输入批注内容";
		var defaultStr = ""; //风险等级
		var content = window.prompt(messageStr, defaultStr);
		//	alert(content); //返回输入框内的值
		biao = "move";
		state = "kan";
		por_obj["name"] = Name;
		por_obj["content"] = content;

		var ha = "'" + JSON.stringify(por_obj) + "'";
		console.log(ha);
		mui.ajax(url + 'action_ins/scbd.php', {
			data: por_obj,
			//		dataType:'json',//服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				alert(data);
				location.reload();
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
			}
		});
	};
});