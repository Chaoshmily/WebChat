window.username = null // 全局对象默认空,连接以后才有数据
var socket = io('http://10.128.127.68:3000')
socket.on('connect', function () {
    console.log(socket.id + '连接成功');
    if ($.cookie('username') && $.cookie('password')) {
        socket.emit('checkLogin', {
            username: $.cookie('username'),
            password: $.cookie('password')
        }, true)
    }
});
// 验证登陆
$('#form-login').submit(checkLogin)
$('#btn-login').click(checkLogin)
// 发送消息
$('#form-chat').submit(sendMsg)
$('#send').click(sendMsg)
// 登出
$('#sign-out').click(signOut)
// 调试用
socket.on('show', function (data) {
    console.log(data)
})
// 收到新消息显示
socket.on('news', function (data) {
    if (data.username == window.username) {
        $('#message-list').append(
            '<div class="send-right">' +
            '<div class="send-title">' + data.nickname + '</div>' +
            '<div class="send-msg-right">' +
            data.msg +
            '<div class="arrow-right"></div>' +
            '</div>' +
            '</div>'
        )
    } else {
        $('#message-list').append(
            '<div class="send-left">' +
            '<div class="send-title">' + data.nickname + '</div>' +
            '<div class="send-msg-left">' +
            data.msg +
            '<div class="arrow-left"></div>' +
            '</div>' +
            '</div>'
        )
    }

    var msgHeight = $('#message-list').height()
    $('#message-list').parent().scrollTop(msgHeight)
})
// 同步在线用户列表
socket.on('syncUser', function (onlines) {
    console.log('同步消息列表:' + onlines.toString())
    $('#room .list-group a').remove()
    for (var o of onlines) {
        $('#room .list-group').append(
            `<a target="_blank" href="/show/${o}" class="list-group-item">${o}</a>`)
    }
})

socket.on('loginSuccess', function (user) {
    window.username = user.username
    $.cookie('username', user.username)
    $.cookie('password', user.password)
    console.log('loginSuccess')
    $('#form-login').hide()
    $('#logged').show()
    $('#logged .dropdown > a').html(user.nickname + '<span class="caret"></span>')
})

socket.on('loginFailed', function (data) {
    $.removeCookie('username')
    $.removeCookie('password')
    console.log('loginFaild')
    if (data == 2) {
        $('#myModal2').modal()
    } else {
        $('#myModal').modal()
    }

})

function signOut() {
    window.username = null
    $.removeCookie('username')
    $.removeCookie('password')
    socket.emit('signOut')
    $('#form-login').show()
    $('#logged').hide()
}

// 发送信息
function sendMsg() {
    if (window.username == null) {
        $('#myModal1').modal()
        return false
    }
    msg = $('#msg').val()
    socket.emit('sendMsg', msg)
    $('#msg').val('') // 清空输入框
    return false
}

// 验证登陆
function checkLogin() {
    var user = {
        username: $('#username').val(),
        password: $('#password').val()
    }
    socket.emit('checkLogin', user, false)
    return false
}