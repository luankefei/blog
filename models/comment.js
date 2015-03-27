
var pool = require('../models/db.js')


var Comment = function() {

}

Comment.addComment = function(contentId, nickname, comment, callback) {

    var sql = "insert into comment values(null, " 
        + contentId + ", '" 
        + nickname + "', null, '2014-08-08 14:00:00', '" 
        + comment + "', null)"

    pool.acquire(function(err, client) {
            
        if (err) {
            
            return callback(err)
            
        } else {
            
            client.query(sql, [], function(err, rows, fields) {
                // return object back to pool
                pool.release(client)

                callback(err, rows)
            })
        }
    })
}

Comment.getCommentById = function(contentId, callback) {

    var sql = 'select * from comment where article_id = ' + contentId

    pool.acquire(function(err, client) {
            
        if (err) {
            
            return callback(err)
            
        } else {
            
            client.query(sql, [], function(err, rows, fields) {
                // return object back to pool
                pool.release(client)

                callback(err, rows)
            })
        }
    })
}

module.exports = Comment