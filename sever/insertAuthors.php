<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="SELECT * FROM tb_authorinfo WHERE AuthorName='{$_POST['u_AuthorName']}' AND AuthorType='{$_POST['u_AuthorType']}';";
$result=mysqli_query($conn,$sql);
if(mysqli_num_rows($result)==0){
	$sql="INSERT INTO tb_authorinfo(AuthorName,AuthorType) VALUES('{$_POST['u_AuthorName']}','{$_POST['u_AuthorType']}');";
	mysqli_query($conn,$sql);
}
$sql="SELECT AuthorID FROM tb_authorinfo WHERE AuthorName='{$_POST['u_AuthorName']}' AND AuthorType='{$_POST['u_AuthorType']}';";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$sql="INSERT INTO tb_authorjunction VALUES( {$row["AuthorID"]},{$_POST['u_BookID']} );";
mysqli_query($conn,$sql);
echo json_encode(array('插入信息'=>'插入成功'));
mysqli_close($conn);
?>