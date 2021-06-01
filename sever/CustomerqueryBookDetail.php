<?php
header("Content-type:application/json;charset=UTF-8");
require_once("connect.php");
mysqli_query($conn,'SET NAMES utf8');

$sql="select tb_authorinfo.AuthorName,tb_authorinfo.AuthorType from tb_authorinfo,tb_authorjunction where tb_authorjunction.BookID={$_POST['u_BookID']} AND tb_authorinfo.AuthorID=tb_authorjunction.AuthorID;";
$results = mysqli_query($conn,$sql);
$authordata='';
while($row = mysqli_fetch_assoc($results)){
	if(!empty($authordata)){
		$authordata."；";
	}
	$authordata=$authordata.$row['AuthorName']."（{$row['AuthorType']}）";
}

$sql="select tb_commentinfo.*,tb_customerinfo.CustomerName from tb_commentinfo,tb_customerinfo where tb_commentinfo.BookID={$_POST['u_BookID']} AND tb_commentinfo.CommentFlag='通过审核' AND tb_commentinfo.CustomerID=tb_customerinfo.CustomerID;";
$results = mysqli_query($conn,$sql);
$commentdata=array();
while($row = mysqli_fetch_assoc($results)){
	array_push($commentdata,array(
		'CustomerName'=>$row['CustomerName'],
		'CommentDate'=>$row['CommentDate'],
		'CommentContent'=>$row['CommentContent'],
		'CommentScore'=>$row['CommentScore'],
	));
}

$sql="select avg(CommentScore) AS avgScore from tb_commentinfo where BookID={$_POST['u_BookID']};";
$results = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($results);
$avgScore=$row['avgScore'];

$sql_update="UPDATE tb_bookinfo SET BookLookAmount=BookLookAmount+1 WHERE BookID={$_POST['u_BookID']};";
mysqli_query($conn,$sql_update);
$sql="select * from tb_bookinfo where BookID={$_POST['u_BookID']}";
$results = mysqli_query($conn,$sql);
$senddata=array();
$row = mysqli_fetch_assoc($results);
array_push($senddata, array(
    'BookName'=>$row['BookName'],
	'BookPic'=>$row['BookPic'],
    'BookUnitPrice'=>$row['BookUnitPrice'],
	'BookSMemberPrice'=>$row['BookSMemberPrice'],
	'BookISBN'=>$row['BookISBN'],
	'BookPress'=>$row['BookPress'],
	'BookType'=>$row['BookType'],
    'BookPubDate'=>$row['BookPubDate'],
    'BookSize'=>$row['BookSize'],
    'BookVersion'=>$row['BookVersion'],
    'BookPages'=>$row['BookPages'],
	'BookOutlineInCHN'=>$row['BookOutlineInCHN'],
	'BookOutlineInENG'=>$row['BookOutlineInENG'],
	'Author'=>$authordata,
	'Comment'=>$commentdata,
	'avgScore'=>($avgScore." / 5.0000"),
));
echo json_encode($senddata);
mysqli_close($conn);

?>