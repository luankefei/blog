/**
 * @name commentController
 * @description 此文件通过调用models/comment文件，对评论内容进行基本操作
 * @author sunken
 * @version 0.1
 */
var Comment = require('../models/comment')

/**
 * 新增评论
 * @param {json} req
 * @param {json} res
 * @return {json}
 */
exports.addComment = function(req, res) {

    var id = req.body.id,
        nickname = req.body.nickname,
        comment = req.body.comment

    Comment.addComment(id, nickname, comment, function(err, data) {

        if (data.length === 0) {

            res.send({
                code: -1,
                message: '没有结果'
            })
        }

        res.send({
            code: 0,
            message: '执行成功',
            result: data
        })
    })
}

/**
 * 根据评论id获取评论
 * @param {json} req
 * @param {json} res
 * @return {json}
 */
exports.getCommentById = function(req, res) {

    var url = req.url
    var index = url.lastIndexOf('/')
    var id = url.substring(index + 1)

    Comment.getCommentById(id, function(err, data) {

        if (data.length === 0) {

            res.send({
                code: -1,
                message: '没有结果'
            })
        }

        res.send({
            code: 0,
            message: '执行成功',
            result: data
        })
    })
}