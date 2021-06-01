<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$limit="tb_bookinfo.BookID=tb_bookrecommend.BookID and tb_customerinfo.CustomerID=tb_bookrecommend.CustomerID and tb_customerinfo.CustomerName='{$_POST["u_CustomerName"]}'";
$sql="select tb_bookinfo.* from tb_bookinfo,tb_customerinfo,tb_bookrecommend";

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
      'BookID'=>$row['BookID'],
      'BookPic'=>$row['BookPic'],
      'BookName'=>$row['BookName'],
  ));
}echo json_encode($senddata);
mysqli_close($conn);

?>