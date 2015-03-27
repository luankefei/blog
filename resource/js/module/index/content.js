define(function(require) {

    var contentId = null

    function getContent() {

        // 2015.3.20 尝试写正则，失败了...
        //var reg = new RegExp('[^id=]')
        //var id = window.location.href.match(reg)
        $.ajax({
            url: '/content/' + contentId,
            type: 'get',
            data: {},
            success: function(data) {
                
                // 只读取了文章内容
                // TODO: 还有评论没有读取
                // 2015.3.20 吐槽：其实评论功能还没做
                if (data.code === 0) {

                    var result = data.result[0]

                    $('#content').find('h1').text(result.title)
                    $('#content').find('.author').text(result.author)
                    $('#content').find('.date').text(result.date)
                    $('#content').find('article').first().html(result.content)

                    //$('#content').html(result.content)
                }


            },
            error: function(err) {
                console.error('error:' + err)
            }
        })
    }

    function init() {

        var url = window.location.href
        var id = url.lastIndexOf('=')

        contentId = url.substring(id + 1)

        getContent()
        getComment()

    }

    function getComment() {

        $.ajax({
            url: '/comment/' + contentId,
            type: 'get',
            data: {},
            success: function(data) {
                
            },
            error: function(err) {
                console.error('error: ' + err)
            }
        })
    }

    function addComment(contentId, nickname, comment) {

        var data = {
            id: contentId,
            nickname: nickname,
            comment: comment
        }

        $.ajax({
            url: '/comment',
            type: 'post',
            data: data,
          
            success: function(data) {

                if (data.code === 0) {

                    // console.log('添加成功')
                    // console.log(data.result)
                }
            },
            error: function(err) {
                console.err('error: ' + err)
            }
        })
    }

    init()

    $(document).ready(function() {

        $('#add-comment').click(function() {

            var contentId = ME.core.getQueryString('id')
            var nickname = $('#nickname').val()
            var comment = $('#comment').val()

            addComment(contentId, nickname, comment)
        })
    })
})