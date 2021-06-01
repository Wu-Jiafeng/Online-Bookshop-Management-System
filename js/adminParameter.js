//当打开后台管理界面时清空table
$('documnet').ready(function() {
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
		$.ajax({
            url: 'sever/updateParameter.php',
            type: 'post',
            data: {
				u_WebName:$('#u_WebName').val(),
                u_RegProvision:$('#u_RegProvision').val(),
                u_Notice:$('#u_Notice').val(),
                u_Address:$('#u_Address').val(),
                u_Postcode:$('#u_Postcode').val(),
                u_Tel:$('#u_Tel').val(),
                u_Copyright:$('#u_Copyright').val(),
                u_WebLogo:$('#u_WebLogo').val(),
                u_Website:$('#u_Website').val(),
				u_PayMethod:$('#u_PayMethod').val(),
				u_PostMethod:$('#u_PostMethod').val(),
				u_PostPrice:$('#u_PostPrice').val(),
				u_PostDescription:$('#u_PostDescription').val(),
				u_Service:$('#u_Service').val(),
				u_Law:$('#u_Law').val(),
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
		$.ajax({
            url: 'sever/currentParameter.php',
            type: 'get',
            datatype: 'json',
            data: null,
            success: function(ss) {
                // $('#ubookid').val(data[0].bookid)
                $('#u_WebName').val(ss[0].u_WebName);
                $('#u_RegProvision').val(ss[0].u_RegProvision);
                $('#u_Notice').val(ss[0].u_Notice);
                $('#u_Address').val(ss[0].u_Address);
                $('#u_Postcode').val(ss[0].u_Postcode);
                $('#u_Tel').val(ss[0].u_Tel);
                $('#u_Copyright').val(ss[0].u_Copyright);
                $('#u_WebLogo').val(ss[0].u_WebLogo);
                $('#u_Website').val(ss[0].u_Website);
				$('#u_PayMethod').val(ss[0].u_PayMethod);
				$('#u_PostMethod').val(ss[0].u_PostMethod);
				$('#u_PostPrice').val(ss[0].u_PostPrice);
				$('#u_PostDescription').val(ss[0].u_PostDescription);
				$('#u_Service').val(ss[0].u_Service);
				$('#u_Law').val(ss[0].u_Law);
            },
            error: function(e){
                console.log("error");
            },
        });
    }

});
