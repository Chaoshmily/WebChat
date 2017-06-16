const nunjucks = require('nunjucks')

// 把render方法绑定到ctx上
function templating() {
    return async(ctx, next) => {
        nunjucks.configure('views', {
            autoescape: true
        })
        ctx.render = (view, model) => {
            ctx.response.body = nunjucks.render(view, model)
            ctx.response.type = 'text/html'
        }
        await next()
    }
}

module.exports = templating