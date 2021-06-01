<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片（需要修改！）
$sql="UPDATE tb_orderinfo SET CustomerID='{$_POST['u_CustomerID']}',OrderDate='{$_POST['u_OrderDate']}',Postmethod='{$_POST['u_Postmethod']}',Paymethod='{$_POST['u_Paymethod']}',ReceiverName= '{$_POST['u_ReceiverName']}',ReceiverAddress='{$_POST['u_ReceiverAddress']}',ReceiverTel='{$_POST['u_ReceiverTel']}',Memo='{$_POST['u_Memo']}',Totalprice={$_POST['u_Totalprice']},PostStatus='{$_POST['u_PostStatus']}',ReceiveStatus='{$_POST['u_ReceiveStatus']}',PayStatus='{$_POST['u_PayStatus']}',OrderStatus='{$_POST['u_OrderStatus']}' WHERE OrderID={$_POST['u_OrderID']}";
mysqli_query($conn,$sql);
echo json_encode(array('修改信息'=>'修改成功'));
mysqli_close($conn);
?>