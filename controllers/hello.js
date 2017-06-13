fn_hello = async(ctx, next) => {
    ctx.response.body = `<h1>Hello, ${ctx.params.name}!`
}

module.exports = {
    'GET /hello/:name': fn_hello
}