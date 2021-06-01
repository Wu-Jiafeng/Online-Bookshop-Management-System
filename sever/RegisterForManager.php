<?php 
//简单校验用户名和密码不为空
header("Content-type:application/json;charset=UTF-8");
date_default_timezone_set('Asia/Shanghai');
$AdminName=$_POST["u_AdminName"];
$AdminPwd=$_POST["u_AdminPwd"];

require_once("connect.php");

mysqli_query($conn,'set names utf8');
$sql_search="Select * from tb_managerinfo where AdminName='$AdminName';";
$r=mysqli_query($conn,$sql_search);
$result=mysqli_fetch_array($r);
if(!$result){
	$AdminLastLogTime=date("Y-m-d") . ' ' . date('H:i:s'); 
	$sql_insert="Insert Into tb_useroperation(CustomerName,OperationTime,Operation) VALUES('$AdminName','$AdminLastLogTime','管理员:注册');";
	mysqli_query($conn,$sql_insert);
	$sql_insert="Insert Into tb_managerinfo(AdminName,AdminPwd,AdminLastLogTime,IsOnline) VALUES('$AdminName','$AdminPwd','$AdminLastLogTime','Y');";
	mysqli_query($conn,$sql_insert);
	mysqli_close($conn);
	echo json_encode(array('注册信息'=>'注册成功！'));
}
else{
	mysqli_close($conn);
	echo json_encode(array('注册信息'=>'用户名已重复！'));
}
?>