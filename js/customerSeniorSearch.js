//当打开后台管理界面时清空table
$('documnet').ready(function() {
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
		setCookie('search_BookISBN',$('#u_BookISBN').val(),1);
		setCookie('search_BookType',$('#u_BookType').val(),1);
		setCookie('search_BookPress',$('#u_BookPress').val(),1);
		setCookie('search_Author',$('#u_Author').val(),1);
		setCookie('search_ENG',$('#u_ENG').val(),1);
		setCookie('search_CHN',$('#u_CHN').val(),1);
		setCookie('search_UnitPrice',$('#u_BookUnitPrice').val(),1);
		setCookie('search_BookDiscount',$('#u_BookDiscount').val(),1);
		setCookie('search_SeniorFlag','Yes',1)
		window.location.href="./customerSearchResult.html";
    });

});
