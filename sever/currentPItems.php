<?php
//用于编辑时显示当前作者
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$sql="SELECT tb_purchasejunction.* FROM tb_purchasejunction WHERE tb_purchasejunction.BookID={$_GET['u_ItemID']};";
$result= mysqli_query($conn,$sql);
$senddata=array();
while($row=mysqli_fetch_assoc($result)){
  array_push($senddata, array(
  		'u_ItemID'=>$row['BookID'],
      'u_UnitPrice'=>$row['UnitPrice'],
	  'u_ItemNum'=>$row['BookNum'],
  ));
}echo json_encode($senddata);
	 
mysqli_close($conn);
?>