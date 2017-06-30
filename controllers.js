const fs = require('fs');

// 添加每个文件里的函数到路由
function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET')) {
            let path = url.substring(4);
            router.get(path, mapping[url]); // mapping[url]为url对应的异步处理函数
            console.log(`rigester url mapping GET: ${url}`);
        } else if (url.startsWith('POST')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`rigester url mapping POST: ${url}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

// 扫描目录，把controllers里的控制加载到路由
function addControllers(router, dir) {
    var files = fs.readdirSync(__dirname + dir); // 读取目录下所有文件
    var js_files = files.filter((f) => { // 过滤出以js结尾的文件
        return f.endsWith('js');
    });
    for (let f of js_files) {
        console.log(`process controls ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    // 未设置路径默认为/controller
    let controller_dir = dir || '/controllers',
        router = require('koa-router')();
    addControllers(router, controller_dir);
    router.get('*', async(ctx, next) => {
        ctx.render('404.html');
    })
    return router.routes();
};