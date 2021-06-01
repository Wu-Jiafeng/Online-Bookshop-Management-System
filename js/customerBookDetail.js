//当打开后台管理界面时清空table
$('documnet').ready(function() {
	var $BookRankTable=$('#booktable tbody');
	document.getElementById("u_CustomerName_cookie").innerHTML='<li class="active"><a>欢迎你！'+getCookie('u_CustomerName_cookie')+'</a></li>';
	refreshResult();
	
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
		window.location.href="./customerSearchResult.html";
    });
	
	$('#btnsubmit0').click(function(e) {
        e.preventDefault();
		window.location.href="./customerSeniorSearch.html";
        //高级搜索
    });
	
	var BuyId=null;
	$('#btnsubmit1').click(function(e) {
        e.preventDefault();
		BuyId = getCookie('BookDetailID');
		$('#insertShoppingCartModal').modal('show');
        //加入购物车
    });
	$('#btnsubmit2').click(function(e) {
        e.preventDefault();
		setCookie('BuyID',getCookie('BookDetailID'),1);
		window.location.href="./customerPay.html";
        //立即购买
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
	
    //刷新页面，载入数据
    function refreshResult() {
		$BookRankTable.empty();
        $.ajax({
            url: 'sever/CustomerqueryBookDetail.php',
            type: 'POST',
            datatype: 'json',
            data: {u_BookID:getCookie('BookDetailID'),},
            success:function(ss){
				// $('#ubookid').val(data[0].bookid)
				document.getElementById("d_BookName").innerHTML=ss[0].BookName;
				document.getElementById("d_BookUnitPrice").innerHTML=ss[0].BookUnitPrice;
				document.getElementById("d_BookSMemberPrice").innerHTML=ss[0].BookSMemberPrice;
				document.getElementById("d_BookISBN").innerHTML=ss[0].BookISBN;
				document.getElementById("d_BookPress").innerHTML=ss[0].BookPress;
				document.getElementById("d_BookType").innerHTML=ss[0].BookType;
				document.getElementById("d_BookPubDate").innerHTML=ss[0].BookPubDate;
				document.getElementById("d_BookVersion").innerHTML=ss[0].BookVersion;
				document.getElementById("d_BookSize").innerHTML=ss[0].BookSize;
				document.getElementById("d_BookPages").innerHTML=ss[0].BookPages;
				document.getElementById("d_Author").innerHTML=ss[0].Author;
				document.getElementById("d_ENG").innerHTML=ss[0].BookOutlineInENG;
				document.getElementById("d_CHN").innerHTML=ss[0].BookOutlineInCHN;
				document.getElementById("d_avgScore").innerHTML=ss[0].avgScore;
				document.getElementById("bpic1").innerHTML='<img alt="" src="'+ss[0].BookPic+'" />';
				document.getElementById("bpic2").innerHTML='<img alt="" src="'+ss[0].BookPic+'" />';
				document.getElementById("bpic3").innerHTML='<img alt="" src="'+ss[0].BookPic+'" />';
                (ss[0].Comment).forEach(function( item, index, array){
                    var $CustomerName = $('<td>').html(item.CustomerName);
                    var $CommentDate = $('<td>').html(item.CommentDate);
                    var $CommentContent = $('<td>').html(item.CommentContent);
                    var $CommentScore = $('<td>').html(item.CommentScore);
                    var $tRow = $('<tr>');
                    $tRow.append( $CustomerName,$CommentScore,$CommentDate,$CommentContent);
                    $BookRankTable.append($tRow);
                });
            },
            error: function(e){
                console.log("error");
            },
        });
    }
});
