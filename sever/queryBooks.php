<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$limit="";
$sql="select tb_bookinfo.* from tb_bookinfo";
if(!empty($_POST['u_BookID'])){
  $limit=$limit."tb_bookinfo.BookID='{$_POST['u_BookID']}'";
}
if(!empty($_POST['u_BookName'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $limit=$limit."tb_bookinfo.BookName Like '%{$_POST['u_BookName']}%'";
}
if(!empty($_POST['u_Author'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $sql=$sql.",tb_authorinfo,tb_authorjunction";
  $limit=$limit."tb_bookinfo.BookID=tb_authorjunction.BookID and tb_authorinfo.AuthorID=tb_authorjunction.AuthorID and tb_authorinfo.AuthorName Like '%{$_POST['u_Author']}%'";
}
if(!empty($_POST['u_ENG'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $Words=explode(' ',$_POST['u_ENG']);
  for($i=0;$i<count($Words);$i++){
    if($i==0){
      $limit=$limit."tb_bookinfo.BookID in (select BookID from tb_vocabularyeng where Words='{$Words[$i]}')";
    }
    else{
      $limit=$limit." and tb_bookinfo.BookID in (select BookID from tb_vocabularyeng where Words='{$Words[$i]}')";
    }
  }
}
if(!empty($_POST['u_CHN'])){
  if(!empty($limit)){
    $limit=$limit." and ";
  }
  $Words=explode(' ',$_POST['u_CHN']);
  for($i=0;$i<count($Words);$i++){
    if($i==0){
      $limit=$limit."tb_bookinfo.BookID in (select BookID from tb_vocabularychn where Words='{$Words[$i]}')";
    }
    else{
      $limit=$limit." and tb_bookinfo.BookID in (select BookID from tb_vocabularychn where Words='{$Words[$i]}')";
    }
  }
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
      'bookid'=>$row['BookID'],
      'booktype'=>$row['BookType'],
      'bookimg'=>$row['BookPic'],
      'booknum'=>$row['BookStoreAmount'],
      'bookname'=>$row['BookName'],
  ));
}echo json_encode($senddata);
mysqli_close($conn);

?>