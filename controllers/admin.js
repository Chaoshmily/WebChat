var model = require('../model')

fn_admin = async(ctx, next) => {
    var Admin = model.Admin
    var User = model.User
    var page = ctx.params.page
    var username = ctx.cookies.get('username') ||ctx.request.body.username ||  ''
    var password = ctx.cookies.get('password') ||ctx.request.body.password ||  ''
    var admins = await Admin.findAll({
        where: {
            username: username,
            password: password
        }
    })
    console.log(username + ' ' + password)

    if (admins.length == 1) {
        var users = await User.findAll({})
        console.log(users)
        var pages = new Array(), // 存放每一页
            capacity = 10, // 每页容量
            i = 1, // 当前页号
            index
        if (users.length % capacity != 0) {
            index = parseInt(users.length / capacity + 1) // 总页号
        } else {
            index = parseInt(users.length / capacity) // 总页号
        }
        pages[1] = new Array()
        for (let user of users) {
            if (pages[i].length < capacity) {
                pages[i].push(user)
            } else {
                i++
                pages[i] = new Array()
                pages[i].push(user)
            }
        }

        ctx.render('admin.html', {
            users: pages[page],
            script: `var ret = showPage(${page}, ${index})`
        })
    } else {
        ctx.render('signAdmin.html', {
            username: username,
            password: password,
            error: '用户名或密码错误'
        })
    }
}

fn_signAdmin = async(ctx, next) => {
    ctx.render('signAdmin.html', {})
}

module.exports = {
    'POST /signAdmin/:page': fn_admin,
    'GET /signAdmin/:page': fn_admin,
    'GET /admin': fn_signAdmin
}