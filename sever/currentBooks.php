<?php
//用于编辑时显示当前书籍
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$bookid=$_GET['u_BookID'];
$sql="SELECT tb_bookinfo.* FROM tb_bookinfo WHERE tb_bookinfo.BookID={$_GET['u_BookID']};";
$sql1="SELECT tb_authorinfo.* FROM tb_authorinfo,tb_authorjunction WHERE  tb_authorinfo.AuthorID=tb_authorjunction.AuthorID AND tb_authorjunction.BookID={$_GET['u_BookID']};";
$result= mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$result1=mysqli_query($conn,$sql1);
$senddata=array();
$authordata=array();
while($row1=mysqli_fetch_assoc($result1)){
  array_push($authordata, array(
    'u_AuthorID'=>$row1['AuthorID'],
    'u_AuthorName'=>$row1['AuthorName'],
    'u_AuthorType'=>$row1['AuthorType'],
  ));
}
array_push($senddata, array(
    'u_BookName'=>$row['BookName'],
    'u_AuthorInfo'=>$authordata,
    'u_BookISBN'=>$row['BookISBN'],
    'u_BookPress'=>$row['BookPress'],
    'u_BookType'=>$row['BookType'],
    'u_BookPubDate'=>$row['BookPubDate'],
    'u_BookSize'=>$row['BookSize'],
    'u_BookVersion'=>$row['BookVersion'],
    'u_BookPages'=>$row['BookPages'],
    'u_BookPic'=>$row['BookPic'],
    'u_ENG'=>$row['BookOutlineInENG'],
    'u_CHN'=>$row['BookOutlineInCHN'],
    'u_BookUnitPrice'=>$row['BookUnitPrice'],
    'u_BookSMemberPrice'=>$row['BookSMemberPrice'],
    'u_BookDiscount'=>$row['BookDiscount'],
));
echo json_encode($senddata);
	 
mysqli_close($conn);
?>