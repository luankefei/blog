

var admin = angular.module('admin', ['ngResource'])
    

admin.controller('contentController', ['$scope', '$http', '$resource', function($scope, $http, $resource) {

    var Content = $resource('/Content')

    // 需要写一个文件本地上传
    // swfupload
    function init() {

        CKEDITOR.replace('ckeditor', {
            width: 640,
            height: 500
        })
    }

    function addContent() {

        var content = CKEDITOR.instances.ckeditor.getData()

        var index = content.indexOf('</p>')
        index = content.indexOf('</p>', index + 1)

        var excerpt = content.substring(0, index + 4)


        console.log({
            type: $('#content-type').find('.select-value').text(),
            title: document.getElementById('title').value,
            content: content,
            author: document.getElementById('author').getAttribute('data-id'),
            figure: '/resource/images/test2.png',
            excerpt: excerpt

        })

        Content.save({
            type: document.getElementById('type').getAttribute('data-id'),
            title: document.getElementById('title').value,
            content: content,
            author: document.getElementById('author').getAttribute('data-id'),
            figure: '/resource/images/test2.png',
            excerpt: excerpt

        }, function(data) {

            if (data.code < 0) {
                console.error(data.message)

            } else {
                // 跳转到内容页
                alert(data.message)
            }
        })
    }

    init()


    //$scope.doLogin = doLogin
    $scope.addContent = addContent

}])



// define(function(require) {

//     console.log('进入模块')







// })

