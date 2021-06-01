<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$sql="SELECT tb_customerinfo.*,tb_useroperation.OperationTime FROM tb_customerinfo,tb_useroperation WHERE tb_useroperation.Operation='登录系统' AND tb_customerinfo.CustomerName=tb_useroperation.CustomerName;";
$result= mysqli_query($conn,$sql);
$senddata=array();
while($row=mysqli_fetch_assoc($result)){
	array_push($senddata, array(
		'u_LogTime'=>$row['OperationTime'],
		'u_CustomerName'=>$row['CustomerName'],
		'u_CustomerLogTimes'=>$row['CustomerLogTimes'],
		'u_CustomerSex'=>$row['CustomerSex'],
		'u_CustomerSMemberFlag'=>$row['CustomerSMemberFlag'],
	));
}
echo json_encode($senddata);
	 
mysqli_close($conn);
?>