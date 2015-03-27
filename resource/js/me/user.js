
ME.user = {}

ME.user.getCurrentUser = function() {

    $.ajax({
        method: 'get',
        url: '/tueasyj/service/Member/CurrentUser?t=' + Math.random(),
        data: {

        },
        success: function(data) {

            // if (data != '') {

            //     var index = data['email'].indexOf('@')
                
            //     data = eval('(' + data + ')')

            //     ME.currentUser = data
                
            // } else {

            //     ME.currentUser = ''

            //     // 如果不在首页，跳转回首页
            //     var href = window.location.href
            //     href = href[href.length - 1]

            //     if (document.title != '图易' || 
            //         (href != '/' && href != 'm')) {

            //         window.location.href = '/'
            //     }
            // }
        },
        error: function(err) {
        }
    })  // end ajax
}








// ME.getCurrentUser = function() {


//     $http.get('/auth', {})
//         .success(function(data) {
//             console.log(data)

//         })
//         .error(function(data, status, headers, config) {

//             throw new Error('status: ' + status + ', description: ' + data)
//         })



//     // $http.get('/login/1?t=' + Math.random(), {})
//     //     .success(function(data) {

//     //         ME.currentUser = data

//     //         $scope.currentUser = ME.currentUser
//     //     })
//     //     .error(function(data, status, headers, config) {
//     //         console.log('error:')
//     //         console.log(data)
//     //     })
// }
