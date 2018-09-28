<?php
/**
 * Created by PhpStorm.
 * User: fzq
 * Date: 2018/9/27
 * Time: 21:22
 */
header("Content-type: text/html; charset=utf-8");
session_start();
$PHPSESSID = session_id(); // 取得当前的SessionID
$dsn = "mysql:host=47.95.234.105;dbname=baicaowei";
$mysqlaccount = "fzq";
$mysqlPassWord = "1995feng320";
try {
    $pdo = new PDO($dsn, $mysqlaccount, $mysqlPassWord);
} catch (PDOException $exception) {
    echo $exception;
}
if (isset($_POST["type"])&&$_POST["type"]=="goodList"){
    $sql="select * from proinfo";
    $pdo->prepare($sql);
}