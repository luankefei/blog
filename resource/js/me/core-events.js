'use strict'


ME.core.events = {}



// 自运行函数用来获取通过地址访问页面的情况
ME.core.formatUrl = function(url) {

    var index = url.indexOf('#')

    url = url.substring(index + 1)

    if (index === -1 || url === '' || url === '/') {
        url = 'index'
    }

    return url
}

!function() {

    var url = window.location.href

    url = ME.core.formatUrl(url)

    ME.core.loader.get(url)
}()

window.addEventListener('hashchange', function() {

    var url = window.location.href

    url = ME.core.formatUrl(url)

    ME.core.loader.get(url)
})

