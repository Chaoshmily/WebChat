const
    Koa = require('koa'),
    bodyParser = require('koa-bodyparser'), //解析post
    controller = require('./controllers'),
    serve = require('koa-static'), // 静态资源
    model = require('./model') // 数据原型
Server = require('socket.io') //websocket
var app = new Koa()
var server = app.listen(3000)
var io = new Server(server)

console.log('app start at port 3000...')

// 打印信息
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    var
        start = new Date().getTime(),
        execTime
    await next()
    execTime = new Date().getTime() - start
    ctx.response.set('X-Response-Time', `${execTime}ms`)
})

// 获取静态资源
app.use(serve(__dirname + '/static'))

// 解析POST文件
app.use(bodyParser())

// 渲染页面
let templating = require('./templating')
app.use(templating())

// 处理路由
app.use(controller())


/**
 * socket.io的处理
 * new事件向所有用户广播数据(包括 用户发送的消息、新用户加入的消息)
 * online事件向所有在线用户发送现在在线的用户列表
 */
var onlines = new Array() //存放在线用户
var count = 0 //记录用户数量
io.on('connection', async(socket) => { // 有用户接入分配一个线程去处理他的连接
    socket.emit('show', `you are my ${++count} user`) // 向连接人发送你是第几个连接的
    await syncUser() // 同步在线用户数据
    io.sockets.emit('syncUser', onlines) // 同步在线用户列表
    io.sockets.emit('news', 'a new one join') // 有人加入就广播
    socket.on('disconnect', () => { // 有人退出也广播
        count--
        io.sockets.emit('news', 'a user out')
    })
    socket.on('sendMsg', (msg) => { // 广播用户发送的信息发送数据
        if (msg != '' && msg.trim() != '') {
            console.log(msg) //后台打印用户发送的消息
            io.sockets.emit('news', msg)
        }
    })
})

// 同步用户列表
var syncUser = async() => {
    var User = model.User
    var online = await User.findAll({})
    onlines = new Array()
    for (let o of online) {
        onlines.push(o.username.toString())
    }
}