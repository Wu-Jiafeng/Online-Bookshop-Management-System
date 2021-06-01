<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="UPDATE tb_purchasejunction SET UnitPrice={$_POST['u_UnitPrice']},BookNum={$_POST['u_ItemNum']} WHERE PurchaseID={$_POST['u_PurchaseID']} AND BookID={$_POST['u_ItemID']}";
mysqli_query($conn,$sql);
$sql="SELECT SUM(UnitPrice*BookNum) AS zongjia From tb_purchasejunction WHERE PurchaseID={$_POST['u_PurchaseID']}";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$sql="UPDATE tb_purchaseinfo SET TotalPrice={$row['zongjia']} WHERE PurchaseID={$_POST['u_PurchaseID']}";
mysqli_query($conn,$sql);
echo json_encode(array('修改信息'=>'修改成功','sql'=>$sql));
mysqli_close($conn);
?>