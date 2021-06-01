<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="DELETE FROM tb_purchasejunction WHERE BookID={$_POST['u_ItemID']} AND PurchaseID={$_POST['u_PurchaseID']} AND UnitPrice={$_POST['u_UnitPrice']};";
mysqli_query($conn,$sql);
$sql="SELECT SUM(UnitPrice*BookNum) AS zongjia From tb_purchasejunction WHERE PurchaseID={$_POST['u_PurchaseID']}";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$sql="UPDATE tb_purchaseinfo SET TotalPrice={$row['zongjia']} WHERE PurchaseID={$_POST['u_PurchaseID']}";
mysqli_query($conn,$sql);
$sql="UPDATE tb_bookinfo SET BookStoreAmount=BookStoreAmount-{$_POST['u_ItemNum']} WHERE BookID={$_POST['u_ItemID']};";
mysqli_query($conn,$sql);
echo json_encode(array('删除信息'=>'删除成功'));
mysqli_close($conn);
?>