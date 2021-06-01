<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="UPDATE tb_commentinfo SET CommentFlag='{$_POST['u_CommentFlag']}' WHERE CommentID={$_POST['u_CommentID']}";
mysqli_query($conn,$sql);
$sql="SELECT * From tb_commentinfo WHERE CommentID={$_POST['u_CommentID']}";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($_POST['u_CommentFlag']=='未通过审核'){
	$sql="UPDATE tb_orderjunction SET CommentStatus='未评价' WHERE OrderID={$row['OrderID']} AND BookID={$row['BookID']}";
}
else{
	$sql="UPDATE tb_orderjunction SET CommentStatus='已评价' WHERE OrderID={$row['OrderID']} AND BookID={$row['BookID']}";
}
mysqli_query($conn,$sql);
echo json_encode(array('修改信息'=>'修改成功',"sql"=>$sql));
mysqli_close($conn);
?>