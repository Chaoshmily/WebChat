const
    Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    controller = require('./controllers')

var app = new Koa()

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`)
    await next()
})

app.use(bodyParser())
app.use(controller())

app.listen(3000)
console.log('app start at port 3000...')