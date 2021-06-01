<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
date_default_timezone_set('Asia/Shanghai');
$time = time();
$ordertime=date("Y-m-d H:i:s");
$sql="SELECT CustomerID FROM tb_customerinfo WHERE CustomerName='{$_POST['u_CustomerName']}'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$sql="INSERT INTO tb_orderinfo(CustomerID,OrderDate,PostStatus,ReceiveStatus,PayStatus,OrderStatus) VALUES({$row['CustomerID']},'{$ordertime}','{$_POST['u_PostStatus']}','{$_POST['u_ReceiveStatus']}','{$_POST['u_PayStatus']}','{$_POST['u_OrderStatus']}');";
mysqli_query($conn,$sql);
echo json_encode(array('插入信息'=>'插入成功','sql'=>$sql));
mysqli_close($conn);
?>