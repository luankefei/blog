'use strict'


var pool = require('../models/db.js')


var User = function() {

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

User.getUserByUserName = function(username, callback) {

    var sql = 'select * from user where username = "' + username + '"' + ' limit 1'

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


module.exports = User
