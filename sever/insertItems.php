<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
$sql="SELECT * FROM tb_orderjunction WHERE BookID='{$_POST['u_ItemID']}' AND OrderID='{$_POST['u_OrderID']}';";
$result=mysqli_query($conn,$sql);
if(mysqli_num_rows($result)==0){
	$sql="SELECT BookName From tb_bookinfo WHERE BookID='{$_POST['u_ItemID']}';";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$commentflag="未评价";
	$sql="INSERT INTO tb_orderjunction(OrderID,BookID,BookName,Amount,TotalPrice,CommentStatus) VALUES({$_POST['u_OrderID']},{$_POST['u_ItemID']},'{$row["BookName"]}',{$_POST['u_Amount']},0,'{$commentflag}');";
	mysqli_query($conn,$sql);
	echo json_encode(array('插入信息'=>'插入成功','sqlstr'=>$sql));
}
else{
	echo json_encode(array('插入信息'=>'该订单已存在该商品信息！'));
}
mysqli_close($conn);
?>