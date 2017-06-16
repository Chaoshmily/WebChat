const
    Koa = require('koa'),
    bodyParser = require('koa-bodyparser'), //解析post
    controller = require('./controllers'),
    serve = require('koa-static'), // 静态资源
    model = require('./model') // 数据原型
var app = new Koa()

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

app.listen(3000)
console.log('app start at port 3000...')


var
    now = Date.now(),
    Pet = model.Pet
console.log(now)

;
(async() => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    })
    console.log('created: ' + JSON.stringify(dog))
})()

;
(async() => {
    var pets = await Pet.findAll({
        where: {
            name: 'Odie'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p, null, '  '))
    }
})()