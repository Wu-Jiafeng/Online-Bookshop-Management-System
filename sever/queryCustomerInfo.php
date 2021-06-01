<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$senddata=array();
$sql="SELECT *,COUNT(*) AS CountNum FROM tb_customerinfo GROUP BY CustomerSex;";
$result= mysqli_query($conn,$sql);
while($row=mysqli_fetch_assoc($result)){
	array_push($senddata, array("Sex:{$row['CustomerSex']}",$row['CountNum']));
}

$sql="SELECT CustomerSex,CustomerSMemberFlag,COUNT(*) AS CountNum FROM tb_customerinfo GROUP BY CustomerSex,CustomerSMemberFlag;";
$result= mysqli_query($conn,$sql);
while($row=mysqli_fetch_assoc($result)){
	array_push($senddata, array("Sex:{$row['CustomerSex']}-会员:{$row['CustomerSMemberFlag']}",$row['CountNum']));
}

$sql="SELECT *,COUNT(*) AS CountNum FROM tb_customerinfo GROUP BY CustomerSex,CustomerSMemberFlag HAVING CustomerLogTimes<10;";
$result= mysqli_query($conn,$sql);
while($row=mysqli_fetch_assoc($result)){
	array_push($senddata, array("Sex:{$row['CustomerSex']}-会员:{$row['CustomerSMemberFlag']}-Log:x<10",$row['CountNum']));
}

$sql="SELECT *,COUNT(*) AS CountNum FROM tb_customerinfo GROUP BY CustomerSex,CustomerSMemberFlag HAVING CustomerLogTimes>=10 AND CustomerLogTimes<30;";
$result= mysqli_query($conn,$sql);
while($row=mysqli_fetch_assoc($result)){
	array_push($senddata, array("Sex:{$row['CustomerSex']}-会员:{$row['CustomerSMemberFlag']}-Log:10<=x<30",$row['CountNum']));
}

$sql="SELECT *,COUNT(*) AS CountNum FROM tb_customerinfo GROUP BY CustomerSex,CustomerSMemberFlag HAVING CustomerLogTimes>=30;";
$result= mysqli_query($conn,$sql);
while($row=mysqli_fetch_assoc($result)){
	array_push($senddata, array("Sex:{$row['CustomerSex']}-会员:{$row['CustomerSMemberFlag']}-Log:x>=30",$row['CountNum']));
}

echo json_encode($senddata);
	 
mysqli_close($conn);
?>