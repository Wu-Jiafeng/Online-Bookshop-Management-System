<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$sql="SELECT * FROM tb_orderinfo WHERE tb_orderinfo.OrderID={$_GET['u_OrderID']};";
$sql1="SELECT * FROM tb_orderjunction WHERE  tb_orderjunction.OrderID={$_GET['u_OrderID']};";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$result1=mysqli_query($conn,$sql1);
$senddata=array();
$itemdata=array();
while($row1=mysqli_fetch_assoc($result1)){
  array_push($itemdata, array(
    'u_BookID'=>$row1['BookID'],
    'u_BookName'=>$row1['BookName'],
    'u_Amount'=>$row1['Amount'],
	'u_UnitPrice'=>($row1['TotalPrice'])/($row1['Amount']),
	'u_CommentStatus'=>$row1['CommentStatus'],
  ));
}
array_push($senddata, array(
    'u_ItemInfo'=>$itemdata,
));
echo json_encode($senddata);
	 
mysqli_close($conn);
?>