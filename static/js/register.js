var iName = document.getElementsByClassName('username');
var iPassword = document.getElementsByClassName('password');
var iRepassword = document.getElementsByClassName('repassword');
var iEmail = document.getElementsByClassName('email');
var iTel = document.getElementsByClassName('tel');
var button = document.getElementsByTagName('button');

// 初始化
(function() {
    check(iName, '名称可用', '请输入4-16之间的字符数');
    check(iPassword, '密码可用', '请输入4-16之间的字符数');
    check(iRepassword, '密码可用', '请输入4-16之间的字符数', 'repassword');
    check(iEmail, '邮箱可用', '错误的邮箱', 'email');
    check(iTel, '手机号可用', '错误的手机号', 'tel')
})()

button[0].onclick = function() {
    var flag = false;
    if (iName[1].className.indexOf('success') != -1 &&
        iPassword[1].className.indexOf('success') != -1 &&
        iRepassword[1].className.indexOf('success') != -1 &&
        iEmail[1].className.indexOf('success') != -1 &&
        iTel[1].className.indexOf('success') != -1) {
        flag = true;
    }
    if (flag) {
        alert('提交成功');
    } else {
        alert('提交失败');
    }
}

iName[0].onfocus = function() {
    iName[1].innerHTML = '必填，长度为4~16个字符';
}

iName[0].onblur = function() {
    check(iName, '名称可用', '请输入4-16之间的字符数');
}

iPassword[0].onfocus = function() {
    iPassword[1].innerHTML = '必填，长度为4~16个字符';
}

iPassword[0].onblur = function() {
    check(iPassword, '密码可用', '请输入4-16之间的字符数')
}

iRepassword[0].onfocus = function() {
    iRepassword[1].innerHTML = '再次输入相同密码';
}

iRepassword[0].onblur = function() {
    check(iRepassword, '密码可用', '请输入4-16之间的字符数', 'repassword');
}

iEmail[0].onfocus = function() {
    iEmail[1].innerHTML = '输入邮箱';
}

iEmail[0].onblur = function() {
    check(iEmail, '邮箱可用', '错误的邮箱', 'email');
}

iTel[0].onfocus = function() {
    iTel[1].innerHTML = '输入手机号';
}

iTel[0].onblur = function() {
    check(iTel, '手机号可用', '错误的手机号', 'tel');
}

function check(ele, sucMsg, failMsg, type) {
    var value = ele[0].value;
    var length = 0;
    for (var i = 0; i < value.length; i++) {
        if (checkChinese(value[i])) {
            length += 2;
        } else {
            length++;
        }
    }
    if (length < 4 || length > 16) {
        ele[1].innerHTML = failMsg;
        havaClass(ele[0], 'fail');
        havaClass(ele[1], 'fail');
        havaClass(ele[0], 'success');
        havaClass(ele[1], 'success');
        ele[0].className += ' fail';
        ele[1].className += ' fail';
    } else {
        if (type == 'repassword') {
            if (iPassword[0].value == iRepassword[0].value) {
                ele[1].innerHTML = sucMsg;
                havaClass(ele[0], 'fail');
                havaClass(ele[1], 'fail');
                havaClass(ele[0], 'success');
                havaClass(ele[1], 'success');
                ele[0].className += ' success';
                ele[1].className += ' success';
            } else {
                ele[1].innerHTML = '请输入相同的密码';
                havaClass(ele[0], 'fail');
                havaClass(ele[1], 'fail');
                havaClass(ele[0], 'success');
                havaClass(ele[1], 'success');
                ele[0].className += ' fail';
                ele[1].className += ' fail';
            }
        } else if (type == 'email') {
            if (RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$', 'g').test(ele[0].value)) {
                ele[1].innerHTML = sucMsg;
                havaClass(ele[0], 'fail');
                havaClass(ele[1], 'fail');
                havaClass(ele[0], 'success');
                havaClass(ele[1], 'success');
                ele[0].className += ' success';
                ele[1].className += ' success';
            } else {
                ele[1].innerHTML = '请输入正确的邮箱';
                havaClass(ele[0], 'fail');
                havaClass(ele[1], 'fail');
                havaClass(ele[0], 'success');
                havaClass(ele[1], 'success');
                ele[0].className += ' fail';
                ele[1].className += ' fail';
            }
        } else if (type == 'tel') {
            if (RegExp('^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$', 'g').test(ele[0].value)) {
                ele[1].innerHTML = sucMsg;
                havaClass(ele[0], 'fail');
                havaClass(ele[1], 'fail');
                havaClass(ele[0], 'success');
                havaClass(ele[1], 'success');
                ele[0].className += ' success';
                ele[1].className += ' success';
            } else {
                ele[1].innerHTML = '请输入正确的手机号';
                havaClass(ele[0], 'fail');
                havaClass(ele[1], 'fail');
                havaClass(ele[0], 'success');
                havaClass(ele[1], 'success');
                ele[0].className += ' fail';
                ele[1].className += ' fail';
            }
        } else {
            ele[1].innerHTML = sucMsg;
            havaClass(ele[0], 'fail');
            havaClass(ele[1], 'fail');
            havaClass(ele[0], 'success');
            havaClass(ele[1], 'success');
            ele[0].className += ' success';
            ele[1].className += ' success';
        }
    }
}
// 检测是否为中文符号
function checkChinese(str) {
    var r = new RegExp('[\u4e00-\u9fa5]', 'g');
    return r.test(str);
}

// 检查是否含有类,有就切掉
function havaClass(ele, c) {
    if (ele.className.indexOf(c) != -1) {
        ele.className = ele.className.slice(0, ele.className.indexOf(c) - 1);
    }
}