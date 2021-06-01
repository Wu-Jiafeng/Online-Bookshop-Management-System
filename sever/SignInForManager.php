<?php 
//简单校验用户名和密码不为空
header("Content-type:application/json;charset=UTF-8");
date_default_timezone_set('Asia/Shanghai');
require_once("connect.php");

$AdminName=$_POST["u_AdminName"];
$AdminPwd=$_POST["u_AdminPwd"];
mysqli_query($conn,'set names utf8');
$sql_search="Select * from tb_managerinfo where AdminName='$AdminName' and AdminPwd='$AdminPwd';";
$r=mysqli_query($conn,$sql_search);
$result=mysqli_fetch_array($r);
if($result){
	$AdminLastLogTime=date("Y-m-d") . ' ' . date('H:i:s'); 
	$sql_insert="Insert Into tb_useroperation(CustomerName,OperationTime,Operation) VALUES('$AdminName','$AdminLastLogTime','管理员:登录');";
	mysqli_query($conn,$sql_insert);
	$sql_update="UPDATE tb_managerinfo SET AdminLogTimes=AdminLogTimes+1,AdminLastLogTime= '$AdminLastLogTime',IsOnline='Y' WHERE AdminName = '$AdminName';";
	mysqli_query($conn,$sql_update);
	mysqli_close($conn);
	echo json_encode(array('登录信息'=>'登录成功！'));
}
else{
	mysqli_close($conn);
	echo json_encode(array('登录信息'=>'用户名或密码不正确！'));
}
?>