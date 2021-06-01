<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="SELECT Amount FROM tb_orderjunction WHERE OrderID={$_POST['u_OrderID']} AND BookID={$_POST['u_ItemID']};";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
//必须要有所修改才sql
if($row['Amount']!=$_POST['u_Amount']){
	$sql="SELECT tb_customerinfo.* FROM tb_customerinfo,tb_orderinfo WHERE tb_orderinfo.CustomerID=tb_customerinfo.CustomerID AND tb_orderinfo.OrderID={$_POST['u_OrderID']};";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$SMFLag=$row['CustomerSMemberFlag'];
	$sql="SELECT * FROM tb_bookinfo WHERE BookID={$_POST['u_ItemID']};";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($SMFLag=='是'){
		$Price=$row['BookSMemberPrice'];
		$Discount=$row['BookDiscount'];
	}
	else{
		$Price=$row['BookUnitPrice'];
		$Discount=$row['BookDiscount'];
	}
	$sql="UPDATE tb_orderjunction SET Amount={$_POST['u_Amount']},TotalPrice={$_POST['u_Amount']}*{$Price}*{$Discount} WHERE OrderID={$_POST['u_OrderID']} AND BookID={$_POST['u_ItemID']};";
	mysqli_query($conn,$sql);
	$sql="SELECT SUM(TotalPrice) AS totalprice FROM tb_orderjunction WHERE OrderID={$_POST['u_OrderID']};";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$sql="UPDATE tb_orderinfo SET TotalPrice={$row['totalprice']} WHERE OrderID={$_POST['u_OrderID']};";
	mysqli_query($conn,$sql);
	echo json_encode(array('修改信息'=>'修改成功','sqlstr'=>$sql));
}
else{
	echo json_encode(array('修改信息'=>'信息无改动','sqlstr'=>$sql));
}
mysqli_close($conn);
?>