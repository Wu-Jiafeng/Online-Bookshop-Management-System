<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="SELECT COUNT(*) AS CountNum FROM tb_authorjunction WHERE AuthorID={$_POST['u_AuthorID']};";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row['CountNum']==1){
	$sql="DELETE FROM tb_authorinfo WHERE AuthorID={$_POST['u_AuthorID']};";
}
else{
	$sql="DELETE FROM tb_authorjunction WHERE BookID={$_POST['u_BookID']} AND AuthorID={$_POST['u_AuthorID']};";
}
mysqli_query($conn,$sql);
echo json_encode(array('删除信息'=>'删除成功'));
mysqli_close($conn);
?>