<?php


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
//准备参数
$O_NUMBER = $_REQUEST['o_Number']; //订单编号，时间戳唯一
$U_ID=$_REQUEST['user_id']; //购买者
$O_TIME=$_REQUEST['o_time']; //生成订单时间
$O_TOTAL=$_REQUEST['o_total']; //订单总价
$O_NAME=$_REQUEST['o_name']; //购买人名字
$O_ADRESS=$_REQUEST['o_address']; //地址
$O_TEL=$_REQUEST['o_tel']; //手机号
$O_POSCODE=$_REQUEST['o_poscode']; //邮政编号

    $sqlInsert = "INSERT INTO orders(`o_number`,`user_id`,`o_address`,`o_poscode`,`o_total`,`o_time`,`o_tel`,`o_name`) VALUES
(?,?,?,?,?,?,?,?)";
    $stmt = $pdo->prepare($sqlInsert);
    $stmt->bindParam(1, $O_NUMBER, PDO::PARAM_STR);
    $stmt->bindParam(2, $U_ID, PDO::PARAM_STR);
    $stmt->bindParam(3, $O_ADRESS, PDO::PARAM_STR);
    $stmt->bindParam(4, $O_POSCODE, PDO::PARAM_STR);
    $stmt->bindParam(5, $O_TOTAL, PDO::PARAM_STR);
    $stmt->bindParam(6, $O_TIME, PDO::PARAM_STR);
    $stmt->bindParam(7, $O_TEL, PDO::PARAM_STR);
    $stmt->bindParam(8, $O_NAME, PDO::PARAM_STR);

    $res = $stmt->execute();


    if ($res) {
        print_r(json_encode(array("msg" => "订单生成ok", "status" => 1)));
    } else {
        print_r(json_encode(array("msg" => "生成订单失败", "status" => -1)));
    }
