<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$limit="";
$sql="select tb_customerinfo.* from tb_customerinfo";
if(!empty($_POST['u_CustomerID'])){
  $limit=$limit."tb_customerinfo.CustomerID='{$_POST['u_CustomerID']}'";
}
if(!empty($_POST['u_CustomerName'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_customerinfo.CustomerName Like '%{$_POST['u_CustomerName']}%'";
}
if(!empty($_POST['u_CustomerSex'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_customerinfo.CustomerSex = '{$_POST['u_CustomerSex']}'";
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
      'customerid'=>$row['CustomerID'],
      'customername'=>$row['CustomerName'],
      'customerlogtimes'=>$row['CustomerLogTimes'],
      'customerlastlogtime'=>$row['CustomerLastLogTime'],
      'customersmemberflag'=>$row['CustomerSMemberFlag'],
  ));
}echo json_encode($senddata);
mysqli_close($conn);

?>