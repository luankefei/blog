

var admin = angular.module('admin', ['ngResource'])
    

admin.controller('listController', ['$scope', '$http', '$resource', function($scope, $http, $resource) {

    var Content = $resource('/Content')

    var contents = null


    function deleteContent(id) {

        Content.delete({
            id: id

        }, function(data) {

            console.log('删除成功')
            console.log(data)
        })
    }

    function getContent() {

        Content.get({}, function(data) {

            contents = data.result

            $scope.contents = contents
        })
    }



    function init() {

        getContent()
    }

    init()

    $scope.contents = contents
    $scope.deleteContent = deleteContent
}])

