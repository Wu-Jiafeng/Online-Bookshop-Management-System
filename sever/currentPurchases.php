<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$bookid=$_GET['u_PurchaseID'];
$sql="SELECT tb_purchaseinfo.* FROM tb_purchaseinfo WHERE tb_purchaseinfo.PurchaseID={$_GET['u_PurchaseID']};";
$sql1="SELECT tb_purchasejunction.*,tb_bookinfo.BookName FROM tb_bookinfo,tb_purchasejunction WHERE  tb_bookinfo.BookID=tb_purchasejunction.BookID AND tb_purchasejunction.PurchaseID={$_GET['u_PurchaseID']};";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$result1=mysqli_query($conn,$sql1);
$senddata=array();
$authordata=array();
while($row1=mysqli_fetch_assoc($result1)){
  array_push($authordata, array(
    'u_BookID'=>$row1['BookID'],
	'u_BookName'=>$row1['BookName'],
    'u_UnitPrice'=>$row1['UnitPrice'],
    'u_BookNum'=>$row1['BookNum'],
  ));
}
array_push($senddata, array(
    'u_PurchaseDate'=>$row['PurchaseDate'],
    'u_ItemInfo'=>$authordata,
));
echo json_encode($senddata);
	 
mysqli_close($conn);
?>