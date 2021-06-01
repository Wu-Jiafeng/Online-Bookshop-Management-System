<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
date_default_timezone_set('Asia/Shanghai');
$resultdata=array();
$senddata=array();
$sql="SELECT * FROM tb_customerinfo WHERE CustomerName='{$_POST['CustomerName']}'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$CustomerID=$row['CustomerID'];
$SMFlag=$row['CustomerSMemberFlag'];
$TotalPrice=0;
if(!empty($_POST['allBought'])){
	$sql="SELECT * FROM tb_shoppingcart WHERE CustomerID={$CustomerID};";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_assoc($result)){
		$BookID=$row['BookID'];
		$sql="SELECT * FROM tb_bookinfo WHERE BookID={$BookID};";
		$result0=mysqli_query($conn,$sql);
		$row0=mysqli_fetch_assoc($result0);
		$BookName=$row0['BookName'];
		$BookPic=$row0['BookPic'];
		$BookDiscount=$row0['BookDiscount'];
		if($SMFlag=='是'){
			$Price=$row0['BookSMemberPrice'];
		}
		else{
			$Price=$row0['BookUnitPrice'];
		}
		array_push($resultdata, array(
			'BookPic'=>$BookPic,
			'BookName'=>$BookName,
			'BookUnitPrice'=>$Price,
			'Amount'=>$row['Amount'],
		));
		$TotalPrice=$TotalPrice+$BookDiscount*$Price*$row['Amount'];
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
	$BookName=$row['BookName'];
	$BookPic=$row['BookPic'];
	$BookDiscount=$row['BookDiscount'];
	if($SMFlag=='是'){
		$Price=$row['BookSMemberPrice'];
	}
	else{
		$Price=$row['BookUnitPrice'];
	}
	array_push($resultdata, array(
		'BookPic'=>$BookPic,
		'BookName'=>$BookName,
		'BookUnitPrice'=>$Price,
		'Amount'=>$Amount,
	));
	$TotalPrice=$TotalPrice+$BookDiscount*$Price*$Amount;
}
else if(!empty($_POST['BuyID'])){
	$Amount=1;
	$sql="SELECT * FROM tb_bookinfo WHERE BookID={$_POST['BuyID']};";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$BookName=$row['BookName'];
	$BookPic=$row['BookPic'];
	$BookDiscount=$row['BookDiscount'];
	if($SMFlag=='是'){
		$Price=$row['BookSMemberPrice'];
	}
	else{
		$Price=$row['BookUnitPrice'];
	}
	array_push($resultdata, array(
		'BookPic'=>$BookPic,
		'BookName'=>$BookName,
		'BookUnitPrice'=>$Price,
		'Amount'=>$Amount,
	));
	$TotalPrice=$TotalPrice+$BookDiscount*$Price*$Amount;
}
array_push($senddata, array(
	'Item'=>$resultdata,
	'TotalPrice'=>$TotalPrice,
));
echo json_encode($senddata);
mysqli_close($conn);
?>