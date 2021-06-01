//当打开后台管理界面时清空table
$('documnet').ready(function() {
    var $bookTable = $('#booktable tbody');
    var $authorTable=$('#authortable tbody');
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

    //插入图书信息
    $('#btnsubmit').click(function(e) {
        e.preventDefault();
        //输入判断
        if ($('#u_BookID').val() != ""||$('#u_Author').val() != ""||$('#u_BookName').val() == ""){
            if($('#u_BookID').val() != ""){
                $('#u_BookID').parent().addClass('has-error');
            }
            else{
                $('#u_BookID').parent().removeClass('has-error');
            }
            if($('#u_Author').val() != ""){
                $('#u_Author').parent().addClass('has-error');
            }
            else{
                $('#u_Author').parent().removeClass('has-error');
            }
			if($('#u_BookName').val() == ""){
                $('#u_BookName').parent().addClass('has-error');
            }
            else{
                $('#u_BookName').parent().removeClass('has-error');
            }
        }  
        else {
            var jsonBooks = {
                    //u_BookID: $('#u_BookID').val(),
                    u_BookName: $('#u_BookName').val(),
                    //u_Author: $('#u_Author').val(),
                    u_ENG: $('#u_ENG').val(),
                    u_CHN:$('#u_CHN').val()
                };
                //提交添加的新闻
            $.ajax({
                url: 'sever/insertBooks.php',
                type: 'post',
                data: jsonBooks,
                datatype: 'json',
                success: function(data) {
                    console.log(data);
                    //刷新页面
                    refreshBook();

                },
            error: function(e){
                console.log("error");
            },
            });
        }
    });


    var updateId = null;
    var deleteFlag="";
    var deleteId = null;
    //删除图书的功能
    $bookTable.on('click', '.btn-danger', function(e) {
        $('#deleModal').modal('show');
        deleteId = ($(this).parent().prevAll().eq(4).html());
        deleteFlag="Book";
        console.log(deleteId);
    });
    //删除作者的功能
    var deleteAuthorId = null;
    $authorTable.on('click', '.btn-danger', function(e) {
        $('#updateModal').modal('hide');
        $('#deleModal').modal('show');
        deleteAuthorId = $(this).parent().prevAll().eq(2).html();
        deleteFlag="Author";
        console.log(deleteAuthorId);
    });
    $('#deleModal #confirmDelete').click(function(e) {
        if (deleteFlag=="Book") {
            $.ajax({
                url: 'sever/deleteBooks.php',
                type: 'post',
                data: { u_BookID:deleteId, },
                success: function(data) {
                    console.log(data);
                    $('#deleModal').modal('hide');
                    refreshBook();
                }
            });
        }
        else if(deleteFlag=="Author"){
            $.ajax({
                url: 'sever/deleteAuthors.php',
                type: 'post',
                data: {
                    u_AuthorID: deleteAuthorId,
                    u_BookID:updateId,
                },
                success: function(data) {
                    console.log(data);
                    $('#deleModal').modal('hide');
                    refreshBook();
                }
            });
        }
    });

    //修改图书
    $bookTable.on('click', '.btn-primary', function(e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(4).html();
        $.ajax({
            url: 'sever/currentBooks.php',
            type: 'get',
            datatype: 'json',
            data: {u_BookID: updateId },
            success: function(ss) {
                // $('#ubookid').val(data[0].bookid)
                $('#u_BookName_edit').val(ss[0].u_BookName);
                $('#u_BookISBN_edit').val(ss[0].u_BookISBN);
                $('#u_BookType_edit').val(ss[0].u_BookType);
                $('#u_BookPress_edit').val(ss[0].u_BookPress);
                $('#u_BookPubDate_edit').val(ss[0].u_BookPubDate);
                $('#u_BookSize_edit').val(ss[0].u_BookSize);
                $('#u_BookVersion_edit').val(ss[0].u_BookVersion);
                $('#u_BookPages_edit').val(ss[0].u_BookPages);
                $('#u_BookPic_edit').val(ss[0].u_BookPic);
                $('#u_ENG_edit').val(ss[0].u_ENG);
                $('#u_CHN_edit').val(ss[0].u_CHN);
                $('#u_BookUnitPrice_edit').val(ss[0].u_BookUnitPrice);
                $('#u_BookSMemberPrice_edit').val(ss[0].u_BookSMemberPrice);
                $('#u_BookDiscount_edit').val(ss[0].u_BookDiscount);
                $authorTable.empty();
                (ss[0].u_AuthorInfo).forEach(function( item, index, array){
                    var $authorid=$('<td>').html(item.u_AuthorID);
                    var $authorname=$('<td>').html(item.u_AuthorName);
                    var $authortype = $('<td>').html(item.u_AuthorType);
                    var $authortd = $('<td>');
                    var $authorbtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $authortd.append($authorbtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($authorid,$authorname, $authortype,$authortd);
                    $authorTable.append($tRow);
                });
            },
            error: function(e){
                console.log("error");
            },
        });
    });
    $('#updateModal #confirmUpdate').click(function(e) {
        //需要增加一道判断：表单值是否被修改
        $.ajax({
            url: 'sever/updateBooks.php',
            type: 'post',
            data: {
                u_BookName:$('#u_BookName_edit').val(),
                u_BookISBN:$('#u_BookISBN_edit').val(),
                u_BookType:$('#u_BookType_edit').val(),
                u_BookPress:$('#u_BookPress_edit').val(),
                u_BookPubDate:$('#u_BookPubDate_edit').val(),
                u_BookSize:$('#u_BookSize_edit').val(),
                u_BookVersion:$('#u_BookVersion_edit').val(),
                u_BookPages:$('#u_BookPages_edit').val(),
                u_BookPic:$('#u_BookPic_edit').val(),
                u_ENG:$('#u_ENG_edit').val(),
                u_CHN:$('#u_CHN_edit').val(),
                u_BookUnitPrice:$('#u_BookUnitPrice_edit').val(),
                u_BookSMemberPrice:$('#u_BookSMemberPrice_edit').val(),
                u_BookDiscount:$('#u_BookDiscount_edit').val(),
                u_BookID: updateId
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
    $('#updateModal #UpdateTokenize').click(function(e) {
        //需要增加一道判断：表单值是否被修改
        $.ajax({
            url: 'http://127.0.0.1:5000/name/',
            type: 'post',
            data:{
				flag:true,
                data: JSON.stringify( {
					u_ENG:$('#u_ENG_edit').val(),
					u_CHN:$('#u_CHN_edit').val(),
					u_BookID: updateId
				}),
            },
			dataType: 'json',
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

    //修改作者
    var updateAuthorId = null;
    $authorTable.on('click', '.btn-primary', function(e) {
        updateAuthorId = $(this).parent().prevAll().eq(2).html();
        $('#updateModal').modal('hide');
        $('#updateAuthorModal').modal('show');
        $.ajax({
            url: 'sever/currentAuthors.php',
            type: 'get',
            datatype: 'json',
            data: {u_AuthorID: updateAuthorId },
            success: function(ss) {
                $('#u_AuthorName_edit').val(ss[0].u_AuthorName);
                $('#u_AuthorType_edit').val(ss[0].u_AuthorType);
            },
            error: function(e){
                console.log("error");
            },
        });
    });
    $('#updateAuthorModal #confirmUpdateAuthor').click(function(e) {
        //需要增加一道判断：表单值是否被修改
        $.ajax({
            url: 'sever/updateAuthors.php',
            type: 'post',
            data: {
                u_AuthorName:$('#u_AuthorName_edit').val(),
                u_AuthorType:$('#u_AuthorType_edit').val(),
                u_BookID: updateId,
                u_AuthorID:updateAuthorId
            },
            success: function(data) {
                console.log(data);
                $('#updateAuthorModal').modal('hide');
                refreshBook();
            },
            error: function(e){
                console.log("error");
            },
        });
    });
    $('#updateAuthorModal #confirmupdatecancel').click(function(e) {
        $('#updateAuthorModal').modal('hide');
        $('#updateModal').modal('show');
    });

    //插入作者信息
    $('#updateModal #InsertAuthor').click(function(e) {
        $('#updateModal').modal('hide');
        $('#insertAuthorModal').modal('show');
    });
    $('#insertAuthorModal #confirmInsertAuthor').click(function(e) {
        //需要增加一道判断：表单值是否被修改
        $.ajax({
            url: 'sever/insertAuthors.php',
            type: 'post',
            data: {
                u_AuthorName:$('#u_AuthorName_insert').val(),
                u_AuthorType:$('#u_AuthorType_insert').val(),
                u_BookID: updateId,
            },
            success: function(data) {
                console.log(data);
                $('#insertAuthorModal').modal('hide');
                refreshBook();
            },
            error: function(e){
                console.log("error");
            },
        });
    });
    $('#updateAuthorModal #confirminsertcancel').click(function(e) {
        $('#insertAuthorModal').modal('hide');
        $('#updateModal').modal('show');
    });

	
    //刷新页面，载入数据
    function refreshBook() {
      $bookTable.empty();
        $.ajax({
            url: 'sever/queryBooks.php',
            type: 'POST',
            datatype: 'json',
            data: { u_BookID: $('#u_BookID').val(),
                    u_BookName: $('#u_BookName').val(),
                    u_Author: $('#u_Author').val(),
                    u_ENG: $('#u_ENG').val(),
                    u_CHN:$('#u_CHN').val()
                },
            success:function(ss){
                ss.forEach(function( item, index, array){
                    var $bookid = $('<td>').html(item.bookid);
                    var $booktype = $('<td>').html(item.booktype);
                    var $bookimg = $('<img src="'+item.bookimg+'" height="50" width="50">').html('');
                    var $booknum = $('<td>').html(item.booknum);
                    var $bookname=$('<td>').html(item.bookname);
                    var $booktd = $('<td>');
                    var $bookbtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $booktd.append($bookbtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($bookid, $bookname,$bookimg,$booktype,$booknum,$booktd);
                    $bookTable.append($tRow);
                });
            }
        });
    }

});
