model = require('../model') // 数据原型

fn_login = async(ctx, next) => {
    ctx.render('login.html', {})
}

fn_signin = async(ctx, next) => {
    var
        username = ctx.request.body.username || '',
        password = ctx.request.body.password || '',
        User = model.User
    var users = await User.findAll({
        where: {
            username: username,
            password: password
        }
    })
    console.log(users.length)
    if (users.length == 1) {
        ctx.response.body = `<h1>Welcome, ${username}!</h1>`
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`
    }
}

fn_register = async(ctx, next) => {
    ctx.render('register.html', {})
}

fn_checkRegister = async(ctx, next) => {
    var
        username = ctx.request.body.username || '',
        password = ctx.request.body.password || '',
        repassword = ctx.request.body.repassword || '',
        email = ctx.request.body.email || '',
        tel = ctx.request.body.tel || '',
        User = model.User;
    var users = await User.findAll({ // 查询用户是否存在
        where: {
            username: username
        }
    })
    console.log(users.length)
    if (users.length != 0) {
        ctx.render('register.html', {
            username: username,
            password: password,
            repassword: repassword,
            email: email,
            tel: tel,
            error: "用户名已存在"
        })
    } else {
        var user = User.create({
            username: username,
            password: password,
            email: email,
            tel: tel
        })
        ctx.render('login.html', {})
    }

    // (async() => {
    //     var user = await User.create({
    //         username: username,
    //         password: password,
    //         email: email,
    //         tel: tel
    //     })
    //     console.log('created: ' + JSON.stringify(user))
    // })()

    // var
    //     now = Date.now(),
    //     Pet = model.Pet
    // console.log(now)

    // ;
    // (async() => {
    //     var dog = await Pet.create({
    //         id: 'd-' + now,
    //         name: 'Odie',
    //         gender: false,
    //         birth: '2008-08-08',
    //         createdAt: now,
    //         updatedAt: now,
    //         version: 0
    //     })
    //     console.log('created: ' + JSON.stringify(dog))
    // })()

    // ;
    // (async() => {
    //     var pets = await Pet.findAll({
    //         where: {
    //             name: 'Odie'
    //         }
    //     });
    //     console.log(`find ${pets.length} pets:`);
    //     for (let p of pets) {
    //         console.log(JSON.stringify(p, null, '  '))
    //     }
    // })()
}

module.exports = {
    'GET /': fn_login,
    'POST /signin': fn_signin,
    'GET /register': fn_register,
    'POST /checkRegister': fn_checkRegister
}