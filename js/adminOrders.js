//当打开后台管理界面时清空table
$('documnet').ready(function() {
    var $orderTable = $('#ordertable tbody');
    var $itemTable=$('#itemtable tbody');
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

    //插入订单信息
    $('#btnsubmit').click(function(e) {
        e.preventDefault();
        //输入判断
        if($('#u_OrderID').val() != ""){
            $('#u_OrderID').parent().addClass('has-error');
        }
        else{
            $('#u_OrderID').parent().removeClass('has-error');
            var jsonBooks = {
                    //u_OrderID: $('#u_OrderID').val(),
                    u_CustomerName: $('#u_CustomerName').val(),
                    //u_Item: $('#u_Item').val(),
                    u_PostStatus: $('#u_PostStatus').val(),
                    u_ReceiveStatus:$('#u_ReceiveStatus').val(),
                    u_PayStatus:$('#u_PayStatus').val(),
                    u_OrderStatus:$('#u_OrderStatus').val(),
                };
                //提交添加的新闻
            $.ajax({
                url: 'sever/insertOrders.php',
                type: 'post',
                data: jsonBooks,
                datatype: 'json',
                success: function(data) {
                    console.log(data);
                    //刷新页面
                    refreshBook();

                }
            });
        }
    });


    var updateId = null;
    var deleteFlag="";
    var deleteId = null;
    //删除订单的功能
    $orderTable.on('click', '.btn-danger', function(e) {
        $('#deleModal').modal('show');
        deleteId = ($(this).parent().prevAll().eq(5).html());
        deleteFlag="Order";
        console.log(deleteId);
    });
    //删除作者的功能
    var deleteItemId = null;
    $itemTable.on('click', '.btn-danger', function(e) {
        $('#updateModal').modal('hide');
        $('#deleModal').modal('show');
        deleteItemId = $(this).parent().prevAll().eq(2).html();
        deleteFlag="Item";
        console.log(deleteItemId);
    });
    $('#deleModal #confirmDelete').click(function(e) {
        if (deleteFlag=="Order") {
            $.ajax({
                url: 'sever/deleteOrders.php',
                type: 'post',
                data: { u_OrderID:deleteId, },
                success: function(data) {
                    console.log(data);
                    $('#deleModal').modal('hide');
                    refreshBook();
                }
            });
        }
        else if(deleteFlag=="Item"){
            $.ajax({
                url: 'sever/deleteItems.php',
                type: 'post',
                data: {
                    u_ItemID: deleteItemId,
                    u_OrderID:updateId,
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
    $orderTable.on('click', '.btn-primary', function(e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(5).html();
        $.ajax({
            url: 'sever/currentOrders.php',
            type: 'get',
            datatype: 'json',
            data: {u_OrderID: updateId },
            success: function(ss) {
                // $('#ubookid').val(data[0].bookid)
                $('#u_CustomerID_edit').val(ss[0].u_CustomerID);
                $('#u_OrderDate_edit').val(ss[0].u_OrderDate);
                $('#u_Postmethod_edit').val(ss[0].u_Postmethod);
                $('#u_Paymethod_edit').val(ss[0].u_Paymethod);
                $('#u_ReceiverName_edit').val(ss[0].u_ReceiverName);
                $('#u_ReceiverAddress_edit').val(ss[0].u_ReceiverAddress);
                $('#u_ReceiverTel_edit').val(ss[0].u_ReceiverTel);
                $('#u_Memo_edit').val(ss[0].u_Memo);
                $('#u_Totalprice_edit').val(ss[0].u_Totalprice);
                $('#u_PostStatus_edit').val(ss[0].u_PostStatus);
                $('#u_ReceiveStatus_edit').val(ss[0].u_ReceiveStatus);
                $('#u_PayStatus_edit').val(ss[0].u_PayStatus);
                $('#u_OrderStatus_edit').val(ss[0].u_OrderStatus);
                $itemTable.empty();
                (ss[0].u_ItemInfo).forEach(function( item, index, array){
                    var $itemid=$('<td>').html(item.u_BookID);
                    var $itemname=$('<td>').html(item.u_BookName);
                    var $itemamount = $('<td>').html(item.u_Amount);
                    var $itemtd = $('<td>');
                    var $itembtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $itemtd.append($itembtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($itemid,$itemname, $itemamount,$itemtd);
                    $itemTable.append($tRow);
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
            url: 'sever/updateOrders.php',
            type: 'post',
            data: {
                u_CustomerID:$('#u_CustomerID_edit').val(),
                u_OrderDate:$('#u_OrderDate_edit').val(),
                u_Postmethod:$('#u_Postmethod_edit').val(),
                u_Paymethod:$('#u_Paymethod_edit').val(),
                u_ReceiverName:$('#u_ReceiverName_edit').val(),
                u_ReceiverAddress:$('#u_ReceiverAddress_edit').val(),
                u_ReceiverTel:$('#u_ReceiverTel_edit').val(),
                u_Memo:$('#u_Memo_edit').val(),
                u_Totalprice:$('#u_Totalprice_edit').val(),
                u_PostStatus:$('#u_PostStatus_edit').val(),
                u_ReceiveStatus:$('#u_ReceiveStatus_edit').val(),
                u_PayStatus:$('#u_PayStatus_edit').val(),
                u_OrderStatus:$('#u_OrderStatus_edit').val(),
                u_OrderID: updateId
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

    //修改作者
    var updateItemId = null;
    $itemTable.on('click', '.btn-primary', function(e) {
        updateItemId = $(this).parent().prevAll().eq(2).html();
        $('#updateModal').modal('hide');
        $('#updateItemModal').modal('show');
        $.ajax({
            url: 'sever/currentItems.php',
            type: 'get',
            datatype: 'json',
            data: {u_ItemID: updateItemId },
            success: function(ss) {
                $('#u_Amount_edit').val(ss[0].u_Amount);
            },
            error: function(e){
                console.log("error");
            },
        });
    });
    $('#updateItemModal #confirmUpdateItem').click(function(e) {
        //需要增加一道判断：表单值是否被修改
        $.ajax({
            url: 'sever/updateItems.php',
            type: 'post',
            data: {
                u_Amount:$('#u_Amount_edit').val(),
                u_OrderID: updateId,
                u_ItemID:updateItemId
            },
            success: function(data) {
                console.log(data);
                $('#updateItemModal').modal('hide');
                refreshBook();
            },
            error: function(e){
                console.log("error");
            },
        });
    });
    $('#updateItemModal #confirmupdatecancel').click(function(e) {
        $('#updateItemModal').modal('hide');
        $('#updateModal').modal('show');
    });

    //插入作者信息
    $('#updateModal #InsertItem').click(function(e) {
        $('#updateModal').modal('hide');
        $('#insertItemModal').modal('show');
    });
    $('#insertItemModal #confirmInsertItem').click(function(e) {
        //需要增加一道判断：表单值是否被修改
        $.ajax({
            url: 'sever/insertItems.php',
            type: 'post',
            data: {
                u_ItemID:$('#u_BookID_insert').val(),
                u_Amount:$('#u_Amount_insert').val(),
                u_OrderID: updateId,
            },
            success: function(data) {
                console.log(data);
                $('#insertItemModal').modal('hide');
                refreshBook();
            },
            error: function(e){
                console.log("error");
            },
        });
    });
    $('#updateItemModal #confirminsertcancel').click(function(e) {
        $('#insertItemModal').modal('hide');
        $('#updateModal').modal('show');
    });

    //刷新页面，载入数据
    function refreshBook() {
      $orderTable.empty();
        $.ajax({
            url: 'sever/queryOrders.php',
            type: 'POST',
            datatype: 'json',
            data: { u_OrderID: $('#u_OrderID').val(),
                    u_CustomerName: $('#u_CustomerName').val(),
                    u_PostStatus: $('#u_PostStatus').val(),
                    u_ReceiveStatus: $('#u_ReceiveStatus').val(),
                    u_PayStatus:$('#u_PayStatus').val(),
                    u_OrderStatus:$('#u_OrderStatus').val(),
                },
            success:function(ss){
                ss.forEach(function( item, index, array){
                    var $orderid = $('<td>').html(item.orderid);
                    var $receivername = $('<td>').html(item.receivername);
                    var $poststatus = $('<td>').html(item.poststatus);
                    var $receivestatus = $('<td>').html(item.receivestatus);
                    var $paystatus=$('<td>').html(item.paystatus);
					var $orderstatus=$('<td>').html(item.orderstatus);
                    var $ordertd = $('<td>');
                    var $orderbtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $ordertd.append($orderbtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($orderid, $receivername,$poststatus,$receivestatus,$paystatus,$orderstatus,$ordertd);
                    $orderTable.append($tRow);
                });
            }
        });
    }

});
