<?php
$servername="localhost";
$username="root";
$password="123456";
$dbname="bookdb_12";
//建立连接
$conn = mysqli_connect($servername,$username,$password,$dbname);
if(!$conn){
 die("Connection failed: " . mysqli_connect_error());
};
 ?>