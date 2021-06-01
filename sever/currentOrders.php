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
  ));
}
array_push($senddata, array(
    'u_CustomerID'=>$row['CustomerID'],
    'u_OrderDate'=>$row['OrderDate'],
    'u_ItemInfo'=>$itemdata,
    'u_Postmethod'=>$row['Postmethod'],
    'u_Paymethod'=>$row['Paymethod'],
    'u_ReceiverName'=>$row['ReceiverName'],
    'u_ReceiverAddress'=>$row['ReceiverAddress'],
    'u_ReceiverTel'=>$row['ReceiverTel'],
    'u_Memo'=>$row['Memo'],
    'u_Totalprice'=>$row['Totalprice'],
    'u_PostStatus'=>$row['PostStatus'],
    'u_ReceiveStatus'=>$row['ReceiveStatus'],
    'u_PayStatus'=>$row['PayStatus'],
    'u_OrderStatus'=>$row['OrderStatus'],
));
echo json_encode($senddata);
	 
mysqli_close($conn);
?>