<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
$sql="SELECT * FROM tb_customerinfo WHERE CustomerName='{$_POST['u_CustomerName']}';";
$result=mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$CustomerID = $row['CustomerID'];
//删除购物车
$sql="DELETE FROM tb_shoppingcart WHERE (BookID={$_POST['u_BookID']} and CustomerID = {$CustomerID});";
mysqli_query($conn,$sql);
echo json_encode(array('删除信息'=>'删除成功'));
mysqli_close($conn);
?>