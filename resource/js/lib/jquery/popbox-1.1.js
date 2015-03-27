/**
 * Author:	DK
 * Email:	dukai86@gmail.com
 * Blog:	http://www.dklogs.net
 */

var BasePopBox = function(options){
	this.title = "Message";
	this.options = {
		custombtns: [],
		title: '提示信息',
		width: 300,
		height: 0,
		dragable: false,
		isBlock: true,
		background: '#4F7A28',
		color:'#343434',
		border:0
	};
	if(options){
		for(var key in options){
			this.options[key] = options[key];
		}
	}

	this.customEvents = {};
	this.model = null;
	this.isBlock = true;
	//dom fields
	this.container_dom = null;
	this.content_dom = null;
	this.title_dom = null;
	this.header_dom = null;
	this.ctrlbtns_dom = null;
	this.coverLayer_dom = null;
	this.funcbtns_dom = null;
	this.funcBtns = {};
	
	
	var self = this;
	
	self.initialize = function(){
		if(!self.container_dom){
			self.initializeUI();
			self.initializeEvents();
		}
	};
	
	self.initializeUI = function(){
		
		self.funcBtns.cancel = dkit.$c('a', null, 'dkit-popbox-btn-cancel');
		self.funcBtns.cancel.innerHTML = '取消';
		self.funcBtns.cancel.btntype = 'cancel';
		self.funcBtns.confirm = dkit.$c('a', 'dkit-popbox-confirm', 'dkit-popbox-btn-confirm');
		//self.funcBtns.confirm.value = "确定";
		self.funcBtns.confirm.innerHTML = "确定";
		self.funcBtns.confirm.btntype = 'confirm';
		self.funcBtns.custom = dkit.$c('a', null, 'dkit-popbox-btn-custom');
		self.funcBtns.custom.btntype = 'custom';
		//获取浏览器窗口尺寸
		var browserSize = dkit.getBrowserSize();
		var docSize = dkit.getDocSize();
		
		//判断是否显示遮罩层
		if(self.options.isBlock){
			self.coverLayer_dom = dkit.$c('div');
			var coverHeight = docSize.height >browserSize.height ? docSize.height : browserSize.height;
			dkit.$$(self.coverLayer_dom).css({display:'none', position: 'absolute', background: '#000', opacity: '.5', top: 0, left: 0, width: '100%', height: coverHeight});
			document.body.appendChild(self.coverLayer_dom);
		}
		//生成popbox容器层
		self.container_dom = dkit.$c('div', null, 'dkit-popbox');
		var height = '';
		if(self.options.height == 'fill_parent'){
			height = dkit.getBrowserSize().height;
			height -= 100;
		}else if(self.options.height == 0){
			height = '';
		}
		dkit.$$(self.container_dom).css({'zIndex': 9999999, 'display': 'none', 'width': self.options.width, 'height': height, 'background': self.options.background, 'border':self.options.border});
		document.body.appendChild(self.container_dom);
		//生成头部
		self.header_dom = dkit.$c('div', null, 'dkit-popbox-header');
		self.title_dom = dkit.$c('span');
		if(self.options.title){
			self.title = self.options.title;
		}
		self.title_dom.innerHTML = self.title;
		//控制按钮容器
		self.ctrlbtns_dom = dkit.$c('div', null, 'dkit-popbox-ctrlbtns');
		self.close_ctrlbtn = dkit.$c('a', null, 'dkit-popbox-ctrlbtns-close');
		self.close_ctrlbtn.btntype = 'close';
		self.ctrlbtns_dom.appendChild(self.close_ctrlbtn);
		self.header_dom.appendChild(self.title_dom);
		self.header_dom.appendChild(self.ctrlbtns_dom);
		//内容容器
		self.content_dom = dkit.$c('div', null, 'dkit-popbox-content');
		// 改过，新增加一行
		dkit.$$(self.content_dom).css({'color': self.options.color});
		//功能按钮容器
		self.funcbtns_dom = dkit.$c('div', null, 'dkit-popbox-btnbox');
		self.renderBtns();
		
		self.container_dom.appendChild(self.header_dom);
		self.container_dom.appendChild(self.content_dom);
		self.container_dom.appendChild(self.funcbtns_dom);
		document.body.appendChild(self.container_dom);
	};
	
	self.initializeEvents = function(){
		dkit.addEvent(self.container_dom, 'click', function(e){
			var target = e.target;
			switch(target.btntype){
				case 'min':
					//alert('min');
					break;
				case 'close':
					self.close();
					break;
				case 'confirm':
					self.confirm();
					break;
				case 'cancel':
					self.cancel();
					break;
				case 'custom':
					self.execCustomBtnsEvent(target.funcid);
					break;
				default:
					break;
			}
		});
		dkit.addEvent(document, 'keypress', function(e){
			if(e.keyCode == 27){
				self.close();
			}
		});
		//注册拖动事件
		if(self.options.dragable){
			dragManager.regist(self.header_dom, self.container_dom);
		}
	};
	
	self.execCustomBtnsEvent = function(btnId){
		var customBtns = self.options.custombtns;
		btnId = parseInt(btnId);
		customBtns[btnId]['func'].call(self);
	};
	
	self.setContent = function(message){
		self.content_dom.innerHTML = message;
	};
	
	self.setTitle = function(title){
		self.title_dom.innerHTML = title;
	}
	
	self.setBoxPosition = function(left, top){
		if(arguments.length < 2){
			var browserSize = dkit.getBrowserSize();
			var width = dkit.$$(self.container_dom).width();
			var height = dkit.$$(self.container_dom).height();
			var left = Math.floor((browserSize.width / 2) - (width / 2));
			var top = Math.floor((browserSize.height / 2) - (height / 2));
		}
		
		dkit.$$(self.container_dom).css({'left': left, 'top': top});
	};
	
	self.renderBtns = function(){};//AbstractMethod	
	self.onShowEvent = function(){};
	self.onCloseEvent = function(){};
	
	self._show = function(){
		self.onShowEvent();
		// 打开背景层
		if(self.options.isBlock){
			//$(".body_normal").attr("class", "is_photo_box");
			$("#you_cant_see_me_alert").css("z-index", "1000000").css("display", "block");
			
			//self.coverLayer_dom.style.display = 'block';
		} else {
			//$(".body_normal").attr("class", "is_photo_box");			
			$("#you_never_see_me_alert").css("z-index", "1000000").css("display", "block");
		}
		self.container_dom.style.display = 'block';
		self.setBoxPosition();
		
		$("#dkit-popbox-confirm").focus();
	};
	
	self.show = function(){
		self._show();
	};
	
	self.close = function(){
		self.onCloseEvent();
		
		//$(".is_photo_box").attr("class", "body_normal");
		$("#you_cant_see_me_alert").css("z-index", "9").hide();
		$("#you_never_see_me_alert").css("z-index", "9").hide();
		
		if(self.options.isBlock) {
			self.coverLayer_dom.style.display = 'none';
		}
		self.container_dom.style.display = 'none';
	};
	self.onConfirmEvent = function(){};
	self.confirm = function(){
		self.onConfirmEvent();
		self.close();		
	};
	
	self.onCancelEvent = function(){};
	self.cancel = function(){
		self.onCancelEvent();
		self.close();
	};
};

BasePopBox.Model = {
	'dialog':	0,
	'alert':	1,
	'confirm':	2,
	'toast': 	3
};

var DialogBox = function(id, options){ //extends BasePopBox
	BasePopBox.call(this, options);
	this.model = BasePopBox.Model.dialog;

	var type = /<[^>]+?>/.test(id);
	if(!type){
		var node = dkit.$(id);
		node.style.display = '';
		this.title = node.getAttribute('boxtitle');
	}
	this.renderBtns = function(){
		if(this.options && this.options.custombtns){
			this.funcbtns_dom.style.display = 'block';
			var custombtns = this.options.custombtns;
			for(var i = 0, len = custombtns.length; i < len; i ++){
				var btn = this.funcBtns.custom.cloneNode(true);
				btn.btntype = 'custom';
				btn.innerHTML = custombtns[i]['name'];
				btn.funcid = i;
				btn.custombtn = 'custombtn';
				this.funcbtns_dom.appendChild(btn);
			}
		}else{
			this.funcbtns_dom.style.display = 'none';
		}
		
	};
	this.initializeUI();
	this.initializeEvents();
	if(!type){
		this.content_dom.appendChild(node);
	}else{
		this.content_dom.innerHTML = id;
	}
};

var FrameBox = function(url, options){
	if(!options){
		options = {};
		options.dragable = false;
	}else if(options.dragable === undefined){
		
	}
	BasePopBox.call(this, options);
	
	this.renderBtns = function(){
		this.funcbtns_dom.style.display = 'none';
	};
	this.initializeUI();
	this.initializeEvents();
	var height = dkit.getBrowserSize().height;
	height -= 100;
	this.content_dom.innerHTML = '<iframe src="' + url + '" frameborder="0" width="100%" height="' + height + '"></iframe>';
}

var AlertBox = function(message, options){
	var options = self.options || {};
	options.background = "#fff";
	options.width = 300;
	//options.border = "12px solid #d6d6d6\0;"
	options.border = "12px solid #d6d6d6\0";
	
	BasePopBox.call(this, options);
	this.model = BasePopBox.Model.alert;
	this.renderBtns = function(){
		this.funcbtns_dom.style.display = "block";
		this.funcbtns_dom.appendChild(this.funcBtns.confirm);
	};
	
	this.show = function(message){
		if(message && message != ''){
			this.setContent(message);
		}
		this._show();
	}
	
	this.initializeUI();
	this.initializeEvents();
	this.setContent(message);
	
};

var ConfirmBox = function(message, options){
	var options = options || {};
	options.background = "#fff";
	options.width = 340;
	options.border = "12px solid #d6d6d6\0;"
	
	BasePopBox.call(this, options);
	
	this.renderBtns = function(){
		this.funcbtns_dom.appendChild(this.funcBtns.confirm);
		this.funcbtns_dom.appendChild(this.funcBtns.cancel);
	};
	
	this.show = function(positiveEvent, negativeEvent){
		if(positiveEvent)
			this.onConfirmEvent = positiveEvent;
		if(negativeEvent)
			this.onCancelEvent = negativeEvent;
		this._show();
	};
	
	this.initializeUI();
	this.initializeEvents();
	this.setContent(message);
};

var ToastBox = function(message, duration, options){ 

	// dkit.$$(content_dom).css({'color':'#fff'});
	var options = options || {};
	options.color = '#fff';

	if(!duration){
		duration = 3000;
	}
	BasePopBox.call(this, options);
	
	// 改过
	//this.options.isBlock = true;
	var self = this; 
	this.renderBtns = function(){
		this.funcbtns_dom.style.display = "none";
	};
	
	this.onShowEvent = function(){ 
		setTimeout(self.close, duration);
		
	};
	
	this.initializeUI();
	this.initializeEvents();
	this.header_dom.style.display = 'none';
	this.setContent(message);
};
//Toast Box 持续时间
ToastBox.long = 6000;
ToastBox.noraml = 3000;
ToastBox.short = 1000;
