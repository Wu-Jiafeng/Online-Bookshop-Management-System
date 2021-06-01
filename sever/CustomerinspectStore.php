<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
date_default_timezone_set('Asia/Shanghai');
$sql="SELECT * FROM tb_customerinfo WHERE CustomerName='{$_POST['CustomerName']}'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$CustomerID=$row['CustomerID'];
if(!empty($_POST['allBought'])){
	$sql="SELECT * FROM tb_shoppingcart WHERE CustomerID={$CustomerID};";
	$result=mysqli_query($conn,$sql);
	$Flag=True;
	while($row = mysqli_fetch_assoc($result)){
		$Amount=$row['Amount'];
		$BookID=$row['BookID'];
		$sql="SELECT * FROM tb_bookinfo WHERE BookID={$BookID};";
		$result0=mysqli_query($conn,$sql);
		$row0=mysqli_fetch_assoc($result0);
		$BookStoreAmount=$row0['BookStoreAmount'];
		if($Amount>$BookStoreAmount){
			$Flag=False;
			echo json_encode(array('检查库存'=>'库存不足！','sql'=>$BookStoreAmount));
			break;
		}
	}
	if($Flag){
		echo json_encode(array('检查库存'=>'库存充足！','sql'=>$sql));
	}
}
else if(!empty($_POST['singleItemID'])){
	$sql="SELECT * FROM tb_shoppingcart WHERE CustomerID={$CustomerID} AND BookID={$_POST['singleItemID']};";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$Amount=$row['Amount'];
	$sql="SELECT * FROM tb_bookinfo WHERE BookID={$_POST['singleItemID']};";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$BookStoreAmount=$row['BookStoreAmount'];
	if($Amount>$BookStoreAmount){
		echo json_encode(array('检查库存'=>'库存不足！','sql'=>$BookStoreAmount));
	}
	else{
		echo json_encode(array('检查库存'=>'库存充足！','sql'=>$sql));
	}
}
mysqli_close($conn);
?>