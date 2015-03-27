// 由body引入的控件
$(function() {
	$.fn.toolbar = function(options) {
		var defaults = {
			x: null,
			y: null,
			bind: null
		};
		
		var buildUI = function(options) {
			var html = ''
			html = '<div class="toolbar-group">\
		                <div id="select-format" class="select font">\
		                    <span class="select-list-value">微软雅黑</span>\
		                    <i></i>\
		                    <div class="select-wrapper">\
		                        <ul class="select-list">\
		                            <li>宋体</li>\
		                            <li>黑体</li>\
		                            <li>微软雅黑</li>\
		                        </ul>\
		                    </div>\
		                </div>\
		            </div>\
		            <div class="toolbar-group">\
		            	<input class="size" type="text" value="12" />\
		            	<i class="px"></i>\
		            </div>\
		            <div class="toolbar-group">\
		                <button class="bold"></button>\
		                <button class="italic"></button>\
		            </div>\
		            <div class="toolbar-group align-group">\
		                <button class="left"></button>\
		                <button class="center"></button>\
		                <button class="right"></button>\
		                <button class="justify"></button>\
		            </div>\
		            <div class="toolbar-group">\
		                <button class="color">\
		                    <span class="line"></span>\
		                </button>\
		                <button class="background">\
		                    <span class="line"></span>\
		                </button>\
		            </div>'

			$this.html(html)
			// $this.css('x', x).css('y', y).show()
		}

		//var $this = $(this).parent()
		var $this = $(this)
		var $control = null
		// 初始化函数
		!function() {
			var options = $.extend(defaults, options)

			buildUI(options)
		}()
		
		this.bindControl = function($c) {
			// defaults.bind = $c
			$control = $c
			// 标记绑定的控件为toolbar
			$control.attr('data-binding', 'toolbar')
			// 双击的时候激活控件
			$control.bind('dblclick', function() {
				var x = $control.offset().left
				// 这里要减去工具条的高度
				var y = $control.offset().top - 36

				// 重置默认值
				defaults.x = x	
				defaults.y = y
				// 移动条的位置
				$this.css('top', y + 'px')
					.css('left', x + 'px')
					.show()

				// 隐藏上面两个缩放点
				$('#zoom-upper-left').hide()
				$('#zoom-upper-right').hide()
			})

			$control.text('测试的文字')
		}

		// 测试的换字体
		$this.find('.font li').on('click', function() {
			var font = $(this).text()

			$control.css('font-family', font)
		})

		// 测试的换字号
		$this.find('.size').on('blur', function() {
			var size = $(this).val()
			// 判断是否是数字
			if (/[^\d]/.test(this.value)){
				alert('字号必须是数字')
				$(this).val('14')
			} else {
				console.log('是数字')
				$control.css('font-size', size + 'px')	
			}

			
		})

		// 测试的加粗
		$this.find('.bold').on('click', function() {
			var state = $(this).hasClass('selected')
			if (state) {
				$control.css('font-weight', 'normal')
				$(this).removeClass('selected')
			} else {
				$control.css('font-weight', 'bold')
				$(this).addClass('selected')
			}
		})

		// 测试的斜体
		$this.find('.italic').on('click', function() {
			var state = $(this).hasClass('selected')
			if (state) {
				$control.css('font-style', 'normal')
				$(this).removeClass('selected')
			} else {
				$control.css('font-style', 'italic')
				$(this).addClass('selected')
			}
		})

		$this.find('.align-group button').on('click', function() {
			var state = $(this).hasClass('selected')
			if (!state) {
				if ($(this).hasClass('left')) {
					$control.css('text-align', 'left')
				} else if ($(this).hasClass('right')) {
					$control.css('text-align', 'right')
				} else if ($(this).hasClass('center')) {
					$control.css('text-align', 'center')
				} else if ($(this).hasClass('justify')) {
					$control.css('text-align', 'justify')
				}

				$('#toolbar .align-group button').removeClass('selected')
				$(this).addClass('selected')
			}
		})


		
		//功能代码部分
			
		//绑定事件
		/*
		$this.live(options.Event,function(e){
			alert(options.msg);
		});
		*/
		return this
	}


	//绑定元素事件
	/*
	$("body").easybox({
		title : "标题",   							    //触发响应事件
		content : "这是一个jquery插件!"					//显示内容
		type: 'alert'
	});
*/
});