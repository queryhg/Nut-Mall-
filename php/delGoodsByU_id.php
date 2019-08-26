<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/12/14
 * Time: 1:36
 */
header("Content-type: text/html; charset=utf-8");
session_start();
$PHPSESSID = session_id(); // 取得当前的SessionID

$dsn = "mysql:host=127.0.0.1;dbname=baicaowei";
$mysqlaccount = "root";
$mysqlPassWord = "";
try {
    $pdo = new PDO($dsn, $mysqlaccount, $mysqlPassWord);
} catch (PDOException $exception) {
    echo $exception;
}

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    print_r(json_encode(Status::$l_0));
    return;
}
$UID = $_REQUEST['user_id'];

$sqlDEL = "DELETE FROM carts WHERE user_id=?";

$stmt = $pdo->prepare($sqlDEL);
$stmt->bindParam(1, $UID, PDO::PARAM_STR);


$res =$stmt->execute();
if(count($res)>=1){
    unset($_SESSION["cartList"]);
    print_r(json_encode(array('status'=>1,'msg'=>'成功')));
}else{
    print_r(json_encode(array('status'=>-1,'msg'=>'失败')));
}

 