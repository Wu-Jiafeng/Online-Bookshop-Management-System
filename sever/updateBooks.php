<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$BookOutlineInENG=str_replace("'","\'",$_POST['u_ENG']);
$sql="UPDATE tb_bookinfo SET BookOutlineInCHN='{$_POST['u_CHN']}',BookOutlineInENG='{$BookOutlineInENG}',BookName='{$_POST['u_BookName']}',BookISBN='{$_POST['u_BookISBN']}',BookPress='{$_POST['u_BookPress']}',BookType='{$_POST['u_BookType']}',BookPubDate= '{$_POST['u_BookPubDate']}',BookSize='{$_POST['u_BookSize']}',BookVersion={$_POST['u_BookVersion']},BookPages={$_POST['u_BookPages']},BookPic='{$_POST['u_BookPic']}',BookUnitPrice={$_POST['u_BookUnitPrice']},BookSMemberPrice={$_POST['u_BookSMemberPrice']},BookDiscount={$_POST['u_BookDiscount']} WHERE BookID={$_POST['u_BookID']}";
mysqli_query($conn,$sql);
echo json_encode(array('修改信息'=>'修改成功','sql'=>$sql));
mysqli_close($conn);
?>