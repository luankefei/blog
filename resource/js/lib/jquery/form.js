// form
define(function(require, exports, module) {

	module.exports = {
		init: function(){
			_bindUI()
		}	
	}	// end module.exports
	
	function _bindUI(){
		$(".select").live('click', function(e){
			var list = $(this).find('.select-list')
			if (list.css('display') == 'none') {
				var value = $(this).attr('value');
				$(this).find('li[value=' + value + ']').addClass('select-list-value')
				
				list.show()
				$(this).addClass('dropdown-selected')
			} else {
				$(this).attr('style', '')
				list.hide()
				$(this).removeClass('dropdown-selected')
			}
			e.preventDefault()
		});
	
		$('.select-list li').live('click', function(e){
			var text = $(this).text()
			
			var value = $(this).attr('value')
			$(this).parent().find('.select-list-value').removeClass('select-list-value')
			
			var parent = $(this).parent().parent().parent();
			parent.find('.select-list-value').text(text)
			parent.attr('value', value);

			//window.location.href = $(this).attr('href')
		});
	
		// 关闭下拉列表
		
		document.addEventListener('mousedown', function(e) {
			var target = e.target || e.srcElement
			
			while (target != document && !$(target).hasClass('select')) {
				if (target.parentNode == null) {
					break
				}
				target = target.parentNode
			}
			if (target == document) {
				$('.select-list').hide()
			} else {
				var b = $('.dropdown-selected')
				for (var i = 0; i < b.length; i++) {
					if (b[i] != target) {
						$(b[i]).find('.select-list').hide()
						$(b[i]).removeClass('dropdown-selected')
					}
				}
			}
		}, false)
	}	// end _bindUI
	
	String.prototype.replaceAll = function(s1, s2){    
		return this.replace(new RegExp(s1, 'gm'), s2)    
	}
})	// end define

