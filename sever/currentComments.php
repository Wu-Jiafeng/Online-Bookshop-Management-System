<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$sql="SELECT * FROM tb_commentinfo WHERE tb_commentinfo.CommentID={$_GET['u_CommentID']};";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$senddata=array();
array_push($senddata, array(
    'u_CommentFlag'=>$row['CommentFlag'],
));
echo json_encode($senddata);
	 
mysqli_close($conn);
?>