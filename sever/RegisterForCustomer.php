<?php 
//简单校验用户名和密码不为空
header("Content-type:application/json;charset=UTF-8");
date_default_timezone_set('Asia/Shanghai');
$CustomerName=$_POST["u_CustomerName"];
$CustomerPwd=$_POST["u_CustomerPwd"];

require_once("connect.php");

mysqli_query($conn,'set names utf8');
$sql_search="Select * from tb_customerinfo where CustomerName='$CustomerName';";
$r=mysqli_query($conn,$sql_search);
$result=mysqli_fetch_array($r);
if(!$result){
	$CustomerLastLogTime=date("Y-m-d") . ' ' . date('H:i:s'); 
	$sql_insert="Insert Into tb_useroperation(CustomerName,OperationTime,Operation) VALUES('$CustomerName','$CustomerLastLogTime','注册');";
	mysqli_query($conn,$sql_insert);
	$sql_insert="Insert Into tb_customerinfo(CustomerName,CustomerPwd,CustomerTName,CustomerSex,CustomerTel,CustomerEmail,CustomerRegTime,CustomerSMemberFlag,CustomerQuestion,CustomerAnswer,CustomerLastLogTime,IsOnline) VALUES('$CustomerName','$CustomerPwd','{$_POST['u_CustomerTName']}','{$_POST['u_CustomerSex']}','{$_POST['u_CustomerTel']}','{$_POST['u_CustomerEmail']}','$CustomerLastLogTime','否','{$_POST['u_CustomerQuestion']}','{$_POST['u_CustomerAnswer']}','$CustomerLastLogTime','Y');";
	mysqli_query($conn,$sql_insert);
	mysqli_close($conn);
	echo json_encode(array('注册信息'=>'注册成功！'));
}
else{
	mysqli_close($conn);
	echo json_encode(array('注册信息'=>'用户名已重复！'));
}
?>