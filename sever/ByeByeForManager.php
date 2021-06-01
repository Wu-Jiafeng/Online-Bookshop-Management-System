<?php 
//简单校验用户名和密码不为空
header("Content-type:application/json;charset=UTF-8");
date_default_timezone_set('Asia/Shanghai');
require_once("connect.php");

$AdminName=$_POST["u_AdminName"];
mysqli_query($conn,'set names utf8');
$AdminLastLogTime=date("Y-m-d") . ' ' . date('H:i:s'); 
$sql_insert="Insert Into tb_useroperation(CustomerName,OperationTime,Operation) VALUES('$AdminName','$AdminLastLogTime','管理员:退出登录');";
mysqli_query($conn,$sql_insert);
$sql_update="UPDATE tb_managerinfo SET IsOnline='N' WHERE AdminName = '$AdminName';";
mysqli_query($conn,$sql_update);
mysqli_close($conn);
echo json_encode(array('登录信息'=>'退出登录！'));
?>