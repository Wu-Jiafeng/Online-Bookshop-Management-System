<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
date_default_timezone_set('Asia/Shanghai');
$purchasetime=date("Y-m-d H:i:s");
$sql="INSERT INTO tb_purchaseinfo(PurchaseDate,TotalPrice) VALUES('{$purchasetime}',0);";
mysqli_query($conn,$sql);
echo json_encode(array('插入信息'=>'插入成功','sql'=>$sql));
mysqli_close($conn);
?>