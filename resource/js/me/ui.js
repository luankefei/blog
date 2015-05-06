'use strict'


ME.ui = {}

ME.ui.initNav = function() {

    // 如果当前也蛮不是首页，显示首页链接
    if (window.location.href !== '/') {
        $('nav > ul > li').first().show()

    } else {
        console.log(window.location.href)
    }
}

ME.ui.loadPage = function(url, callback) {

    url = url + '?t=' + Math.random()

    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {

        var loading = document.getElementById(ME.resource.LOAD_BAR)

        if (xhr.readyState == 1) {
            loading.style.width = '0%'
            loading.style.display = 'block'


        } else if (xhr.readyState == 2) {
            // 这时可以取到content-length
        } else if (xhr.readyState == 3) {
            
            // 计算进度条的百分比
            var width = xhr.response.length / xhr.getResponseHeader('content-length') * 100 + '%'

            var state = $(loading).is(':animated')

            if (state) {
                $(loading).stop()
            }

            $(loading).css('width', width)
            
        } else if (xhr.readyState == 4 && xhr.status == 200) {

            // 读取进度条            
            var state = $(loading).is(':animated')

            if (state) {
                $(loading).stop()
            }

            $(loading).animate({ width: '100%'}, 400)
                .delay(200)
                .fadeOut(400, function() {
                    $(this).hide()
                })


            document.getElementById(ME.resource.VIEW).innerHTML = xhr.response
            // 执行回调
            callback && callback(xhr.response)
        }
    }

    xhr.open('GET', url, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(null)
}


// 显示背景层
ME.ui.toggleShadow = function() {

    var body = document.getElementsByTagName('body')[0]
    var layer = document.getElementById('you_cant_see_me')
    var state = layer.style.display

    if (state == 'none' || state == '') {
        body.setAttribute('class', 'is_overflow_box')
        
        layer.style.height = document.documentElement.scrollHeight + 'px'
        layer.style.top = body.scrollTop
        layer.style.display = 'block'

    } else {
        body.setAttribute('class', 'body_normal')
        layer.style.display = 'none'
    }
}

// 初始化页脚的位置
ME.ui.initFooter = function() {

    // 获取屏幕高度
    var windowHeight = document.body.clientHeight + document.body.scrollTop

    var footer = document.getElementById('footer'),
        footerHeight = footer.height,
        footerTop = footer.offsetTop
        footerPadding = windowHeight - footerHeight - footerTop
    
    if (footerPadding > 0) {

        footer.style.marginTop = footerPadding
        footer.style.display = 'block'
    }

    // 获取屏幕高度
    // var windowHeight = $(window).height()
    // var footer = $('footer').first()
    // var footerTop = footer.offset().top
    // var footerHeight = footer.height()
    // var footerPadding = windowHeight - footerHeight - footerTop

    // if (footerPadding > 0) {
    //     footer.css("margin-top", footerPadding).show()
    // }
}