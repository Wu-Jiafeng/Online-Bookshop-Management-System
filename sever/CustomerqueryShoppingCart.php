<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');


$sql="select * from tb_customerinfo where CustomerName='{$_POST['u_CustomerName']}';";
$results = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($results);
$CustomerSMemberFlag=$row['CustomerSMemberFlag'];
if($CustomerSMemberFlag=='是'){
	$sql="select tb_shoppingcart.Amount,tb_bookinfo.*,(tb_bookinfo.BookDiscount*(tb_bookinfo.BookSMemberPrice*tb_shoppingcart.Amount)) AS Totalprice from tb_shoppingcart,tb_bookinfo";
}
else{
	$sql="select tb_shoppingcart.Amount,tb_bookinfo.*,tb_bookinfo.BookDiscount*tb_bookinfo.BookUnitPrice*tb_shoppingcart.Amount AS Totalprice from tb_shoppingcart,tb_bookinfo";
}
$limit="tb_bookinfo.BookID=tb_shoppingcart.BookID";
if(!empty($_POST['u_CustomerName'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $sql=$sql.",tb_customerinfo";
  $limit=$limit."tb_shoppingcart.CustomerID=tb_customerinfo.CustomerID and tb_customerinfo.CustomerName='{$_POST['u_CustomerName']}'";
}
if(!empty($limit)){
  $sql=$sql." where ".$limit.";";
}

$results = mysqli_query($conn,$sql);
$senddata=array();
if (!$results) {
  printf("Error: %s\n", mysqli_error($conn));
}
while($row = mysqli_fetch_assoc($results)){
	if($CustomerSMemberFlag=='是'){
		$Price=$row['BookSMemberPrice'];
	}
	else{
		$Price=$row['BookUnitPrice'];
	}
	array_push($senddata, array(
      'BookID'=>$row['BookID'],
      'BookName'=>$row['BookName'],
	  'BookUnitPrice'=>$Price,
	  'Amount'=>$row['Amount'],
	  'Totalprice'=>$row['Totalprice'],
  ));
}echo json_encode($senddata);
mysqli_close($conn);

?>