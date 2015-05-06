'use strict'


var Content = require('../models/content')


var getContents = function(res, start, end) {

    Content.getContent(start, end, function(err, contents) {

        if (contents.length === 0) {

            res.send({ 
                code: -1, 
                message: '没有结果' 
            })
        }

        res.send({
            code: 0,
            message: '执行成功',
            result: contents
        })
    })
}

var getContentCount = function(res) {

    Content.getContentCount(function(err, rows) {

        if (rows === 0) {

            res.send({ 
                code: -1, 
                message: '没有结果' 
            })
        }

        res.send({
            code: 0,
            message: '执行成功',
            result: rows
        })
    })
}

/**
 * content的get接口，如果expect有值，取文章总数，否则按range返回文章内容。
 * expect和range都为空时，返回全部文章
 *
 * @param req
 * @param res
 * @return {json}
 */
exports.getContent = function(req, res) {

    var range = req.headers.range,
        start = null,
        end = null,
        expect = req.headers.except

    // getContentCount
    if (typeof expect !== 'undefined') {

        getContentCount(res)

    // getContents
    } else if (typeof range !== 'undefined') {
        range  = range.split(',')

        start = range[0]
        end = range[1]

        getContents(res, start, end)

    } else {

        getContents(res, null, null)

    }
}

exports.getContentById = function(req, res) {

    var url = req.url
    var index = url.lastIndexOf('/')
    var id = url.substring(index + 1)

    Content.getContentById(id, function(err, data) {

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


exports.addContent = function(req, res) {

    var content = req.body

    Content.addContent(content, function(err, data) {

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

exports.deleteContentById = function(req, res) {

    var id = req.query.id

    Content.deleteContent(id, function(err, data) {

        if (data.length === 0) {

            res.send({
                code: -1,
                message: '执行失败'
            })
        }

        res.send({
            code: 0,
            message: '执行成功',
            result: data
        })
    })

    //res.send('开发中')
}