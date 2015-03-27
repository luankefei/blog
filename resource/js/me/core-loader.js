ME.core.loader = {}

ME.core.loadering = false

ME.core.loader.get = function(url, callback) {

    var key = url
    var index = key.indexOf('.')

    var startIndex = url.lastIndexOf('/') + 1
    var endIndex = url.indexOf('?')

    if (endIndex != -1) {

        key = key.substring(startIndex, endIndex)

    } else {

        key = key.substring(startIndex)

    }

    key = key.toLowerCase()

    // 截取出文件名，并转化为大写，作为向resource读取使用的key
    if (index !== -1) {
        key = key.substring(0, index)
    }

    var resource = ME.resource.page[key]
    // 加载css、js等资源
    ME.core.loader.loadResource(resource)
}

ME.core.loader.addStyle = function(path, callback) {

    ME.core.loadering = true

    var loading = []

    if (path.slice && path.push) {

        for (var i = 0; i < path.length; i++) {
            loading.push('loading')

            // 延长i的生存周期到回调结束
            !function(i) {

                var head = document.get

                var head = document.getElementsByTagName('head')[0]
                var link = document.createElement('link')

                link.href = path[i]
                link.rel = 'stylesheet'
                link.type = 'text/css'

                link.onload = function() {
                    delete loading[i]
                }

                head.appendChild(link)

            }(i)
        }

    } else {

        var head = document.getElementsByTagName('head')[0]
        var link = document.createElement('link')
        var index = loading.length

        link.href = path
        link.rel = 'stylesheet'
        link.type = 'text/css'

        loading.push(link)

        link.onload = function() {
            delete loading[index]
        }

        head.appendChild(link)
    }

    // 这里等待所有css加载完毕
    var wait = setInterval(function() {

        var state = true

        for (var i = 0; i < loading.length; i++) {
            if (typeof loading[i] !== 'undefined') {
                state = false
            }
        }

        if (state === true) {
            ME.core.loadering = false
            clearInterval(wait)
        }
    }, 200)

    callback && callback()
}

ME.core.loader.addScript = function(path, callback) {

    if (path.slice && path.push) {

        for (var i = 0; i < path.length; i++) {

            seajs.use(path[i])
        }

    } else {

        seajs.use(path)

    }

    callback && callback()

}


ME.core.loader.resetStyle = function(pageStyle, callback) {

    var loadArr = []
    var links = $('link')

    for (var i = 0; i < links.length; i++) {
        var link = links.eq(i)

        if (link.attr('data-type') != 'common') {
            link.remove()
        }
    }

    callback && callback(pageStyle)

    return 0
}

ME.core.loader.resetScript = function(pageScript, callback) {

    var loadArr = []
    var scripts = $('script')

    for (var i = 0; i < scripts.length; i++) {

        var script = scripts.eq(i)

        if (script.attr('data-type') !== 'common') {
            script.remove()
        }
    }

    callback && callback(pageScript)
}


ME.core.loader.loadResource = function(resource) {

    // 对比资源池，移除多余的css
    ME.core.loadering === true

    // 在清空css之前先清空页面代码
    $('#view').html('')

    // 根据页面所需css进行重置
    ME.core.loader.resetStyle(resource['css'], ME.core.loader.addStyle)

    var loop = 0

    var wait = setInterval(function() {

        ++loop

        if (ME.core.loadering === false || loop > 20) {

            clearInterval(wait)

            ME.ui.loadPage(resource['file'], function() {

                if (console.clear) {
                    // 清空控制台信息
                    console.clear()
                }

                //console.log('%c\n  \n      永远年轻，永远热泪盈眶\n O ever youthful, O ever weeping\n   ', 'color:#329b8e;font-family:Myriad Set Pro;')
                console.log('%c\n \n life is hard, be tough \n\n', 'color:rgb(237, 68, 65);font-size:13px;font-family:Myriad Set Pro;')

                ME.core.loader.resetScript(resource['js'], ME.core.loader.addScript)
            })
        }
    }, 200)
}