var model = require('../model'); // 数据原型
const crypto = require('crypto');

// 渲染登陆页
fn_login = async(ctx, next) => {
    ctx.render('chatRoom.html', {})
}

// 渲染登陆成功与否页
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
    if (users.length == 1) { // 登陆成功
        ctx.render('chatRoom.html', {})
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`
    }
}

// 渲染注册页
fn_register = async(ctx, next) => {
    ctx.render('register.html', {})
}

// 渲染检查用户注册成功与否页
fn_checkRegister = async(ctx, next) => {
    var
        nickname = ctx.request.body.nickname || '',
        username = ctx.request.body.username || '',
        password = ctx.request.body.password || '',
        repassword = ctx.request.body.repassword || '',
        email = ctx.request.body.email || '',
        tel = ctx.request.body.tel || '',
        User = model.User,
        Base = model.Base,
        MD5password = crypto.createHash('md5', password).digest('hex'); // 对密码进行加密处理
    console.log(MD5password);

    var usersU = await User.findAll({ // 查询用户是否存在
        where: {
            username: username
        }
    })
    var usersN = await User.findAll({ // 查询用户是否存在
        where: {
            nickname: nickname
        }
    })
    var error = ''
    if (usersU.length != 0) {
        error += '用户名已存在   '
    }
    if (usersN.length != 0) {
        error += '昵称已存在'
    }
    if (error != '') {
        ctx.render('register.html', {
            nickname: nickname,
            username: username,
            password: password,
            repassword: repassword,
            email: email,
            tel: tel,
            error: error,
            init: 'init()'
        })
    } else {
        var user = await User.create({
            nickname: nickname,
            username: username,
            password: MD5password,
            email: email,
            tel: tel,
            online: false
        })
        var oneUser = await User.findOne({
            where: {
                username: user.username,
                password: user.password
            }
        })
        var base = await Base.create({
            id: oneUser.id,
            sex: true,
            qq: '',
            say: '',
            bc: 'rgb(225, 239, 253)',
            fc: 'rgb(51, 51, 51)',
            img: '/image/background.jpg'
        })
        ctx.render('success.html', {
            event: '注册'
        })
    }
}

module.exports = {
    'GET /': fn_login,
    'POST /signin': fn_signin,
    'GET /register': fn_register,
    'POST /checkRegister': fn_checkRegister
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