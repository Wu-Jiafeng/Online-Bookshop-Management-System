//当打开后台管理界面时清空table
$('documnet').ready(function() {
	var $BookRankTable=$('#booktable tbody');
	document.getElementById("u_CustomerName_cookie").innerHTML='<li class="active"><a>欢迎你！'+getCookie('u_CustomerName_cookie')+'</a></li>';
	if(getCookie('search_SeniorFlag')=='Yes'){
		var data0={
			u_BookName:getCookie('search_BookName'),
			u_BookISBN:getCookie('search_BookISBN'),
			u_BookType:getCookie('search_BookType'),
			u_BookPress:getCookie('search_BookPress'),
			u_Author:getCookie('search_Author'),
			u_ENG:getCookie('search_ENG'),
			u_CHN:getCookie('search_CHN'),
			u_BookUnitPrice:getCookie('search_UnitPrice'),
			u_BookDiscount:getCookie('search_BookDiscount'),
		};
		refreshResult(data0);
	}
	else{
		var data0={
			u_BookName:getCookie('search_BookName'),
			u_BookISBN:'',
			u_BookType:'',
			u_BookPress:'',
			u_Author:'',
			u_ENG:'',
			u_CHN:'',
			u_BookUnitPrice:'',
			u_BookDiscount:'',
		};
		refreshResult(data0);
	}
	
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
	
    $('#btnsubmit').click(function(e) {
        e.preventDefault();
		setCookie('search_BookName',$('#u_BookName').val(),1);
		setCookie('search_SeniorFlag','No',1);
		var data0={
			u_BookName:getCookie('search_BookName'),
			u_BookISBN:'',
			u_BookType:'',
			u_BookPress:'',
			u_Author:'',
			u_ENG:'',
			u_CHN:'',
			u_BookUnitPrice:'',
			u_BookDiscount:'',
		};
		refreshResult(data0);
    });
	
	$('#btnsubmit0').click(function(e) {
        e.preventDefault();
		window.location.href="./customerSeniorSearch.html";
        //输入判断
    });
	
	var BuyId=null
    $BookRankTable.on('click', '.btn-danger', function(e) {
        BuyId = $(this).parent().prevAll().eq(3).html();//立即购买
		setCookie('BuyID',BuyId,1);
		window.location.href="./customerPay.html";
    });
	
    $BookRankTable.on('click', '.btn-primary', function(e) {//加入购物车
		BuyId = $(this).parent().prevAll().eq(3).html();
		$('#insertShoppingCartModal').modal('show');
    });
	$('#insertShoppingCartModal #confirmInsertShoppingCart').click(function(e) {
		if($('#u_Amount_insert').val()==''){
			$('#u_Amount_insert').parent().addClass('has-error');
		}
		else{
			$('#u_Amount_insert').parent().removeClass('has-error');
			$.ajax({
				url: 'sever/CustomerinsertShoppingCart.php',
				type: 'post',
				datatype: 'json',
				data: {
					u_BookID: BuyId,
					u_CustomerName: getCookie('u_CustomerName_cookie'),
					u_Amount:$('#u_Amount_insert').val(),
				},
				success: function(ss) {
					console.log("ss");
					$('#insertShoppingCartModal').modal('hide');
				},
				error: function(e){
					console.log("error");
				},
			});
		}
    });
    $('#insertShoppingCartModal #confirminsertcancel').click(function(e) {
        $('#insertShoppingCartModal').modal('hide');
    });

	$BookRankTable.on('click', '.mmm', function(e) {
		var BookDetailID=$(this).parent().prevAll().eq(0).html();
        BookDetail(BookDetailID);
    });
	
	function BookDetail(BookDetailID){
		setCookie('BookDetailID',BookDetailID,1);
		window.location.href="./customerBookDetail.html";
	}
	
    //刷新页面，载入数据
    function refreshResult(data1) {
		$BookRankTable.empty();
        $.ajax({
            url: 'sever/queryBookSearchResult.php',
            type: 'POST',
            datatype: 'json',
            data: data1,
            success:function(ss){
                ss.forEach(function( item, index, array){
                    var $BookName = $('<td>').html('<a class="mmm" href="javascript:void(0);" οnclick="BookDetail()">'+item.BookName+'</a>');
                    var $BookID = $('<td>').html(item.BookID);
                    var $BookPic = $('<img src="'+item.BookPic+'" height="200" width="200">').html('');
                    var $BookUnitPrice = $('<td>').html(item.BookUnitPrice);
                    var $BookSMemberPrice=$('<td>').html(item.BookSMemberPrice);
					var $booktd = $('<td>');
                    var $bookbtn = $('<button>').addClass('btn btn-primary btn-xs').html('加入购物车');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('立即购买');
                    $booktd.append($bookbtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append( $BookPic,$BookID,$BookName,$BookUnitPrice,$BookSMemberPrice,$booktd);
                    $BookRankTable.append($tRow);
                });
            },
            error: function(e){
                console.log("error");
            },
        });
    }
});
