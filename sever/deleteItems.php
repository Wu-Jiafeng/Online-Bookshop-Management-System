<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="SELECT COUNT(*) AS CountNum FROM tb_orderjunction WHERE OrderID={$_POST['u_OrderID']};";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row['CountNum']==1){
	$sql="DELETE FROM tb_orderinfo WHERE OrderID={$_POST['u_OrderID']};";
}
else{
	$sql="DELETE FROM tb_orderjunction WHERE BookID={$_POST['u_ItemID']} AND OrderID={$_POST['u_OrderID']};";
}
mysqli_query($conn,$sql);
echo json_encode(array('删除信息'=>'删除成功'));
mysqli_close($conn);
?>