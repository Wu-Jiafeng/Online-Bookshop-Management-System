<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="UPDATE tb_parameter SET WebName='{$_POST['u_WebName']}',RegProvision='{$_POST['u_RegProvision']}',Notice='{$_POST['u_Notice']}',Address='{$_POST['u_Address']}',Postcode= '{$_POST['u_Postcode']}',Tel='{$_POST['u_Tel']}',Copyright='{$_POST['u_Copyright']}',WebLogo='{$_POST['u_WebLogo']}',Website='{$_POST['u_Website']}',PayMethod='{$_POST['u_PayMethod']}',PostMethod='{$_POST['u_PostMethod']}',PostPrice={$_POST['u_PostPrice']},PostDescription='{$_POST['u_PostDescription']}',Service='{$_POST['u_Service']}',Law='{$_POST['u_Law']}';";
mysqli_query($conn,$sql);
echo json_encode(array('修改信息'=>'修改成功',"sql"=>$sql));
mysqli_close($conn);
?>