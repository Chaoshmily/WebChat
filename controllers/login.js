fn_login = async(ctx, next) => {
    ctx.render('login.html', {})
}

fn_signin = async(ctx, next) => {
    var
        username = ctx.request.body.username || '',
        password = ctx.request.body.password || ''
    console.log(`signin with username: ${username}, password: ${password}`)
    if (username === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${username}!</h1>`
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`
    }
}

module.exports = {
    'GET /': fn_login,
    'POST /signin': fn_signin
}