<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="DELETE FROM tb_commentinfo WHERE CommentID={$_POST['u_CommentID']};";//注意删了客户需要保留评论（还是认为需要加一个字段）
mysqli_query($conn,$sql);
echo json_encode(array('删除信息'=>'删除成功'));
mysqli_close($conn);
?>