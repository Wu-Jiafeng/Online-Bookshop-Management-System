<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$sql="SELECT COUNT(*) AS CountNum FROM tb_customerinfo WHERE IsOnline='Y';";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$sql="SELECT COUNT(*) AS CountNum FROM tb_customerinfo;";
$result= mysqli_query($conn,$sql);
$row1=mysqli_fetch_assoc($result);
$sql="SELECT COUNT(*) AS CountNum FROM tb_customerinfo WHERE CustomerSMemberFlag='是';";
$result= mysqli_query($conn,$sql);
$row2=mysqli_fetch_assoc($result);
$senddata=array();
array_push($senddata, array(
    'u_CountNum'=>$row['CountNum'],
	'u_CountNum1'=>$row1['CountNum'],
	'u_CountNum2'=>$row2['CountNum'],
));
echo json_encode($senddata);
	 
mysqli_close($conn);
?>