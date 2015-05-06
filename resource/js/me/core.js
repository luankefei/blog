'use strict'


var ME = {}


/*
 * 功能：监听图片加载，调用回调
 * 参数：url, callback
 */
ME.core = {}


ME.core.imgReady = (function () {

    var list = [], intervalId = null,

    // 用来执行队列
    tick = function () {
        var i = 0;
        for (; i < list.length; i++) {
            list[i].end ? list.splice(i--, 1) : list[i]()
        };
        !list.length && stop()
    },

    // 停止所有定时器队列
    stop = function () {
        clearInterval(intervalId)
        intervalId = null
    };

    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image()

        img.src = url

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img)
            load && load.call(img)
            return
        }

        width = img.width
        height = img.height

        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img)
            onready.end = true
            img = img.onload = img.onerror = null
        }

        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
            ) {
                ready.call(img)
                onready.end = true
            }
        }
        onready()

        // 完全加载完毕的事件
        img.onload = function () {
            !onready.end && onready()

            load && load.call(img)

            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null
        }

        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready)
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40)
        }
    }
})()


/*
 * 功能：保存cookies函数
 * 参数：name，cookie名字；value，值
 */
ME.core.setCookie = function(name, value) {
    var Days = 360;   //cookie 将被保存两个月
    var exp  = new Date();  //获得当前时间

    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);  //换成毫秒
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/;domain=.tu.com';
}


/*
 * 功能：获取cookies函数
 * 参数：name，cookie名字
 */

ME.core.getCookie = function(name) {
    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))

    if (arr != null) {
        return unescape(arr[2])
    }

    return null
}

/*
 * 功能：删除cookies函数
 * 参数：name，cookie名字
 */
ME.core.delCookie = function(name) {
    var exp = new Date()
    var cval = this.getCookie(name)

    exp.setTime(exp.getTime() - 3600)

    if (cval != null) {
        document.cookie = name + '=' + escape(cval) + ';expires=' + exp.toGMTString() + ';path=/;domain=.tu.com'
    }
}

// 获取url参数
ME.core.getQueryString = function(name) { 

    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)

    if (r != null) {
        return unescape(r[2])

    } else {
        return ''
    }
}


String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1,'gm'), s2)
}

