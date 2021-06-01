<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$senddata=array();
$firstday=date('Y-m-01',strtotime("-1 month"));
$lastday=date('Y-m-t',strtotime("-1 month"));
$sql="SELECT tb_bookinfo.*,IFNULL(t1.ItemNum,0) AS ItemNum From tb_bookinfo LEFT OUTER JOIN ( SELECT BookID,SUM(tb_orderjunction.Amount) AS ItemNum FROM tb_orderjunction,tb_orderinfo WHERE tb_orderjunction.OrderID=tb_orderinfo.OrderID AND (tb_orderinfo.OrderDate BETWEEN '{$firstday}' AND '{$lastday}') GROUP BY BookID ) t1 On t1.BookID=tb_bookinfo.BookID ORDER BY ItemNum DESC;";
$result= mysqli_query($conn,$sql);
$k=0;
while($row=mysqli_fetch_assoc($result)){
	$k++;
	array_push($senddata, array(
		'BookName'=>$row['BookName'],
		'BookPic'=>$row['BookPic'],
		'BookType'=>$row['BookType'],
		'BookUnitPrice'=>$row['BookUnitPrice'],
		'BookSMemberPrice'=>$row['BookSMemberPrice'],
		'BookStoreAmount'=>$row['BookStoreAmount'],
		'ItemNum'=>$row['ItemNum'],
		));
	if($k==8){
		break;
	}
}
echo json_encode($senddata);
	 
mysqli_close($conn);
?>