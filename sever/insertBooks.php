<?php
header("Content-type:application/json;charset=UTF-8");
date_default_timezone_set('Asia/Shanghai');
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$StoreTime=date("Y-m-d") . ' ' . date('H:i:s'); 
$sql="INSERT INTO tb_bookinfo(BookName,BookOutlineInCHN,BookOutlineInENG,BookStoreTime) VALUES('{$_POST['u_BookName']}','{$_POST['u_CHN']}','{$_POST['u_ENG']}','{$StoreTime}');";
mysqli_query($conn,$sql);
echo json_encode(array('插入信息'=>'插入成功'));
mysqli_close($conn);
?>