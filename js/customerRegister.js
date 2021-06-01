//当打开后台管理界面时清空table
$('documnet').ready(function() {
    $('#btnsubmit').click(function(e) {
        e.preventDefault();
		if ($('#u_CustomerName').val() == ""||($('#u_CustomerPwd').val()).length <5||$('#u_CustomerPwd_confirmed').val() != $('#u_CustomerPwd').val()){
            if($('#u_CustomerName').val() == ""){
                $('#u_CustomerName').parent().addClass('has-error');
				alert('无法注册：用户名为空！')
            }
            else{
                $('#u_CustomerName').parent().removeClass('has-error');
            }
            if(($('#u_CustomerPwd').val()).length <5){
                $('#u_CustomerPwd').parent().addClass('has-error');
				alert('无法注册：密码长度小于5！')
            }
            else{
                $('#u_CustomerPwd').parent().removeClass('has-error');
            }
			if($('#u_CustomerPwd_confirmed').val() != $('#u_CustomerPwd').val()){
                $('#u_CustomerPwd').parent().addClass('has-error');
				$('#u_CustomerPwd_confirmed').parent().addClass('has-error');
				alert('无法注册：两次输入的密码不相同！')
            }
            else{
                $('#u_CustomerPwd').parent().removeClass('has-error');
				$('#u_CustomerPwd_confirmed').parent().removeClass('has-error');
            }
        }
		else{
			$('#u_CustomerName').parent().removeClass('has-error');
			$('#u_CustomerPwd').parent().removeClass('has-error');
			$('#u_CustomerPwd_confirmed').parent().removeClass('has-error');
			SignIn();
		}
    });
	
	
	$('#btnsubmit2').click(function(e) {
        e.preventDefault();
		window.location.href="./index.html";
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
            url: 'sever/RegisterForCustomer.php',
            type: 'POST',
            datatype: 'json',
            data: { u_CustomerName: $('#u_CustomerName').val(),
                    u_CustomerPwd: $('#u_CustomerPwd').val(),
					u_CustomerTName: $('#u_CustomerTName').val(),
					u_CustomerSex: $('#u_CustomerSex').val(),
					u_CustomerTel: $('#u_CustomerTel').val(),
					u_CustomerEmail: $('#u_CustomerEmail').val()+$('#u_CustomerEmail_domain').val(),
					u_CustomerQuestion: $('#u_CustomerQuestion').val(),
					u_CustomerAnswer: $('#u_CustomerAnswer').val(),
                },
            success:function(ss){
				if(ss['注册信息']=='注册成功！'){
					setCookie('u_CustomerName_cookie',$('#u_CustomerName').val(),1);
					alert('登录成功！');
					window.location.href="./customerSearch.html";
				}
				else{
					alert('用户名已重复！');
				}
            },
            error: function(e){
                console.log("error");
            },
        });
    }

});
