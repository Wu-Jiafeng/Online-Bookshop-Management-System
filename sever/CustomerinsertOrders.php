<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');
//修改图片
date_default_timezone_set('Asia/Shanghai');
$time = time();
$ordertime=date("Y-m-d H:i:s");
$sql="SELECT * FROM tb_customerinfo WHERE CustomerName='{$_POST['CustomerName']}'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$CustomerID=$row['CustomerID'];
$SMFlag=$row['CustomerSMemberFlag'];
$sql="INSERT INTO tb_orderinfo(CustomerID,OrderDate,Postmethod,Paymethod,ReceiverName,ReceiverAddress,ReceiverTel,Memo,PostStatus,ReceiveStatus,PayStatus,OrderStatus) VALUES({$CustomerID},'{$ordertime}','{$_POST['Postmethod']}','{$_POST['Paymethod']}','{$_POST['ReceiverName']}','{$_POST['ReceiverAddress']}','{$_POST['ReceiverTel']}','{$_POST['Memo']}','未发货','未收货','已支付','交易进行中');";
mysqli_query($conn,$sql);
$sql="SELECT * FROM tb_orderinfo WHERE CustomerID={$CustomerID} AND OrderDate='{$ordertime}';";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$OrderID=$row['OrderID'];
if(!empty($_POST['allBought'])){
	$sql="SELECT * FROM tb_shoppingcart WHERE CustomerID={$CustomerID};";
	$result=mysqli_query($conn,$sql);
	while($row = mysqli_fetch_assoc($result)){
		$Amount=$row['Amount'];
		$BookID=$row['BookID'];
		$sql="SELECT * FROM tb_bookinfo WHERE BookID={$BookID};";
		$result0=mysqli_query($conn,$sql);
		$row0=mysqli_fetch_assoc($result0);
		$BookName=$row0['BookName'];
		$Discount=$row0['BookDiscount'];
		if($SMFlag=='是'){
			$Price=$row0['BookSMemberPrice'];
		}
		else{
			$Price=$row0['BookUnitPrice'];
		}
		$TotalPrice=$Amount*$Price*$Discount;
		$sql="INSERT INTO tb_orderjunction(OrderID,BookID,BookName,Amount,TotalPrice,CommentStatus) VALUES({$OrderID},{$BookID},'{$BookName}',{$Amount},{$TotalPrice},'未评价');";
		mysqli_query($conn,$sql);
		$sql="UPDATE tb_bookinfo SET BookDealAmount=BookDealAmount+{$Amount},BookStoreAmount=BookStoreAmount-{$Amount} WHERE BookID={$BookID};";
		mysqli_query($conn,$sql);
		$sql="DELETE FROM tb_shoppingcart WHERE CustomerID={$CustomerID} AND BookID={$BookID};";
		mysqli_query($conn,$sql);
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
	$Discount=$row['BookDiscount'];
	if($SMFlag=='是'){
		$Price=$row['BookSMemberPrice'];
	}
	else{
		$Price=$row['BookUnitPrice'];
	}
	$TotalPrice=$Amount*$Price*$Discount;
	$sql="INSERT INTO tb_orderjunction(OrderID,BookID,BookName,Amount,TotalPrice,CommentStatus) VALUES({$OrderID},{$_POST['singleItemID']},'{$BookName}',{$Amount},{$TotalPrice},'未评价');";
	mysqli_query($conn,$sql);
	$sql="UPDATE tb_bookinfo SET BookDealAmount=BookDealAmount+{$Amount},BookStoreAmount=BookStoreAmount-{$Amount} WHERE BookID={$_POST['singleItemID']};";
	mysqli_query($conn,$sql);
	$sql="DELETE FROM tb_shoppingcart WHERE CustomerID={$CustomerID} AND BookID={$_POST['singleItemID']};";
	mysqli_query($conn,$sql);
}
else if(!empty($_POST['BuyID'])){
	$Amount=1;
	$sql="SELECT * FROM tb_bookinfo WHERE BookID={$_POST['BuyID']};";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$BookName=$row['BookName'];
	$Discount=$row['BookDiscount'];
	if($SMFlag=='是'){
		$Price=$row['BookSMemberPrice'];
	}
	else{
		$Price=$row['BookUnitPrice'];
	}
	$TotalPrice=$Amount*$Price*$Discount;
	$sql="INSERT INTO tb_orderjunction(OrderID,BookID,BookName,Amount,TotalPrice,CommentStatus) VALUES({$OrderID},{$_POST['BuyID']},'{$BookName}',{$Amount},{$TotalPrice},'未评价');";
	mysqli_query($conn,$sql);
	$sql="UPDATE tb_bookinfo SET BookDealAmount=BookDealAmount+{$Amount},BookStoreAmount=BookStoreAmount-{$Amount} WHERE BookID={$_POST['BuyID']};";
	mysqli_query($conn,$sql);
}
$sql="SELECT SUM(TotalPrice) AS totalprice FROM tb_orderjunction WHERE OrderID={$OrderID};";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$sql="UPDATE tb_orderinfo SET TotalPrice={$row['totalprice']} WHERE OrderID={$OrderID};";
mysqli_query($conn,$sql);
echo json_encode(array('插入信息'=>'插入成功','sql'=>$sql));
mysqli_close($conn);
?>