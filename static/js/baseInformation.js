var data;
// 点击修改、保存
$('#operation > button:nth-child(2)').click(function () {
	if ($(this).text() == '修改') {
		$('input').removeAttr('readonly');
		$(this).text('返回');
	} else {

		$('input').attr('readonly', '');
		$(this).text('修改');
	}
})
// 点击预览
$('#operation > button:nth-child(1)').click(function () {
	data = {
		nickname: $('#nickname').val(),
		sex: ($('#sex input:checked').val() == 'true') ? '男' : '女', //$('#sex').val(),
		qq: $('#qq').val(),
		hobby: $('#hobby').val(),
		say: $('#say').val(),
		head: $('#head-pic').val(),
		bc: $('#b-c').text(),
		fc: $('#f-c').text()
	}
	$('#s-nickname').text(data.nickname);
	$('#s-qq').text(data.qq);
	$('#s-sex').text(data.sex);
	$('#s-hobby').text(data.hobby);
	$('#s-say').text(data.say);
	$('#head-img').attr('src', data.head);
	$('#show').css('color', data.fc);
	$('#show').css('background-color', data.bc);
	console.log(data);
	$('#operation > button:nth-child(2)').toggle();
	$('#edit').toggle();
	$('.display').toggle();
	if ($(this).text() == '预览') {
		$(this).text('返回');
	} else {
		$(this).text('预览');
	}
})

// 给颜色赋值
function initColor() {
	var check = false;
	var red = ['0', '85', '170', '255'];
	var green = ['0', '85', '170', '255'];
	var blue = ['0', '85', '170', '255'];
	var $color = $('.color');
	for (var i = 0; i < $color.length; i++) {
		$color.eq(i).css('background-color', 'rgb(' + red[parseInt(i / 16)] + ',' + green[parseInt(i / 4 % 4)] + ',' +
			blue[parseInt(i % 4)] + ')');
	}
	$('#bg-c').click(function () {
		check = false;
	})
	$('#font-c').click(function () {
		check = true;
	})
	$('.color').click(function () {
		if (check) {
			$('#f-c1').val($(this).css('background-color'));
			$('#f-c').text($(this).css('background-color'));
			$('#show').css('color', $(this).css('background-color'));
		} else {
			$('#b-c1').val($(this).css('background-color'));
			$('#b-c').text($(this).css('background-color'));
			$('#show').css('background-color', $(this).css('background-color'));
		}
	});
}
initColor();