ME.ui.form = {}

ME.ui.form.initDropdown = function() {
    // 选中未初始化的dropdown标签
    var dropdown = $('dropdown[data-init!="true"]')
    console.log(dropdown)

    var html = '<span class="select-value"></span>' 
            + '<i></i>' 
            + '<div class="select-wrapper">' 
            + '<div class="select-list">' 
            + '<ul></ul>' 
            + '</div>' 
            + '</div>'

    dropdown.addClass('select')
    dropdown.html(html)
    dropdown.attr('data-init', 'true')
}

// form
ME.ui.form.toggleCheckbox = function($this) {
    if ($this.attr('data-value') === 'checked') {
        $this.attr('data-value', '')

    } else {
        $this.attr('data-value', 'checked')
    }
}


$(document).ready(function() {

    $('.checkbox').live('click', function(e) {
        ME.ui.form.toggleCheckbox($(this))

        e.preventDefault()
    })


    $('.select').live('click', function(e) {

        var list = $(this).find('.select-list')
        if (list.css('display') == 'none') {
            list.show()

            $(this).addClass('dropdown-selected')
        } else {
            $(this).attr('style', '')
            list.hide()
            $(this).removeClass('dropdown-selected')
        }
        e.preventDefault();
    });


    $('.select-list li').live('click', function(e) {
        var text = $(this).text()
        var id = $(this).attr('data-id')
        var parent = $(this).parent().parent().parent().parent()

        $(this).parent().find('.select-list-value').removeClass('select-list-value')

        parent.find('.select-value').text(text)
        parent.attr('data-id', id)

        $(this).addClass('select-list-value')
    })


    // 关闭下拉列表
    document.addEventListener('mousedown', function(e) {
        var target = e.target || e.srcElement;

        // 判断是否是点击搜索建议列表
        /*
        if (!$(target).hasClass('searchSuggestionNode')) {
            $('#search-suggestion').hide()
        }
        */

        while (target != document && !($(target).hasClass('select') || $(target).hasClass('context'))) {
            if (target.parentNode == null) {
                break;
            }
            target = target.parentNode;
        }
        if (target == document) {
            $('.select-list').hide()
            //$('.context').hide();
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

})  // end document.ready
