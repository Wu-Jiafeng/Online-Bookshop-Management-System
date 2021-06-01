//当打开后台管理界面时清空table
$('documnet').ready(function() {
    var $customertable = $('#customertable tbody');
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
    $customertable.on('click', '.btn-danger', function(e) {
        $('#deleModal').modal('show');
        deleteId = ($(this).parent().prevAll().eq(4).html());
        console.log(deleteId);
    });
    $('#deleModal #confirmDelete').click(function(e) {
            $.ajax({
                url: 'sever/deleteCustomers.php',
                type: 'post',
                data: { u_CustomerID:deleteId, },
                success: function(data) {
                    console.log(data);
                    $('#deleModal').modal('hide');
                    refreshBook();
                }
            });
    });

    //修改图书
    $customertable.on('click', '.btn-primary', function(e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(4).html();
        $.ajax({
            url: 'sever/currentCustomers.php',
            type: 'get',
            datatype: 'json',
            data: {u_CustomerID: updateId },
            success: function(ss) {
                // $('#ubookid').val(data[0].bookid)
                $('#u_CustomerName_edit').val(ss[0].u_CustomerName);
                $('#u_CustomerPwd_edit').val(ss[0].u_CustomerPwd);
                $('#u_CustomerTName_edit').val(ss[0].u_CustomerTName);
                $('#u_CustomerSex_edit').val(ss[0].u_CustomerSex);
                $('#u_CustomerTel_edit').val(ss[0].u_CustomerTel);
                $('#u_CustomerEmail_edit').val(ss[0].u_CustomerEmail);
                $('#u_CustomerSMemberFlag_edit').val(ss[0].u_CustomerSMemberFlag);
                $('#u_CustomerQuestion_edit').val(ss[0].u_CustomerQuestion);
                $('#u_CustomerAnswer_edit').val(ss[0].u_CustomerAnswer);
            },
            error: function(e){
                console.log("error");
            },
        });
    });
    $('#updateModal #confirmUpdate').click(function(e) {
        //需要增加一道判断：表单值是否被修改
        $.ajax({
            url: 'sever/updateCustomers.php',
            type: 'post',
            data: {
                u_CustomerName:$('#u_CustomerName_edit').val(),
                u_CustomerPwd:$('#u_CustomerPwd_edit').val(),
                u_CustomerTName:$('#u_CustomerTName_edit').val(),
                u_CustomerSex:$('#u_CustomerSex_edit').val(),
                u_CustomerTel:$('#u_CustomerTel_edit').val(),
                u_CustomerEmail:$('#u_CustomerEmail_edit').val(),
                u_CustomerSMemberFlag:$('#u_CustomerSMemberFlag_edit').val(),
                u_CustomerQuestion:$('#u_CustomerQuestion_edit').val(),
                u_CustomerAnswer:$('#u_CustomerAnswer_edit').val(),
                u_CustomerID: updateId
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


    //刷新页面，载入数据
    function refreshBook() {
      $customertable.empty();
        $.ajax({
            url: 'sever/queryCustomers.php',
            type: 'POST',
            datatype: 'json',
            data: { u_CustomerID: $('#u_CustomerID').val(),
					u_CustomerSex: $('#u_CustomerSex').val(),
                    u_CustomerName: $('#u_CustomerName').val(),
                },
            success:function(ss){
                ss.forEach(function( item, index, array){
                    var $customerid = $('<td>').html(item.customerid);
                    var $customername = $('<td>').html(item.customername);
                    var $customerlogtimes = $('<td>').html(item.customerlogtimes);
                    var $customerlastlogtime = $('<td>').html(item.customerlastlogtime);
                    var $customersmemberflag=$('<td>').html(item.customersmemberflag);
                    var $customertd = $('<td>');
                    var $customerbtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $customerdele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $customertd.append($customerbtn, $customerdele);
                    var $tRow = $('<tr>');
                    $tRow.append($customerid, $customername,$customerlogtimes,$customerlastlogtime,$customersmemberflag,$customertd);
                    $customertable.append($tRow);
                });
            }
        });
    }

});
