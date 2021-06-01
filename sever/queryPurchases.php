<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$limit="";
$sql="select tb_purchaseinfo.* from tb_purchaseinfo";
if(!empty($_POST['u_PurchaseID'])){
  $limit=$limit."tb_purchaseinfo.PurchaseID='{$_POST['u_PurchaseID']}'";
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
      'purchaseid'=>$row['PurchaseID'],
      'purchasedate'=>$row['PurchaseDate'],
      'totalprice'=>$row['TotalPrice'],
  ));
}echo json_encode($senddata);
mysqli_close($conn);

?>