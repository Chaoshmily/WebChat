function showPageCommon(config) {
    return function (page, total) {
        var str = `<li class="active"><a href="./${page}">${page}</a></li>`

        for (var i = 1; i <= 3; i++) {
            if (page - i > 1) {
                str = `<li><a href="./${page - i}" class="${config.color}">${page - i}</a></li>${str}`;
                // '<a class="' + config.color + '">' + (page - i) + '</a>' + str;
            }
            if (page + i < total) {
                str = `${str}<li><a href="./${page + i}" class="${config.color}">${page + i}</a></li>`
                // str = str + '<a class=">' + config.color + '">' + (page + i) + '</a>';
            }
        }

        if (page - 4 > 1) {
            str = '<li><a href="#">...</a></li>' + str;
        }

        if (page > 1) {
            str = `<li><a href="./${page - 1}">上一页</a></li><li><a href="./1">1</a></li>${str}`
            // '上一页' + 1 + str;
        }

        if (page + 4 < total) {
            str = str + `<li><a href="#">...</a><li>`;
        }

        if (page < total) {
            str = `${str}<li><a href="./${total}">${total}</a></li><li><a href="./${page + 1}">下一页</a></li>`
            // str + total + '下一页';
        }
        return str;
    }
}

var showPage = showPageCommon({
    color: 'red'
});

// var total = 101;
// for (var i = 1; i <= total; i++) {
//     var ret = showPage(i, total);
//     console.log(ret);
// }