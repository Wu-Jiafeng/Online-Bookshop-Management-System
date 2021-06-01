//当打开后台管理界面时清空table
$('documnet').ready(function() {
    var $bookTable = $('#booktable tbody');
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
	
    $('#btnsubmit').click(function(e) {
		setCookie('allBought', "Y", 1); 
		clearCookie('singleItemID');
        e.preventDefault();//一键结算
		$.ajax({
            url: 'sever/CustomerinspectStore.php',
            type: 'post',
            data: { 
				CustomerName: getCookie('u_CustomerName_cookie'),
				allBought:getCookie('allBought'),
				singleItemID:getCookie('singleItemID'),
            },
            success: function(data) {
				if(data['检查库存']=='库存充足！'){
					window.location.href="./customerPay.html";
				}
				else{
					alert('某件商品库存不足！请检查后再试！');
				}
            },
            error:function(e)
              {
                console.log("error")
             },
        });
    });
    var deleteId = null;
    //删除图书的功能
    $bookTable.on('click', '.btn-danger', function(e) {
        $('#deleModal').modal('show');
        deleteId = ($(this).parent().prevAll().eq(4).html());
        console.log(deleteId);
    });
   //结算功能
   $bookTable.on('click', '.btn-primary', function(e){
		setCookie('singleItemID',$(this).parent().prevAll().eq(4).html(), 1); 
		clearCookie('allBought');
		e.preventDefault();//一键结算
		$.ajax({
            url: 'sever/CustomerinspectStore.php',
            type: 'post',
            data: { 
				CustomerName: getCookie('u_CustomerName_cookie'),
				allBought:getCookie('allBought'),
				singleItemID:getCookie('singleItemID'),
            },
            success: function(data) {
				if(data['检查库存']=='库存充足！'){
					window.location.href="./customerPay.html";
				}
				else{
					alert('商品库存不足！请检查后再试！');
				}
            },
            error:function(e)
              {
                console.log("error")
             },
        });
   })
    $('#deleModal #confirmDelete').click(function(e) {
        $.ajax({
            url: 'sever/CustomerdeleteShoppingCart.php',
            type: 'post',
            data: { 
				u_BookID:deleteId,
				u_CustomerName:getCookie('u_CustomerName_cookie'),
            },
            success: function(data) {
                console.log(data);
                $('#deleModal').modal('hide');
                refreshBook();
            },
            error:function(e)
              {
                console.log("error")
             },
        });
    });
    //刷新页面，载入数据
    function refreshBook() {
        $bookTable.empty();
          $.ajax({
              url: 'sever/CustomerqueryShoppingCart.php',
              type: 'POST',
              datatype: 'json',
              data: { 
                     u_CustomerName: getCookie('u_CustomerName_cookie'),
                  },
              success:function(ss){
                  ss.forEach(function( item, index, array){
					  //var $checkboxtd=$('<td>');
					  //var $checkbox=$('<input type="checkbox">').html('');
					  //$checkboxtd.append($checkbox);
                      var $BookID = $('<td>').html(item.BookID);
                      var $BookName=$('<td>').html(item.BookName);
                      var $BookUnitPrice=$('<td>').html(item.BookUnitPrice);
                      var $Amount=$('<td>').html(item.Amount);
					  var $Totalprice=$('<td>').html(item.Totalprice);
                      var $booktd = $('<td>');
                      var $bookbtn = $('<button>').addClass('btn btn-primary btn-xs').html('结算');
                      var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                      $booktd.append($bookbtn, $btndele);
                      var $tRow = $('<tr>');
                      $tRow.append($BookID,$BookName,$BookUnitPrice,$Amount,$Totalprice,$booktd);
                      $bookTable.append($tRow);
                  });
              },
              error:function(e)
              {
                  console.log("error")
             },
              
          });
      }
  
});