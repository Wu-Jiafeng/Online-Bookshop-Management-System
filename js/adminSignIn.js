//当打开后台管理界面时清空table
$('documnet').ready(function() {
    $('#btnsubmit').click(function(e) {
        e.preventDefault();
		if ($('#u_AdminName').val() == ""||$('#u_AdminPwd').val() == ""){
            if($('#u_AdminName').val() == ""){
                $('#u_AdminName').parent().addClass('has-error');
				alert('无法登录：用户名为空！')
            }
            else{
                $('#u_AdminName').parent().removeClass('has-error');
            }
            if($('#u_AdminPwd').val() == ""){
                $('#u_AdminPwd').parent().addClass('has-error');
				alert('无法登录：密码为空！')
            }
            else{
                $('#u_AdminPwd').parent().removeClass('has-error');
            }
        }
		else{
			$('#u_AdminName').parent().removeClass('has-error');
			$('#u_AdminPwd').parent().removeClass('has-error');
			SignIn();
		}
    });
	
	$('#btnsubmit0').click(function(e) {
        e.preventDefault();
		window.location.href="./adminRegister.html";
        //输入判断
    });
	
	function setCookie(name,value,day) {
		var oDate = new Date();
		var d = oDate.setDate(oDate.getDate()+day);//设置从当前时间几天后过期
		var expires = 'expires='+ oDate;
		document.cookie = name+"="+value+";"+expires
	};

    //刷新页面，载入数据
    function SignIn() {
        $.ajax({
            url: 'sever/SignInForManager.php',
            type: 'POST',
            datatype: 'json',
            data: { u_AdminName: $('#u_AdminName').val(),
                    u_AdminPwd: $('#u_AdminPwd').val(),
                },
            success:function(ss){
				if(ss['登录信息']=='登录成功！'){
					setCookie('u_AdminName_cookie',$('#u_AdminName').val(),1);
					alert('登录成功！');
					window.location.href="./adminBooks.html";
				}
				else{
					alert('用户名或密码不正确！');
				}
            },
            error: function(e){
                console.log("error");
            },
        });
    }

});
