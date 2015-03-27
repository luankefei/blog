// 由body引入的控件
$(function() {
	$.fn.easybox = function(options) {
		var defaults = {
			title: '提示信息',
			content: '',
			width: 300,
			height: 80,
			isBlock: true,

			titleBackground: '#4f7a28'
			contentBackground: '#fff',
			
			contentColor:'#343434',
			titleColor: '#ff6b2a',
			border:0
		};
		
		// 初始化函数
		!function() {
			var options = $.extend(defaults, options)

			buildUI(options)
		}()

		function buildUI = function(opetions) {
			var html = ''
		}
		
		var $this = $(this)								//当然响应事件对象
		
		//功能代码部分
			
		//绑定事件
		$this.live(options.Event,function(e){
			alert(options.msg);
		});
	}
	



	//绑定元素事件
	$("body").easybox({
		title : "标题",   							    //触发响应事件
		content : "这是一个jquery插件!"					//显示内容
		type: 'alert'
	});
});