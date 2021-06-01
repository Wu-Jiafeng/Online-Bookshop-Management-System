<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$limit="";
$sql="select * from tb_bookinfo";

if(!empty($limit)){
  $sql=$sql." where ".$limit.";";
}
$results = mysqli_query($conn,$sql);
$senddata=array();

if (!$results) {
  printf("Error: %s\n", mysqli_error($conn));
}

if($_POST['u_SearchFlag']=="BookSearchAmount"){
	while($row = mysqli_fetch_assoc($results)){
		array_push($senddata, array(
			'name'=>$row['BookName'],
			'cat'=>$row['BookType'],
			'icon'=>$row['BookPic'],
			'value'=>(int)($row['BookSearchAmount']),
			'desc'=>$row['BookOutlineInCHN'],
		));
	}echo json_encode($senddata);
}
else if($_POST['u_SearchFlag']=="BookLookAmount"){
	while($row = mysqli_fetch_assoc($results)){
		array_push($senddata, array(
			'name'=>$row['BookName'],
			'cat'=>$row['BookType'],
			'icon'=>$row['BookPic'],
			'value'=>(int)($row['BookLookAmount']),
			'desc'=>$row['BookOutlineInCHN'],
		));
	}echo json_encode($senddata);
}
else{
	while($row = mysqli_fetch_assoc($results)){
		array_push($senddata, array(
			'name'=>$row['BookName'],
			'cat'=>$row['BookType'],
			'icon'=>$row['BookPic'],
			'value'=>(int)($row['BookDealAmount']),
			'desc'=>$row['BookOutlineInCHN'],
		));
	}echo json_encode($senddata);	
}
mysqli_close($conn);

?>