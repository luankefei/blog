
var User = require('../models/user')



// 登录是创建currentUser
// 注册是创建user
exports.doLogin = function(req, res) {

    User.getUserByUserName(req.body.username, function(err, user) {

        if (user.length === 0) {

            console.log('没有找到这个用户')


            res.send({ 
                code: -1, 
                message: '用户名或密码错误' 
            })
            //res.json('用户名或密码错误')
        }

        user = user[0]

        // 检验密码是否正确
        if (user.password != req.body.password) {

            res.send({
                code: -1,
                message: '用户名或密码错误'
            })
        }

        // 确认用户名和密码都匹配后，存入session
        req.session.user = user
        res.send({
            code: 0,
            message: '登录成功'
        })
    })
}

exports.logout = function(req, res) {
    req.session.user = null
    res.redirect('/')
};