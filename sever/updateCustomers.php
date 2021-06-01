<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="UPDATE tb_customerinfo SET CustomerName='{$_POST['u_CustomerName']}',CustomerPwd='{$_POST['u_CustomerPwd']}',CustomerTName='{$_POST['u_CustomerTName']}',CustomerSex='{$_POST['u_CustomerSex']}',CustomerTel= '{$_POST['u_CustomerTel']}',CustomerEmail='{$_POST['u_CustomerEmail']}',CustomerSMemberFlag='{$_POST['u_CustomerSMemberFlag']}',CustomerQuestion='{$_POST['u_CustomerQuestion']}',CustomerAnswer='{$_POST['u_CustomerAnswer']}' WHERE CustomerID={$_POST['u_CustomerID']}";
mysqli_query($conn,$sql);
echo json_encode(array('修改信息'=>'修改成功',"sql"=>$sql));
mysqli_close($conn);
?>