/**
 * node路由
 * @author sunken
 * @date 2015.3.21
 */
var content = require('./content'),
    user = require('./user'),
    comment = require('./comment')


// 登录是创建currentUser
// 注册是创建user
module.exports = function(app) {

	app.get('/', function(req, res) {

        res.redirect('/index.html')

	})	// end index

    app.get(/admin\/[^login]/, function(req, res, next) {

        // 先判断用户是否存在
        if (!req.session.user) {

            res.redirect('/')

        } else {

            next()
        }
    })

    app.post('/currentUser', user.doLogin)
    app.get('/logout', user.logout)

    app.get('/content', content.getContent)
    app.post('/content', content.addContent)

    app.get('/content/:id', content.getContentById)
    app.delete('/content', content.deleteContentById)


    app.post('/comment', comment.addComment)
    app.get('/comment/:id', comment.getCommentById)

}	// end module.exports
