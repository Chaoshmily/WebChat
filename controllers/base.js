model = require('../model') // 数据原型

fn_base = async(ctx, next) => {
    var
        username = ctx.cookies.get('username') || '',
        password = ctx.cookies.get('password') || '',
        User = model.User,
        Base = model.Base
    var users = await User.findAll({
        where: {
            username: username,
            password: password
        }
    })
    if (users.length == 1) {
        var base = await Base.findAll({
            where: {
                id: users[0].id
            }
        })
        ctx.render('baseInformation.html', {
            nickname: users[0].nickname,
            sex: base[0].sex,
            qq: base[0].qq,
            hobby: base[0].hobby,
            say: base[0].say,
            bc: base[0].bc,
            fc: base[0].fc,
            img: base[0].img
        })
    } else {
        console.log(users.length)
    }
}

fn_save = async(ctx, next) => {
    var
        username = ctx.cookies.get('username') || '',
        password = ctx.cookies.get('password') || '',
        nickname = ctx.request.body.nickname || '',
        sex = ctx.request.body.sex || '',
        qq = ctx.request.body.qq || '',
        hobby = ctx.request.body.hobby || '',
        say = ctx.request.body.say || '',
        fc = ctx.request.body.fc || '',
        bc = ctx.request.body.bc || '',
        img = ctx.request.body.img || '',
        User = model.User,
        Base = model.Base
    console.log(nickname + ' ' + sex + ' ' + qq + ' ' + hobby + ' ' + say + ' ' + fc + ' ' + bc + ' ' + img)
    var users = await User.findAll({
        where: {
            username: username,
            password: password
        }
    })
    var base = await Base.findAll({
        where: {
            id: users[0].id
        }
    })
    users[0].nickname = nickname
    users[0].save()
    base[0].sex = sex
    base[0].qq = qq
    base[0].hobby = hobby
    base[0].say = say
    base[0].bc = bc
    base[0].fc = fc
    base[0].img = img
    base[0].save()
    ctx.render('success.html', {
        event: '提交基本信息'
    })
}

fn_show = async(ctx, next) => {
    var
        nickname = ctx.params.nickname,
        User = model.User,
        Base = model.Base
    var users = await User.findAll({
        where: {
            nickname: nickname
        }
    })
    if (users.length == 1) {
        var base = await Base.findAll({
            where: {
                id: users[0].id
            }
        })
        ctx.render('show.html', {
            nickname: users[0].nickname,
            sex: base[0].sex,
            qq: base[0].qq,
            hobby: base[0].hobby,
            say: base[0].say,
            bc: base[0].bc,
            fc: base[0].fc,
            img: base[0].img
        })
    } else {
        console.log(users.length)
    }
}

module.exports = {
    'GET /baseInformation': fn_base,
    'POST /save': fn_save,
    'GET /show/:nickname': fn_show
}