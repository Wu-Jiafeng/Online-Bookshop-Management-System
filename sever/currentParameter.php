<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$sql="SELECT * FROM tb_parameter;";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$senddata=array();
array_push($senddata, array(
    'u_WebName'=>$row['WebName'],
    'u_RegProvision'=>$row['RegProvision'],
    'u_Notice'=>$row['Notice'],
    'u_Address'=>$row['Address'],
    'u_Postcode'=>$row['Postcode'],
    'u_Tel'=>$row['Tel'],
    'u_Copyright'=>$row['Copyright'],
    'u_WebLogo'=>$row['WebLogo'],
    'u_Website'=>$row['Website'],
	'u_PayMethod'=>$row['PayMethod'],
	'u_PostMethod'=>$row['PostMethod'],
	'u_PostPrice'=>$row['PostPrice'],
	'u_PostDescription'=>$row['PostDescription'],
	'u_Service'=>$row['Service'],
	'u_Law'=>$row['Law'],
));
echo json_encode($senddata);
	 
mysqli_close($conn);
?>