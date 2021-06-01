//当打开后台管理界面时清空table
$('documnet').ready(function() {
    var $bookTable = $('#booktable tbody');
    var $authorTable=$('#authortable tbody');
    //刷新页面
    refreshBook();

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
	
    //插入图书信息
    $('#btnsubmit').click(function(e) {
        e.preventDefault();
        //输入判断
        if ($('#ReceiverName').val() == ""||$('#ReceiverAddress').val() == ""||$('#ReceiverTel').val() == ""){
            if($('#ReceiverName').val() == ""){
                $('#ReceiverName').parent().addClass('has-error');
            }
            else{
                $('#ReceiverName').parent().removeClass('has-error');
            }
            if($('#ReceiverAddress').val() == ""){
                $('#ReceiverAddress').parent().addClass('has-error');
            }
            else{
                $('#ReceiverAddress').parent().removeClass('has-error');
            }
            if($('#ReceiverTel').val() == ""){
                $('#ReceiverTel').parent().addClass('has-error');
            }
            else{
                $('#ReceiverTel').parent().removeClass('has-error');
            }
        }  
        else {
            var jsonBooks = {
				CustomerName:getCookie('u_CustomerName_cookie'),
				allBought:getCookie('allBought'),
				singleItemID:getCookie('singleItemID'),
				BuyID:getCookie('BuyID'),
                ReceiverName: $('#ReceiverName').val(),
                ReceiverAddress: $('#ReceiverAddress').val(),
                ReceiverTel: $('#ReceiverTel').val(),
                Memo: $('#Memo').val(),
                Postmethod:$('#Postmethod').val(),
                Paymethod:$('#Paymethod').val()
                };
                //提交添加的新闻
            $.ajax({
                url: 'sever/CustomerinsertOrders.php',
                type: 'post',
                data: jsonBooks,
                datatype: 'json',
                success: function(data) {
                    console.log(data);
					alert('您已成功下订！');
					clearCookie('allBought');
					clearCookie('singleItemID');
					clearCookie('BuyID');
					window.location.href="./customerSearch.html";
                    //跳转首页
                },
                error:function(e)
              {
                  console.log("error");
            },
            });
        }
    });

    //刷新页面，载入数据
    function refreshBook() {
        $bookTable.empty();
          $.ajax({
              url: 'sever/CustomerqueryOrderItem.php',
              type: 'POST',
              datatype: 'json',
              data: { 
                    CustomerName:getCookie('u_CustomerName_cookie'),
					allBought:getCookie('allBought'),
					singleItemID:getCookie('singleItemID'),
					BuyID:getCookie('BuyID'),
                },
              success:function(ss){
				  document.getElementById("d_TotalPrice").innerHTML=ss[0].TotalPrice;
                  (ss[0].Item).forEach(function( item, index, array){
                      var $BookPic = $('<img src="'+item.BookPic+'"height="100" width="100" />').html('');
                      var $BookName=$('<td>').html(item.BookName);
                      var $Amount=$('<td>').html(item.Amount);
                      var $BookUnitPrice=$('<td>').html(item.BookUnitPrice);
                      var $tRow = $('<tr>');
                      $tRow.append($BookPic,$BookName,$Amount,$BookUnitPrice);
                      $bookTable.append($tRow);
                  });
              },
              error:function(e){
				  console.log("error");
			  },
              
          });
      }

});
