//当打开后台管理界面时清空table
$('documnet').ready(function() {
	var $BookRankTable=$('#booktable tbody');
	document.getElementById("u_CustomerName_cookie").innerHTML='<li class="active"><a>欢迎你！'+getCookie('u_CustomerName_cookie')+'</a></li>';
	refreshTable();
	refreshPic();
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
		setCookie('search_SeniorFlag','No',1)
		window.location.href="./customerSearchResult.html";
    });
	
	$('#btnsubmit0').click(function(e) {
        e.preventDefault();
		window.location.href="./customerSeniorSearch.html";
        //输入判断
    });

	var $BookPicTable=$('#ooommm div');
	$BookPicTable.on('click', '.mmm', function(e) {
		var BookDetailID=$(this).attr('id');
        BookDetail(BookDetailID);
    });
	
	function BookDetail(BookDetailID){
		setCookie('BookDetailID',BookDetailID,1);
		window.location.href="./customerBookDetail.html";
	}
	
	
    //刷新页面，载入数据
    function refreshTable() {
        $.ajax({
            url: 'sever/queryBookRank.php',
            type: 'POST',
            datatype: 'json',
            data: {},
            success:function(ss){
                ss.forEach(function( item, index, array){
                    var $BookName = $('<td>').html(item.BookName);
                    var $BookType = $('<td>').html(item.BookType);
                    var $BookPic = $('<img src="'+item.BookPic+'" height="50" width="50">').html('');
                    var $BookUnitPrice = $('<td>').html(item.BookUnitPrice);
                    var $BookSMemberPrice=$('<td>').html(item.BookSMemberPrice);
					var $BookStoreAmount=$('<td>').html(item.BookStoreAmount);
					var $ItemNum=$('<td>').html(item.ItemNum);
                    var $tRow = $('<tr>');
                    $tRow.append($BookName, $BookPic,$BookType,$BookUnitPrice,$BookSMemberPrice,$BookStoreAmount,$ItemNum);
                    $BookRankTable.append($tRow);
                });
            },
            error: function(e){
                console.log("error");
            },
        });
    }
	
    function refreshPic() {
        $.ajax({
            url: 'sever/CustomerqueryBookRecommend.php',
            type: 'POST',
            datatype: 'json',
            data: {
				u_CustomerName: getCookie('u_CustomerName_cookie'),
			},
            success:function(ss){
				document.getElementById("bpic1").innerHTML='<a id="'+ss[0].BookID+'" class="mmm" href="javascript:void(0);" οnclick="BookDetail()">'+'<img alt="" src="'+ss[0].BookPic+'" height="400" width="400"/>'+'</a>'+'<div class="carousel-caption"><h4>'+ss[0].BookName+'</h4></div>';
				document.getElementById("bpic2").innerHTML='<a id="'+ss[1].BookID+'" class="mmm" href="javascript:void(0);" οnclick="BookDetail()">'+'<img alt="" src="'+ss[1].BookPic+'" height="400" width="400"/>'+'</a>'+'<div class="carousel-caption"><h4>'+ss[1].BookName+'</h4></div>';
				document.getElementById("bpic3").innerHTML='<a id="'+ss[2].BookID+'" class="mmm" href="javascript:void(0);" οnclick="BookDetail()">'+'<img alt="" src="'+ss[2].BookPic+'" height="400" width="400"/>'+'</a>'+'<div class="carousel-caption"><h4>'+ss[2].BookName+'</h4></div>';
            },
            error: function(e){
                console.log("error");
            },
        });
    }

});
