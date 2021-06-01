//当打开后台管理界面时清空table
$('documnet').ready(function() {
    $('#btnsubmit').click(function(e) {
        e.preventDefault();
		if ($('#u_CustomerName').val() == ""||$('#u_CustomerPwd').val() == ""){
            if($('#u_CustomerName').val() == ""){
                $('#u_CustomerName').parent().addClass('has-error');
				alert('无法登录：用户名为空！')
            }
            else{
                $('#u_CustomerName').parent().removeClass('has-error');
            }
            if($('#u_CustomerPwd').val() == ""){
                $('#u_CustomerPwd').parent().addClass('has-error');
				alert('无法登录：密码为空！')
            }
            else{
                $('#u_CustomerPwd').parent().removeClass('has-error');
            }
        }
		else{
			$('#u_CustomerName').parent().removeClass('has-error');
			$('#u_CustomerPwd').parent().removeClass('has-error');
			SignIn();
		}
    });
	
	$('#btnsubmit0').click(function(e) {
        e.preventDefault();
		window.location.href="./customerRegister.html";
        //输入判断
    });
	
	$('#btnsubmit1').click(function(e) {
        e.preventDefault();
		window.location.href="#";
        //输入判断
    });
	
	$('#btnsubmit2').click(function(e) {
        e.preventDefault();
		window.location.href="./adminSignIn.html";
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
            url: 'sever/SignInForCustomer.php',
            type: 'POST',
            datatype: 'json',
            data: { u_CustomerName: $('#u_CustomerName').val(),
                    u_CustomerPwd: $('#u_CustomerPwd').val(),
                },
            success:function(ss){
				if(ss['登录信息']=='登录成功！'){
					setCookie('u_CustomerName_cookie',$('#u_CustomerName').val(),1);
					alert('登录成功！');
					window.location.href="./customerSearch.html";
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
