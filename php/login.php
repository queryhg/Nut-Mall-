<?php
/**
 * Created by PhpStorm.
 * User: fzq
 * Date: 2018/9/24
 * Time: 15:40
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

if (isset($_POST["type"]) && $_POST["type"] == "login") {
    $email = $_POST["email"];
    $passWord = $_POST["passWord"];
    if (mb_strlen($email, "utf-8") > 0 && mb_strlen($passWord, "utf-8") > 0) {
        $sql = "select user_id,user_name,user_email,user_pwd,user_salt from userinfo where user_email=?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1, $email, PDO::PARAM_STR);
        $stmt->execute();
        $res = $stmt->fetchAll();
        $userPassWord = sha1($passWord . $res[0]["user_salt"]);
        if ($userPassWord == $res[0]["user_pwd"]) {
            $_SESSION["user_name"] = $res[0]["user_name"];
            $_SESSION["user_pwd"] = $res[0]["user_pwd"];
            $_SESSION["user_email"] = $res[0]["user_email"];
            $_SESSION["user_salt"] = $res[0]["user_salt"];
            $_SESSION["user_id"] = $res[0]["user_id"];

            echo json_encode(array("status" => 1, "msg" => "登录成功","user_name" => $_SESSION["user_name"]));
        } else {
            echo json_encode(array("status" => 0, "msg" => "邮箱或密码错误!"));
        }

    } else {
        echo json_encode(array("status" => 0, "msg" => "邮箱或密码不能为空!"));
    }

}
if (isset($_GET["type"]) && $_GET["type"] == "loginCheck") {
    if (array_key_exists("user_name",$_SESSION)) {
        echo json_encode(array("status" => 1, "msg" => "登录成功", "user_name" => $_SESSION["user_name"]));
    } else {
        echo json_encode(array("status" => 0, "msg" => "用户已注销"));
    }
}
if (isset($_GET["type"]) && $_GET["type"] == "logout") {
    session_destroy();
    echo json_encode(array("status" => 1, "msg" => "注销成功",));
}