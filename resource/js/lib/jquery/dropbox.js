// 由body引入的控件
$(function() {
	$.fn.dropbox = function(options) {
		var defaults = {
			x: 0,
			y: 0,
			z: 9,
			width: 800,
			height: 30,
			background: '#fff',
			borderWidth: 1,
			borderColor: '#bababa',
			content: '',
			//name: 'dropbox'
		};

		var options = $.extend(defaults, options)
		var $this = $(this)
		var _editor = null

		var buildUI = function(options) {
			$this.css('position', 'absolute')
				//.attr('id', options.name)
				.addClass('usertext')
				.css('top', options.x)
				.css('left', options.y)
				.css('width', options.width)
				.css('minHeight', options.height)
				.css('background', options.background)
				.css('borderWidth', options.borderWidth)
				.css('borderColor', options.borderColor)
				.css('lineHeight', options.height + 'px')

		}	// end function -> buildUI

		// 初始化函数
		!function() {
			buildUI(options)
			$('body').append('<div id="editor">editor</div>')

			seajs.use('/Public/js/lib/ckeditor/ckeditor', function(){
				_editor = CKEDITOR.replace('editor', {
					width: options.width,
					height: 60
				})

				// 去除ckeditor的脚部
				_editor.setData(options.content)
			})	// end of seajs.use

			$('#cke_editor').hide()
		}()

		// 单击添加虚线边框
		$this.live('mousedown', function(e) {
			console.log('mousedown')
			// 移除其他的dragging
			// 应该用样式控制
			$this.css('border', '1px dashed #ccc')
			$this.addClass('dragging')

			$(document).bind('mousemove', function(e) {
				$this.css('left', e.pageX - 50)
				$this.css('top', e.pageY - 10)

				$('#reference-x').css('top', e.pageY - 10)
								.css('left', 0)
								.css('width', $(document).width())
								.show()

				$('#reference-y').css('top', 0)
								.css('left', e.pageX - 50)
								.css('height', $(document).height())
								.show()
			})

			// 显示5个点
			e.preventDefault()
		})
		// 双击编可辑
		$this.live('dblclick', function(e) {
			var left = $this.css('left')
			var top = $this.css('top')

			console.log('left: ' + left + ' , top: ' + top)

			$('#cke_editor').css('left', left)
							.css('top', parseInt(top.substring(0, top.length - 2)) - 40 + 'px')
							.css('position', 'absolute')
							.css('z-index', '9')
							.show()

			e.preventDefault()
		})

		// 关闭ckeditor的编辑
		document.addEventListener('click', function(e) {
			var target = e.target || e.srcElement
			
			while ((target != document && $(target).attr('id') != 'cke_editor') && (target != document && !$(target).hasClass('usertext'))) {				
				if (target.parentNode == null) {
					break
				}
				target = target.parentNode
			}
			if (target == document) {
				$('#cke_editor').hide()
	            // 将ckeditor中的内容插入到控件编辑区
	            $this.html(_editor.document.getBody().getHtml())
			}
		}, false);
		
		$(document).live('mouseup', function() {
			$(document).unbind('mousemove')
			$('#reference-x').hide()
			$('#reference-y').hide()
		})
	}
});