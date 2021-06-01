<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$limit="";
$sql="select tb_orderinfo.* from tb_orderinfo";
if(!empty($_POST['u_OrderID'])){
  $limit=$limit."tb_orderinfo.OrderID='{$_POST['u_OrderID']}'";
}
if(!empty($_POST['u_CustomerName'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $sql=$sql.",tb_customerinfo";
  $limit=$limit."tb_orderinfo.CustomerID=tb_customerinfo.CustomerID and tb_customerinfo.CustomerName='{$_POST['u_CustomerName']}'";
}
if(!empty($_POST['u_PostStatus'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_orderinfo.PostStatus='{$_POST['u_PostStatus']}'";
}
if(!empty($_POST['u_ReceiveStatus'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_orderinfo.ReceiveStatus='{$_POST['u_ReceiveStatus']}'";
}
if(!empty($_POST['u_PayStatus'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_orderinfo.PayStatus='{$_POST['u_PayStatus']}'";
}
if(!empty($_POST['u_OrderStatus'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_orderinfo.OrderStatus='{$_POST['u_OrderStatus']}'";
}

if(!empty($limit)){
  $sql=$sql." where ".$limit.";";
}
$results = mysqli_query($conn,$sql);
$senddata=array();
if (!$results) {
  printf("Error: %s\n", mysqli_error($conn));
}
while($row = mysqli_fetch_assoc($results)){
  array_push($senddata, array(
      'orderid'=>$row['OrderID'],
      'receivername'=>$row['ReceiverName'],
      'poststatus'=>$row['PostStatus'],
      'receivestatus'=>$row['ReceiveStatus'],
      'paystatus'=>$row['PayStatus'],
      'orderstatus'=>$row['OrderStatus']
  ));
}echo json_encode($senddata);
mysqli_close($conn);

?>