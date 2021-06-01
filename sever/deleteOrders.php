<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="DELETE FROM tb_orderinfo WHERE OrderID={$_POST['u_OrderID']};";
mysqli_query($conn,$sql);
echo json_encode(array('删除信息'=>'删除成功'));
mysqli_close($conn);
?>