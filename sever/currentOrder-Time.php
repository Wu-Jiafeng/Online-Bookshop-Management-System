<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$senddata=array();
for($i=0;$i<12;$i++){
	$j=11-$i;
	$firstday=date('Y-m-01',strtotime("-{$j} month"));
	$lastday=date('Y-m-t',strtotime("-{$j} month"));
	$month=date('Y-m',strtotime($firstday));
	$sql="SELECT tb_bookinfo.BookType,SUM(IFNULL(t1.SumNum,0)) AS SumNum From tb_bookinfo LEFT OUTER JOIN ( ";
	$sql=$sql."SELECT BookID,SUM(tb_orderjunction.Amount) AS ItemNum,COUNT(*) AS CountNum,SUM(tb_orderjunction.TotalPrice) AS SumNum FROM tb_orderjunction,tb_orderinfo WHERE tb_orderjunction.OrderID=tb_orderinfo.OrderID AND (tb_orderinfo.OrderDate BETWEEN '{$firstday}' AND '{$lastday}') GROUP BY BookID ) t1 On t1.BookID=tb_bookinfo.BookID GROUP BY tb_bookinfo.BookType;";
	$result= mysqli_query($conn,$sql);
	$k=0;
	while($row=mysqli_fetch_assoc($result)){
		if($i==0){
			array_push($senddata, array(
			'name'=>$row['BookType'],
			//'region'=>$row['BookType'],
			//'income'=>array(),
			//'lifeExpectancy'=>array(),
			'population'=>array(),
			));
		}
		//array_push($senddata[$k]['income'], array('date'=>$month,'value'=>intval($row['CountNum'])));
		array_push($senddata[$k]['population'], array('date'=>$month,'value'=>floatval($row['SumNum'])));
		//array_push($senddata[$k]['lifeExpectancy'], array('date'=>$month,'value'=>intval($row['ItemNum'])));
		$k++;
	}
}
//$sql="SELECT tb_bookinfo.BookName,tb_bookinfo.BookType,IFNULL(t1.CountNum,0) As CountNum,IFNULL(t1.SumNum,0) AS SumNum From tb_bookinfo LEFT OUTER JOIN ( ";
//$sql=$sql."SELECT BookID,COUNT(*) AS CountNum,SUM(tb_orderjunction.TotalPrice) AS SumNum FROM tb_orderjunction,tb_orderinfo WHERE tb_orderjunction.OrderID=tb_orderinfo.OrderID AND (tb_orderinfo.OrderDate BETWEEN '2019-11-01' AND '2019-12-31') GROUP BY BookID ) t1 On t1.BookID=tb_bookinfo.BookID;";
//$result= mysqli_query($conn,$sql);
//$senddata=array();
//while($row=mysqli_fetch_assoc($result)){
//	array_push($senddata, array(
//    'name'=>$row['BookName'],
//	'region'=>$row['BookType'],
//	'income'=>$row['CountNum'],
//	'lifeExpectancy'=>$row['SumNum'],
//	));
//}
echo json_encode($senddata);
	 
mysqli_close($conn);
?>