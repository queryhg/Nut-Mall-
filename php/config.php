<?php
/**
 * Created by PhpStorm.
 * User: hg116
 * Date: 2018/11/29
 * Time: 19:17
 */

header("Access-Control-Allow-Origin:*");

//1.准备数据库参数
$host="127.0.0.1";
$userName="root";
$userPwd="123456";
$port="3306";
$library="wangyinet";

//2.创建数据库链接

$conn=new mysqli($host,$userName,$userPwd,$library,$port);


//3.设置字符链接
mysqli_query($conn,"set names utf8");