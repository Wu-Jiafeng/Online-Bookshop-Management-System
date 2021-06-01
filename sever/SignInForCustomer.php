<?php 
//简单校验用户名和密码不为空
header("Content-type:application/json;charset=UTF-8");
date_default_timezone_set('Asia/Shanghai');
require_once("connect.php");

$CustomerName=$_POST["u_CustomerName"];
$CustomerPwd=$_POST["u_CustomerPwd"];
mysqli_query($conn,'set names utf8');
$sql_search="Select * from tb_customerinfo where CustomerName='$CustomerName' and CustomerPwd='$CustomerPwd';";
$r=mysqli_query($conn,$sql_search);
$result=mysqli_fetch_array($r);
if($result){
	$CustomerLastLogTime=date("Y-m-d") . ' ' . date('H:i:s'); 
	$sql_insert="Insert Into tb_useroperation(CustomerName,OperationTime,Operation) VALUES('$CustomerName','$CustomerLastLogTime','登录系统');";
	mysqli_query($conn,$sql_insert);
	$sql_update="UPDATE tb_customerinfo SET CustomerLogTimes=CustomerLogTimes+1,CustomerLastLogTime= '$CustomerLastLogTime',IsOnline='Y' WHERE CustomerName = '$CustomerName';";
	mysqli_query($conn,$sql_update);
	mysqli_close($conn);
	echo json_encode(array('登录信息'=>'登录成功！'));
}
else{
	mysqli_close($conn);
	echo json_encode(array('登录信息'=>'用户名或密码不正确！'));
}
?>