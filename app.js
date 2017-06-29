const
    Koa = require('koa'),
    bodyParser = require('koa-bodyparser'), //解析post
    controller = require('./controllers'),
    serve = require('koa-static'), // 静态资源
    model = require('./model'), // 数据原型
    Server = require('socket.io'), // websocket
    User = model.User,
    Chat = model.Chat,
    crypto = require('crypto');
var app = new Koa(),
    server = app.listen(3000),
    io = new Server(server);

console.log('app start at port 3000...');

// 打印信息
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime(),
        execTime; // 计算加载用时
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
})

// 获取静态资源
app.use(serve(__dirname + '/static'));

// 解析POST文件
app.use(bodyParser());

// 渲染页面
let templating = require('./templating');
app.use(templating());

// 处理路由
app.use(controller());


/**
 * socket.io的处理
 * new事件向所有用户广播数据(包括 用户发送的消息、新用户加入的消息)
 * online事件向所有在线用户发送现在在线的用户列表
 */
var onlines = new Array(); // 存放在线用户

io.on('connection', async(socket) => { // 有用户接入分配一个线程去处理他的连接
    var oneUser = null;
    await syncUser(); // 同步在线用户数据
    io.sockets.emit('syncUser', onlines); // 广播在线用户列表
    // 有人加入就广播
    io.sockets.emit('news', {
        nickname: '系统消息',
        msg: '有新用户加入房间!',
        username: '系统消息'
    });

    // 检查登录用户
    socket.on('checkLogin', async(user) => {
        oneUser = await selectOne(user);
        if (oneUser != null) {
            if (oneUser.online == 2) { // 2为已被封禁用户
                socket.emit('loginFailed', '2');
            } else {
                await editState(oneUser, true); // 修改用户状态为在线
                await syncUser(); // 同步在线用户数据
                io.sockets.emit('syncUser', onlines); // 广播在线用户列表
                socket.emit('loginSuccess', {
                    nickname: oneUser.nickname,
                    username: oneUser.username,
                    password: oneUser.password
                });
            }
        } else {
            socket.emit('loginFailed'); // 登录失败发送失败事件
        }
    })

    // 用户登出
    socket.on('signOut', async() => {
        if (oneUser != null && oneUser.online != 2) {
            await editState(oneUser, false);
        }
        await syncUser();
        io.sockets.emit('syncUser', onlines) // 同步在线用户列表
    })

    // 有人退出进行广播
    socket.on('disconnect', async() => { 
        io.sockets.emit('news', {
            nickname: '系统消息',
            msg: '有用户退出房间!'
        });
        if (oneUser != null && oneUser.online != 2) {
            await editState(oneUser, false);
        }
        await syncUser();
        io.sockets.emit('syncUser', onlines); // 同步在线用户列表
    })

    // 广播用户发送的信息
    socket.on('sendMsg', async(msg) => { 
        if (msg != '' && msg.trim() != '') { // 判断是否为空
            console.log(msg); //后台打印用户发送的消息
            let data = {
                username: oneUser.username,
                nickname: oneUser.nickname,
                msg: msg
            }
            io.sockets.emit('news', data);
            // 把聊天消息存入数据库
            var chat = await Chat.create({
                sendTime: new Date().getTime(),
                content: msg,
                userId: oneUser.id
            });
        }
    })
})

// 同步用户列表
var syncUser = async() => {
    var online = await User.findAll({
        where: {
            online: true
        }
    });
    onlines = new Array();
    for (let o of online) {
        onlines.push(o.nickname.toString());
    }
}

// 修改用户状态
var editState = async(oneUser, state) => {
    oneUser.online = state;
    await oneUser.save();
}


// 查询用户
var selectOne = async(user) => {
    var MD5password = crypto.createHash('md5', user.password).digest('hex');
    var oneUser = await User.findOne({
        where: {
            username: user.username,
            password: MD5password
        }
    })
    return oneUser;
}