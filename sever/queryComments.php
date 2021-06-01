<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$limit="tb_commentinfo.BookID=tb_bookinfo.BookID and tb_commentinfo.CustomerID=tb_customerinfo.CustomerID";
$sql="select tb_commentinfo.*,tb_bookinfo.BookName,tb_customerinfo.CustomerName from tb_commentinfo,tb_bookinfo,tb_customerinfo";
if(!empty($_POST['u_CommentID'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_commentinfo.CommentID={$_POST['u_CommentID']}";
}
if(!empty($_POST['u_CustomerID'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_commentinfo.CustomerID={$_POST['u_CustomerID']}";
}
if(!empty($_POST['u_CustomerName'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_customerinfo.CustomerName Like '%{$_POST['u_CustomerName']}%'";
}
if(!empty($_POST['u_BookID'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_commentinfo.BookID={$_POST['u_BookID']}";
}
if(!empty($_POST['u_BookName'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_bookinfo.BookName Like '%{$_POST['u_BookName']}%'";
}
if(!empty($_POST['u_CommentFlag'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_commentinfo.CommentFlag = '{$_POST['u_CommentFlag']}'";
}
if(!empty($_POST['u_CommentScore'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_commentinfo.CommentScore = {$_POST['u_CommentScore']}";
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
  array_push($senddata, array(
	  'commentid'=>$row['CommentID'],
      //'customerid'=>$row['CustomerID'],
      'customername'=>$row['CustomerName'],
      //'bookid'=>$row['BookID'],
	  'bookname'=>$row['BookName'],
      'commentcontent'=>$row['CommentContent'],
      'commentdate'=>$row['CommentDate'],
	  'commentscore'=>$row['CommentScore'],
	  'commentflag'=>$row['CommentFlag'],
  ));
}echo json_encode($senddata);
mysqli_close($conn);

?>