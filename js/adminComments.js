//当打开后台管理界面时清空table
$('documnet').ready(function() {
    var $commenttable = $('#commenttable tbody');
    //刷新页面
	document.getElementById("u_AdminName_cookie").innerHTML='<li class="active"><a>欢迎你！'+getCookie('u_AdminName_cookie')+'</a></li>';
	
	$("#ByeBye").click(function(){
		ByeBye();
	});
	
	function setCookie(name,value,day) {
		var oDate = new Date();
		var d = oDate.setDate(oDate.getDate()+day);//设置从当前时间几天后过期
		var expires = 'expires='+ oDate;
		document.cookie = name+"="+value+";"+expires
	};
	
	function getCookie(name) {
		var strCookie = document.cookie;//获取所有的cookie值
		var oArr = strCookie.split(';');
		for(var i=0;i<oArr.length;i++){
			var c = oArr[i].trim();
			var oArr2 = c.split('=');
			if(oArr2[0].indexOf(name)>-1) {
				return oArr2[1];
			}
		}
		return '';
	}

	function clearCookie(name) {     
		setCookie(name, "", -1); 
	}
    //刷新页面，载入数据
    function ByeBye() {
        $.ajax({
            url: 'sever/ByeByeForManager.php',
            type: 'POST',
            datatype: 'json',
            data: { u_AdminName: getCookie('u_AdminName_cookie'),
                },
            success:function(ss){
				clearCookie('u_AdminName_cookie');
				alert('成功退出登录！')
				window.location.href="./adminSignIn.html";
            },
            error: function(e){
                console.log("error");
            },
        });
    }
    refreshBook();
    $('#btnsubmit0').click(function(e) {
        e.preventDefault();
        //输入判断
        refreshBook();
    });


    var updateId = null;
    var deleteId = null;
    //删除图书的功能
    $commenttable.on('click', '.btn-danger', function(e) {
        $('#deleModal').modal('show');
        deleteId = ($(this).parent().prevAll().eq(6).html());
        console.log(deleteId);
    });
    $('#deleModal #confirmDelete').click(function(e) {
            $.ajax({
                url: 'sever/deleteComments.php',
                type: 'post',
                data: { u_CommentID:deleteId, },
                success: function(data) {
                    console.log(data);
                    $('#deleModal').modal('hide');
                    refreshBook();
                }
            });
    });

    //修改图书
    $commenttable.on('click', '.btn-primary', function(e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(6).html();
        $.ajax({
            url: 'sever/currentComments.php',
            type: 'get',
            datatype: 'json',
            data: {u_CommentID: updateId },
            success: function(ss) {
                // $('#ubookid').val(data[0].bookid)
                $('#u_CommentFlag_edit').val(ss[0].u_CommentFlag);
            },
            error: function(e){
                console.log("error");
            },
        });
    });
    $('#updateModal #confirmUpdate').click(function(e) {
        //需要增加一道判断：表单值是否被修改
        $.ajax({
            url: 'sever/updateComments.php',
            type: 'post',
            data: {
				u_CommentFlag:$('#u_CommentFlag_edit').val(),
                u_CommentID: updateId
            },
            success: function(data) {
                console.log(data);
                $('#updateModal').modal('hide');
                refreshBook();
            },
            error: function(e){
                console.log("error");
            },
        });
    });
	
	$('#updateModal #UpdateRecommend').click(function(e) {
        //需要增加一道判断：表单值是否被修改
		$.ajax({
            url: 'http://127.0.0.1:5000/name/',
            type: 'post',
            data: {
				flag: false,
            },
            success: function(data) {
                console.log(data);
            },
            error: function(e){
                console.log("error");
            },
        });
    });

    //刷新页面，载入数据
    function refreshBook() {
      $commenttable.empty();
        $.ajax({
            url: 'sever/queryComments.php',
            type: 'POST',
            datatype: 'json',
            data: { u_CommentID: $('#u_CommentID').val(),
					u_CustomerID: $('#u_CustomerID').val(),
					u_CustomerName: $('#u_CustomerName').val(),
					u_BookID: $('#u_BookID').val(),
                    u_BookName: $('#u_BookName').val(),
					u_CommentScore: $('#u_CommentScore').val(),
                    u_CommentFlag: $('#u_CommentFlag').val(),
                },
            success:function(ss){
                ss.forEach(function( item, index, array){
                    var $commentid = $('<td>').html(item.commentid);
                    var $customername = $('<td>').html(item.customername);
                    var $bookname = $('<td>').html(item.bookname);
                    var $commentcontent = $('<td>').html(item.commentcontent);
                    var $commentdate=$('<td>').html(item.commentdate);
					var $commentscore=$('<td>').html(item.commentscore);
					var $commentflag=$('<td>').html(item.commentflag);
                    var $commenttd = $('<td>');
                    var $commentbtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $commentdele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $commenttd.append($commentbtn, $commentdele);
                    var $tRow = $('<tr>');
                    $tRow.append($commentid, $bookname,$customername,$commentcontent,$commentscore,$commentdate,$commentflag,$commenttd);
                    $commenttable.append($tRow);
                });
            }
        });
    }

});
