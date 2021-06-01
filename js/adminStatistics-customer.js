//当打开后台管理界面时清空table
$('documnet').ready(function() {
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
	var customerCard=$('#sensor-moni-text'),
		customerCard1=$('#sensor-moni-text1'),
		customerCard2=$('#sensor-moni-text2');
    var getting = {
        url:'sever/currentCustomerOnline.php',
        dataType:'json',
        success:function(ss) {
			customerCard.empty();
			customerCard1.empty();
			customerCard2.empty();
			customerCard.append('<h1>'+ss[0].u_CountNum+'</h1>');
			customerCard1.append('<h1>'+ss[0].u_CountNum1+'</h1>');
			customerCard2.append('<h1>'+ss[0].u_CountNum2+'</h1>');
		},
        error: function(e){
            console.log("error");
        },
	};
	window.setInterval(function(){$.ajax(getting)},1500);
});