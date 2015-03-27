var admin = angular.module('admin', ['ngResource'])
    

admin.controller('loginController', ['$scope', '$http', '$resource', function($scope, $http, $resource) {
    
    var CurrentUser = $resource('/CurrentUser')

    function doLogin() {

        var username = document.getElementById('username').value
        var password = document.getElementById('password').value


        var user = {
            username: username,
            password: password
        }

        var currentUser = CurrentUser.save({
            username: username,
            password: password

        }, function(data) {

            if (data.code < 0) {

                alert(data.message)

            } else {
                // 跳转到内容页
                window.location.href = '/admin/content'
            }
        })
    }

    // 这里的angular与jquery混用不太合理
    $(document).ready(function() {

        $('#password').keypress(function(e) {

            // 如果按的是回车，提交登录信息
            if (e.keyCode === 13) {

                doLogin()
            }
        })
    })  // end document.ready


    $scope.doLogin = doLogin

}])
