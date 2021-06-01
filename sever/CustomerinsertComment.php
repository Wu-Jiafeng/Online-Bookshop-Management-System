<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
date_default_timezone_set('Asia/Shanghai');
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="SELECT * FROM tb_customerinfo WHERE CustomerName='{$_POST['u_CustomerID']}'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$CustomerID=$row['CustomerID'];
$CommentTime=date("Y-m-d") . ' ' . date('H:i:s');
$sql="UPDATE tb_orderjunction SET CommentStatus='已评价' WHERE OrderID={$_POST['u_OrderID']} AND BookID={$_POST['u_ItemID']};";
mysqli_query($conn,$sql);
$Comment=str_replace("'","\'",$_POST['u_Comment']);
$sql="INSERT INTO tb_commentinfo(OrderID,BookID,CustomerID,CommentDate,CommentContent,CommentScore,CommentFlag) VALUES({$_POST['u_OrderID']},{$_POST['u_ItemID']},{$CustomerID},'$CommentTime','{$Comment}',{$_POST['u_CommentScore']},'正在审核中');";
mysqli_query($conn,$sql);
echo json_encode(array('插入信息'=>'插入成功','sqlstr'=>$sql));
mysqli_close($conn);
?>