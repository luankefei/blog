define(function(require) {

    var contents = null

    function getContent(page) {

        // 获取所有内容
        $.ajax({
            url: '/content',
            type: 'get',
            data: {},
            beforeSend: function(xhr, settings) {

                var start = (page - 1) * 3
                var end = start + 3

                xhr.setRequestHeader('range', start + ',' + end)
            },
            success: function(data) {

                var html = ''

                if (data.code < 0) {

                    return false
                
                } else {

                    contents = data.result
                }
                
                for (var i = 0; i < data.result.length; i++) {

                    html += '<section class="content clearfix">\
                                <div class="top">\
                                    <img src="/resource/images/head.png" alt="" class="head">\
                                    <a class="title" href="#">' + data.result[i].title + '</a>\
                                    <span class="author">' + 'sunken' + '</span>\
                                    <span class="date">' + data.result[i].create_date + '</span>\
                                </div>\
                                <article>' + data.result[i].excerpt + '</article>\
                                <a href="/#/index/content?id=' + data.result[i].id + '" class="read-more">继续阅读 &gt;</a>\
                            </section>'
                }

                document.querySelector('#contents').innerHTML = html
        
                // 将页面上所有图片都加上链接
                var images = document.querySelectorAll('#contents article img')
                
                for (var i = 0; i < images.length; i++) {

                    // 总会获取到textNode
                    // var link = this.parentNode.parentNode.nextSibling
                    var link = images[i].parentNode
                            .parentNode
                            .parentNode.
                            getElementsByClassName('read-more')[0]
                            .getAttribute('href')

                    images[i].onclick = function(e) {

                        //
                        e = e || window.event
                        var target = e.target || e.srcElement    
                        
                        location.href = link

                        e.preventDefault()
                        e.stopPropagation()
                    }
                }
            },
            error: function(data) {

            }
        })
    }

    function initPager(page) {

        $.ajax({
            url: '/content',
            type: 'get',
            data: {},
            beforeSend: function(xhr, settings) {

                xhr.setRequestHeader('except', 'count')
            },
            success: function(data) {

                var pager = document.querySelector('#pager'),
                    nextButton = document.querySelector('#pager > .next')
                
                var count = data['result'][0]['count'],
                    perPage = 3,
                    pageCount = count / perPage

                pageCount = pageCount === 0 ? 1 : pageCount

                for (var i = 0; i < pageCount; i++) {

                    var a = document.createElement('a')

                    a.href = '/index.html?page=' + (i + 1)
                    a.text = i + 1
                    a.setAttribute('data-id', i + 1)

                    pager.insertBefore(a, nextButton)
                }

                var prev = page === 1 ? page : page - 1
                
                // 如果只有一页，隐藏页脚
                if (pageCount <= 1) {

                    document.querySelector('#pager').style.display = 'none'
                }

                $('#pager > a[data-id="' + page + '"]').addClass('selected')
                $('#pager > .prev').attr('href', '/index.html?page=' + prev)
                $('#pager > .next').attr('href', '/index.html?page=' + pageCount)
            },
            error: function(data) {

            }
        })
    }

    function init() {

        // 先获取page参数
        var search = window.location.search
        var page = 1

        if (search !== '') {

            var reg = new RegExp("[^page=]")
            page = window.location.search.substr(1).match(reg)[0]
        }

        getContent(page)
        initPager(page)
    }

    init()

})