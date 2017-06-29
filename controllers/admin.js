var model = require('../model');

fn_admin = async(ctx, next) => {
    var Admin = model.Admin,
        User = model.User,
        page = ctx.params.page,
        username = ctx.cookies.get('ausername') || ctx.request.body.username || '',
        password = ctx.cookies.get('apassword') || ctx.request.body.password || '',
        admins = await Admin.findAll({
            where: {
                username: username,
                password: password
            }
        });
    console.log('username:' + username + ' password:' + password);

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

fn_close = async(ctx, next) => {
    var Admin = model.Admin
    var User = model.User
    var id = ctx.params.id
    var page = 1
    var username = ctx.cookies.get('ausername') || ctx.request.body.username || ''
    var password = ctx.cookies.get('apassword') || ctx.request.body.password || ''
    var admins = await Admin.findAll({
        where: {
            username: username,
            password: password
        }
    })
    console.log(username + ' ' + password)

    if (admins.length == 1) {
        var user = await User.findOne({
            where: {
                id: id
            }
        })
        user.online = 2
        await user.save()
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

fn_open = async(ctx, next) => {
    var Admin = model.Admin
    var User = model.User
    var id = ctx.params.id
    var page = 1
    var username = ctx.cookies.get('ausername') || ctx.request.body.username || ''
    var password = ctx.cookies.get('apassword') || ctx.request.body.password || ''
    var admins = await Admin.findAll({
        where: {
            username: username,
            password: password
        }
    })
    console.log(username + ' ' + password)

    if (admins.length == 1) {
        var user = await User.findOne({
            where: {
                id: id
            }
        })
        user.online = false
        await user.save()
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

module.exports = {
    'POST /signAdmin/:page': fn_admin,
    'GET /signAdmin/:page': fn_admin,
    'GET /admin': fn_signAdmin,
    'GET /close/:id': fn_close,
    'GET /open/:id': fn_open
}