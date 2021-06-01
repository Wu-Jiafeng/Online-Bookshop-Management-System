<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="SELECT * FROM tb_authorinfo WHERE AuthorID={$_POST['u_AuthorID']};";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
//必须要有所修改才sql
if($row['AuthorName']!=$_POST['u_AuthorName']||$row['AuthorType']!=$_POST['u_AuthorType']){
	//如果修改了作者类型，则进入判断，否则只修改了名字，直接update
	if($row['AuthorType']!=$_POST['u_AuthorType']){
		//首先去除联接关系，如果该作者类型的作者只有一个作品，则将作者信息也去除
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
		//然后添加联接关系，如果存在修改类型的作者信息，则直接添加联接关系，否则先添加作者信息再添加联接信息。
		$sql="SELECT AuthorID FROM tb_authorinfo WHERE AuthorName='{$_POST['u_AuthorName']}' AND AuthorType='{$_POST['u_AuthorType']}';";
		$result= mysqli_query($conn,$sql);
		if(mysqli_num_rows($result)!=0){
			$row=mysqli_fetch_assoc($result);
			$sql="INSERT INTO tb_authorjunction VALUES( {$row["AuthorID"]},{$_POST['u_BookID']} );";
		}
		else{
			$sql="INSERT INTO tb_authorinfo(AuthorName,AuthorType) VALUES('{$_POST['u_AuthorName']}','{$_POST['u_AuthorType']}');";
			mysqli_query($conn,$sql);
			$sql="SELECT AuthorID FROM tb_authorinfo WHERE AuthorName='{$_POST['u_AuthorName']}' AND AuthorType='{$_POST['u_AuthorType']}';";
			$result= mysqli_query($conn,$sql);
			$row=mysqli_fetch_assoc($result);
			$sql="INSERT INTO tb_authorjunction VALUES( {$row["AuthorID"]},{$_POST['u_BookID']} );";
		}
	}
	else{
		$sql="UPDATE tb_authorinfo SET AuthorName='{$_POST['u_AuthorName']}',AuthorType='{$_POST['u_AuthorType']}' WHERE AuthorID={$_POST['u_AuthorID']};";
	}
	mysqli_query($conn,$sql);
	echo json_encode(array('修改信息'=>'修改成功','sqlstr'=>$sql));
}
else{
	echo json_encode(array('修改信息'=>'信息无改动','sqlstr'=>$sql));
}
mysqli_close($conn);
?>