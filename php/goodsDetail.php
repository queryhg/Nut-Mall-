<?php
/**
 * Created by PhpStorm.
 * User: fzq
 * Date: 2018/10/7
 * Time: 20:30
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
if (isset($_GET["type"]) && $_GET["type"] == "goodsDetail") {
    $goodsId=isset($_GET["goodsId"])?$_GET["goodsId"]:"";
    $goodsDetail=array();
    if (array_key_exists("proinfo", $_SESSION)) {
        foreach ($_SESSION["proinfo"] as $value){
            if ($value["pro_id"]==$goodsId){
                $goodsDetail=$value;
            }
        }
        echo json_encode(array("status" => 1, "goodsDetail" => $goodsDetail));
    } else {
        $sql = "select * from proinfo";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $_SESSION["proinfo"] = $res;
        foreach ($_SESSION["proinfo"] as $value){
            if ($value["pro_id"]==$goodsId){
                $goodsDetail=$value;
            }
        }
        echo json_encode(array("status" => 1, "goodsDetail" => $goodsDetail));
    }
}