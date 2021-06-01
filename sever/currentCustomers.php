<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$sql="SELECT * FROM tb_customerinfo WHERE tb_customerinfo.CustomerID={$_GET['u_CustomerID']};";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$senddata=array();
array_push($senddata, array(
    'u_CustomerName'=>$row['CustomerName'],
    'u_CustomerPwd'=>$row['CustomerPwd'],
    'u_CustomerTName'=>$row['CustomerTName'],
    'u_CustomerSex'=>$row['CustomerSex'],
    'u_CustomerTel'=>$row['CustomerTel'],
    'u_CustomerEmail'=>$row['CustomerEmail'],
    'u_CustomerSMemberFlag'=>$row['CustomerSMemberFlag'],
    'u_CustomerQuestion'=>$row['CustomerQuestion'],
    'u_CustomerAnswer'=>$row['CustomerAnswer'],
));
echo json_encode($senddata);
	 
mysqli_close($conn);
?>