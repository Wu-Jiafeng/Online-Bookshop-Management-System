<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$limit="IsOnline='Y'";
$sql="select COUNT(*) AS CountNum from tb_customerinfo";
if($_POST['u_CustomerSex']=="Male"){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."CustomerSex='M'";
}
else if($_POST['u_CustomerSex']=="Female"){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."CustomerSex='F'";
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
      'CountNum'=>$row['CountNum'],
  ));
}echo json_encode($senddata);
mysqli_close($conn);

?>