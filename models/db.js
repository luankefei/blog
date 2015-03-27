

var poolModule = require('generic-pool'),
    config = require('../config').config

// 这里好多坑，文档不更新什么的真是……
var pool = poolModule.Pool({
    name: 'mysql',

    create: function(callback) {

        var c = require('mysql').createConnection(config)
    
        c.connect()

        callback(null, c)
    },
    destroy: function(client) { client.end() },
    max: 10,
    // min: 2,
    // 空闲资源存活时间
    idleTimeoutMillis: 30000,
    // 向控制台输出log
    log: true
})

module.exports = pool



// var mysql = require('mysql'),
//     config = require('../config').config

// module.exports = {
//     open: function (callback) {
        
//         var conn = mysql.createConnection(config)

//         conn.connect(function(err) {
//             if (err) {
//                 console.error('connection database error: ' + err)
//                 process.exit()
//             }

//             callback(conn)
//         })
//     }
// }


