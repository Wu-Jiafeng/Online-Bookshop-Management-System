<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="UPDATE tb_purchaseinfo SET PurchaseDate= '{$_POST['u_PurchaseDate']}' WHERE PurchaseID={$_POST['u_PurchaseID']}";
mysqli_query($conn,$sql);
echo json_encode(array('修改信息'=>'修改成功'));
mysqli_close($conn);
?>