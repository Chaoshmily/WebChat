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

var count = 0
io.on('connection', (socket) => {
    console.log('a client connected')
    socket.emit('show', `you are my ${++count} user`) // 想连接人发送你是第几个连接的
    io.sockets.emit('news', 'a new one join') // 有人加入就广播

    socket.on('disconnect', () => { // 有人退出也广播
        count--
        io.sockets.emit('news', 'a user out')
    })

    socket.on('sendMsg', (msg) => { // 广播发送数据
        if (msg != '' && msg.trim() != '') {
            console.log(msg)
            io.sockets.emit('news', msg)
        }
    })
})