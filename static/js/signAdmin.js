$('#login').click(function () {
    $.removeCookie('ausername');
    $.removeCookie('apassword');
    $.cookie('ausername', $('#username').val());
    $.cookie('apassword', $('#password').val());
});
$('form').submit(function () {
    $.removeCookie('ausername');
    $.removeCookie('apassword');
    $.cookie('ausername', $('#username').val());
    $.cookie('apassword', $('#password').val());
});
$('#index').click(function () {
    $.removeCookie('ausername');
    $.removeCookie('apassword');
});