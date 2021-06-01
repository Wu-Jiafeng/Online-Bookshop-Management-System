<?php
//用于编辑时显示当前作者
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$sql="SELECT * FROM tb_orderjunction WHERE BookID={$_GET['u_ItemID']};";
$result= mysqli_query($conn,$sql);
$senddata=array();
while($row=mysqli_fetch_assoc($result)){
  array_push($senddata, array(
  		'u_Amount'=>$row['Amount'],
  ));
}echo json_encode($senddata);
	 
mysqli_close($conn);
?>