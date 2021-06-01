//当打开后台管理界面时清空table
$('documnet').ready(function() {
    var $purchasetable = $('#purchasetable tbody');
    var $itemtable=$('#itemtable tbody');
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
        if ($('#u_PurchaseID').val() != ""){
			$('#u_PurchaseID').parent().addClass('has-error');
        }  
        else {
			$('#u_PurchaseID').parent().removeClass('has-error');
            //var jsonBooks = {
             //   };
                //提交添加的新闻
            $.ajax({
                url: 'sever/insertPurchases.php',
                type: 'post',
                data: null,
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
    $purchasetable.on('click', '.btn-danger', function(e) {
        $('#deleModal').modal('show');
        deleteId = ($(this).parent().prevAll().eq(2).html());
        deleteFlag="Purchase";
        console.log(deleteId);
    });
    //删除作者的功能
    var deleteItemId = null;
	var deleteItemPrice=null;
	var deleteItemNum=null;
    $itemtable.on('click', '.btn-danger', function(e) {
        $('#updateModal').modal('hide');
        $('#deleModal').modal('show');
        deleteItemId = $(this).parent().prevAll().eq(3).html();
		deleteItemPrice= $(this).parent().prevAll().eq(1).html();
		deleteItemNum=$(this).parent().prevAll().eq(0).html();
        deleteFlag="Item";
        console.log(deleteItemId);
    });
    $('#deleModal #confirmDelete').click(function(e) {
        if (deleteFlag=="Purchase") {
            $.ajax({
                url: 'sever/deletePurchases.php',
                type: 'post',
                data: { u_PurchaseID:deleteId, },
                success: function(data) {
                    console.log(data);
                    $('#deleModal').modal('hide');
                    refreshBook();
                }
            });
        }
        else if(deleteFlag=="Item"){
            $.ajax({
                url: 'sever/deletePItems.php',
                type: 'post',
                data: {
                    u_ItemID: deleteItemId,
                    u_PurchaseID:updateId,
					u_UnitPrice:deleteItemPrice,
					u_ItemNum:deleteItemNum,
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
    $purchasetable.on('click', '.btn-primary', function(e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(2).html();
        $.ajax({
            url: 'sever/currentPurchases.php',
            type: 'get',
            datatype: 'json',
            data: {u_PurchaseID: updateId },
            success: function(ss) {
                // $('#ubookid').val(data[0].bookid)
                $('#u_PurchaseDate_edit').val(ss[0].u_PurchaseDate);
                $itemtable.empty();
                (ss[0].u_ItemInfo).forEach(function( item, index, array){
                    var $bookid=$('<td>').html(item.u_BookID);
                    var $bookname=$('<td>').html(item.u_BookName);
                    var $unitprice = $('<td>').html(item.u_UnitPrice);
					var $booknum = $('<td>').html(item.u_BookNum);
                    var $itemtd = $('<td>');
                    var $itembtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $itemtd.append($itembtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($bookid,$bookname, $unitprice,$booknum,$itemtd);
                    $itemtable.append($tRow);
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
            url: 'sever/updatePurchases.php',
            type: 'post',
            data: {
				u_PurchaseDate:$('#u_PurchaseDate_edit').val(),
                u_PurchaseID: updateId
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
    $itemtable.on('click', '.btn-primary', function(e) {
        updateItemId = $(this).parent().prevAll().eq(3).html();
        $('#updateModal').modal('hide');
        $('#updateItemModal').modal('show');
        $.ajax({
            url: 'sever/currentPItems.php',
            type: 'get',
            datatype: 'json',
            data: {u_ItemID: updateItemId },
            success: function(ss) {
                $('#u_UnitPrice_edit').val(ss[0].u_UnitPrice);
				$('#u_ItemNum_edit').val(ss[0].u_ItemNum);
            },
            error: function(e){
                console.log("error");
            },
        });
    });
    $('#updateItemModal #confirmUpdateItem').click(function(e) {
        //需要增加一道判断：表单值是否被修改
        $.ajax({
            url: 'sever/updatePItems.php',
            type: 'post',
            data: {
                u_UnitPrice:$('#u_UnitPrice_edit').val(),
				u_ItemNum:$('#u_ItemNum_edit').val(),
                u_PurchaseID: updateId,
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
		e.preventDefault();
        //输入判断
        if ($('#u_ItemID_insert').val() == ""){
			$('#u_ItemID_insert').parent().addClass('has-error');
        } 
		else{
			$('#u_ItemID_insert').parent().removeClass('has-error');
			$.ajax({
				url: 'sever/InsertPItems.php',
				type: 'post',
				data: {
					u_ItemID:$('#u_ItemID_insert').val(),
					u_UnitPrice:$('#u_UnitPrice_insert').val(),
					u_ItemNum:$('#u_ItemNum_insert').val(),
					u_PurchaseID: updateId,
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
		}
    });
    $('#updateItemModal #confirminsertcancel').click(function(e) {
        $('#insertItemModal').modal('hide');
        $('#updateModal').modal('show');
    });

    //刷新页面，载入数据
    function refreshBook() {
      $purchasetable.empty();
        $.ajax({
            url: 'sever/queryPurchases.php',
            type: 'POST',
            datatype: 'json',
            data: { u_PurchaseID: $('#u_PurchaseID').val(),
                },
            success:function(ss){
                ss.forEach(function( item, index, array){
                    var $purchaseid = $('<td>').html(item.purchaseid);
                    var $purchasedate = $('<td>').html(item.purchasedate);
                    var $totalprice = $('<td>').html(item.totalprice);
                    var $purchasetd = $('<td>');
                    var $purchasebtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $purchasetd.append($purchasebtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($purchaseid, $purchasedate,$totalprice,$purchasetd);
                    $purchasetable.append($tRow);
                });
            }
        });
    }

});
