//当打开后台管理界面时清空table
$('documnet').ready(function() {
    var $orderTable = $('#ordertable tbody');
    var $itemTable=$('#itemtable tbody');
    //刷新页面
	document.getElementById("u_CustomerName_cookie").innerHTML='<li class="active"><a>欢迎你！'+getCookie('u_CustomerName_cookie')+'</a></li>';
	
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
            url: 'sever/ByeByeForCustomer.php',
            type: 'POST',
            datatype: 'json',
            data: { u_CustomerName: getCookie('u_CustomerName_cookie'),
                },
            success:function(ss){
				clearCookie('u_CustomerName_cookie');
				alert('成功退出登录！')
				window.location.href="./index.html";
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

    //修改图书
    $orderTable.on('click', '.btn-primary', function(e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(9).html();
        $.ajax({
            url: 'sever/CustomercurrentOrders.php',
            type: 'get',
            datatype: 'json',
            data: {u_OrderID: updateId },
            success: function(ss) {
                $itemTable.empty();
                (ss[0].u_ItemInfo).forEach(function( item, index, array){
                    var $itemid=$('<td>').html(item.u_BookID);
                    var $itemname=$('<td>').html(item.u_BookName);
                    var $itemamount = $('<td>').html(item.u_Amount);
					var $itemunitprice = $('<td>').html(item.u_UnitPrice);
					var $itemcommentstatus = $('<td>').html(item.u_CommentStatus);
                    var $itemtd = $('<td>');
                    var $itembtn = $('<button>').addClass('btn btn-primary btn-xs').html('立即评论');
					if(item.u_CommentStatus=='已评价'){
						$itembtn = $('<td>').html('不可操作');
					}
                    $itemtd.append($itembtn);
                    var $tRow = $('<tr>');
                    $tRow.append($itemid,$itemname, $itemamount,$itemunitprice,$itemcommentstatus,$itemtd);
                    $itemTable.append($tRow);
                });
            },
            error: function(e){
                console.log("error");
            },
        });
    });

    //修改作者
    var updateItemId = null;
    $itemTable.on('click', '.btn-primary', function(e) {
        updateItemId = $(this).parent().prevAll().eq(4).html();
        $('#updateModal').modal('hide');
        $('#updateItemModal').modal('show');
    });
    $('#updateItemModal #confirmUpdateItem').click(function(e) {
        //需要增加一道判断：表单值是否被修改
        $.ajax({
            url: 'sever/CustomerinsertComment.php',
            type: 'post',
            data: {
                u_CommentScore:$('#u_CommentScore_edit').val(),
				u_Comment:$('#u_Comment_edit').val(),
                u_OrderID: updateId,
                u_ItemID:updateItemId,
				u_CustomerID:getCookie('u_CustomerName_cookie')
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


    //刷新页面，载入数据
    function refreshBook() {
      $orderTable.empty();
        $.ajax({
            url: 'sever/CustomerqueryOrders.php',
            type: 'POST',
            datatype: 'json',
            data: {
					u_CustomerName: getCookie('u_CustomerName_cookie'),
                },
            success:function(ss){
                ss.forEach(function( item, index, array){
                    var $orderid = $('<td>').html(item.orderid);
                    var $receivername = $('<td>').html(item.receivername);
					var $receiveraddress=$('<td>').html(item.receiveraddress);
					var $receivertel=$('<td>').html(item.receivertel);
					var $memo=$('<td>').html(item.memo);
					var $totalprice=$('<td>').html(item.totalprice);
                    var $poststatus = $('<td>').html(item.poststatus);
                    var $receivestatus = $('<td>').html(item.receivestatus);
                    var $paystatus=$('<td>').html(item.paystatus);
					var $orderstatus=$('<td>').html(item.orderstatus);
                    var $ordertd = $('<td>');
                    var $orderbtn = $('<button>').addClass('btn btn-primary btn-xs').html('商品信息');
                    $ordertd.append($orderbtn);
                    var $tRow = $('<tr>');
                    $tRow.append($orderid, $receivername,$receiveraddress,$receivertel,$memo,$totalprice,$poststatus,$receivestatus,$paystatus,$orderstatus,$ordertd);
                    $orderTable.append($tRow);
                });
            },
			error: function(e){
                console.log("error");
            },
        });
    }

});
