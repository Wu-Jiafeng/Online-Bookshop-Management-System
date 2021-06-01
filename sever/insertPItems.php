<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="SELECT * FROM tb_bookinfo WHERE BookID={$_POST['u_ItemID']};";
$result=mysqli_query($conn,$sql);
if(mysqli_num_rows($result)==0){
	echo json_encode(array('插入信息'=>'插入失败，未知的图书ID'));
}
else{
	$sql="SELECT * FROM tb_purchasejunction WHERE BookID={$_POST['u_ItemID']} AND PurchaseID={$_POST['u_PurchaseID']} AND UnitPrice={$_POST['u_UnitPrice']};";
	$result=mysqli_query($conn,$sql);
	if(mysqli_num_rows($result)!=0){
		$sql="UPDATE tb_purchasejunction SET BookNum=BookNum+{$_POST['u_ItemNum']} WHERE BookID={$_POST['u_ItemID']} AND PurchaseID={$_POST['u_PurchaseID']} AND UnitPrice={$_POST['u_UnitPrice']};";
	}
	else{
		$sql="INSERT INTO tb_purchasejunction VALUES( {$_POST['u_PurchaseID']},{$_POST['u_ItemID']},{$_POST['u_UnitPrice']},{$_POST['u_ItemNum']} );";
	}
	mysqli_query($conn,$sql);
	$sql="SELECT SUM(UnitPrice*BookNum) AS zongjia From tb_purchasejunction WHERE PurchaseID={$_POST['u_PurchaseID']}";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$sql="UPDATE tb_purchaseinfo SET TotalPrice={$row['zongjia']} WHERE PurchaseID={$_POST['u_PurchaseID']}";
	mysqli_query($conn,$sql);
	$sql="UPDATE tb_bookinfo SET BookStoreAmount=BookStoreAmount+{$_POST['u_ItemNum']} WHERE BookID={$_POST['u_ItemID']};";
	mysqli_query($conn,$sql);
	echo json_encode(array('插入信息'=>'插入成功'));
}
mysqli_close($conn);
?>