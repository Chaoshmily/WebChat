var model = require('../model'); // 数据原型

fn_chatLog = async(ctx, next) => {
    var
        page = ctx.params.page,
        User = model.User,
        Chat = model.Chat,
        username = ctx.cookies.get('username') || '',
        password = ctx.cookies.get('password') || '',
        users = await User.findAll({
            where: {
                username: username,
                password: password
            }
        });
    if (users.length == 1) {
        var chats = await Chat.findAll({
            where: {
                userId: users[0].id
            }
        })
    }
    for (let chat of chats) {
        let time = new Date()
        time.setTime(chat.sendTime)
        chat.sendTime = time.toLocaleString()
    }

    var pages = new Array(), // 存放每一页
        capacity = 10, // 每页容量
        i = 1, // 当前页号
        index;
    if (chats.length % capacity != 0) {
        index = parseInt(chats.length / capacity + 1); // 总页号
    } else {
        index = parseInt(chats.length / capacity); // 总页号
    }
    pages[1] = new Array();
    for (let chat of chats) {
        if (pages[i].length < capacity) {
            pages[i].push(chat);
        } else {
            i++;
            pages[i] = new Array();
            pages[i].push(chat);
        }
    }

    ctx.render('chatLog.html', {
        chats: pages[page],
        script: `var ret = showPage(${page}, ${index})`
    });
}

module.exports = {
    'GET /chatLog/:page': fn_chatLog
};