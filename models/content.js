
var pool = require('../models/db.js')


var Content = function() {

    this.username = ''
    this.password = ''
    this.nickname = ''

    this.prototype.create = function(req, res) {
        
        var sql = 'select * from user where username = ' + req.params.username + 'and password = ' + req.params.password

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
        })  // end pool.acquire
    }
}

/**
 * 2015.3.20 晚8:00新增
 * 获取文章总条数
 * @param callback
 * @return {json}
 */
Content.getContentCount = function(callback) {

    var sql = 'select count(*) as count from content'

    pool.acquire(function(err, client) {
            
        if (err) {
            // handle error - this is generally the err from your
            // factory.create function
        } else {
            
            client.query(sql, [], function(err, rows, fields) {
                // return object back to pool
                pool.release(client)

                callback(err, rows)
            })
        }
    })
}

Content.getContent = function(start, end, callback) {

    var sql = null

    if (start !== null) {

        sql = 'select * from content limit ' + start + ', ' + end

    } else {

        sql = 'select * from content'

    }


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


Content.getContentById = function(id, callback) {

    var sql = 'select * from content where id = ' + id

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

Content.deleteContent = function(id, callback) {

    var sql = 'delete from content where id = ' + id

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



Content.addContent = function(data, callback) {

    var date = new Date()
    var dateStr = date.getFullYear() 
        + '-' + (date.getMonth() + 1) 
        + '-' + date.getDate().toString() + ' ' 
        + date.getHours() + ':' 
        + date.getMinutes() + ':'
        + date.getSeconds()

    var sql = "insert into content values(null, '"
        + data.title + "', '" 
        + data.content + "', '" 
        + dateStr + "', 1, '" 
        + data.excerpt + "', 0, '" 
        + dateStr + "', 0, '" + data.type + "', '" 
        + data.figure + "')"

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
}   // end function -> addContent



module.exports = Content