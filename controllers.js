const fs = require('fs')


function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET')) {
            let path = url.substring(4)
            router.get(path, mapping[url])
            console.log(`rigester url mapping GET: ${url}`)
        } else if (url.startsWith('POST')) {
            let path = url.substring(5)
            router.post(path, mapping[url])
            console.log(`rigester url mapping POST: ${url}`)
        } else {
            console.log(`invalid URL: ${url}`)
        }
    }
}

// 扫描目录，把controllers里的控制加载到路由
function addControllers(router, dir) {
    files = fs.readdirSync(__dirname + dir)
    js_files = files.filter((f) => {
        return f.endsWith('js')
    })
    for (let f of js_files) {
        console.log(`process controls ${f}...`)
        let mapping = require(__dirname + '/controllers/' + f)
        addMapping(router, mapping)
    }
}

module.exports = function (dir) {
    let
    // 未设置路径默认为/controller
        controller_dir = dir || '/controllers',
        router = require('koa-router')()
    addControllers(router, controller_dir)
    return router.routes()
}