<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="SELECT tb_shoppingcart.* FROM tb_shoppingcart,tb_customerinfo WHERE tb_customerinfo.CustomerID=tb_shoppingcart.CustomerID AND tb_customerinfo.CustomerName='{$_POST['u_CustomerName']}' AND tb_shoppingcart.BookID={$_POST['u_BookID']}";
$result=mysqli_query($conn,$sql);
if(mysqli_num_rows($result)==0){
	$sql="SELECT * FROM tb_customerinfo WHERE CustomerName='{$_POST['u_CustomerName']}'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$sql="INSERT INTO tb_shoppingcart(CustomerID,BookID,Amount) VALUES({$row['CustomerID']},{$_POST['u_BookID']},{$_POST['u_Amount']});";
}
else{
	$row=mysqli_fetch_assoc($result);
	$sql="UPDATE tb_shoppingcart SET Amount=Amount+{$_POST['u_Amount']} WHERE ShoppingCartID={$row['ShoppingCartID']};";
}
mysqli_query($conn,$sql);
echo json_encode(array('插入信息'=>'插入成功','sql'=>$sql));
mysqli_close($conn);
?>