<?php
/**
 * Created by PhpStorm.
 * User: fzq
 * Date: 2018/9/23
 * Time: 17:07
 */
session_start();
$dsn = "mysql:host=47.95.234.105;dbname=baicaowei";
$mysqlaccount = "fzq";
$mysqlPassWord = "1995feng320";
try {
    $pdo = new PDO($dsn, $mysqlaccount, $mysqlPassWord);
} catch (PDOException $exception) {
    echo $exception;
}
if (isset($_POST["type"]) && $_POST["type"] == "emailCheck" && mb_strlen($_POST["email"], "utf-8") > 0) {
    $email = $_POST["email"];
    $sql = "select * from userinfo where email=?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $email, PDO::PARAM_STR);
    $stmt->execute();
    $row = $stmt->fetchAll();
    if (count($row) > 0) {
        echo json_encode(array("status" => 0, "msg" => "邮箱已被占用"));
    } else {
        echo json_encode(array("status" => 1, "msg" => "邮箱可以使用"));
    }

}
if (isset($_POST["type"]) && $_POST["type"] == "register") {
    $userName = $_POST["userName"];
    $userEmail = $_POST["email"];
    $passWord = $_POST["passWord"];
    $userPhone = $_POST["phone"];
    $emailCode=$_POST["emailCode"];
    if (mb_strlen($userEmail, "utf-8") > 0 && mb_strlen($userName, "utf-8") > 0 && mb_strlen($passWord, "utf-8") > 0 && mb_strlen($userPhone, "utf-8") > 0) {
        if ($emailCode==$_SESSION["emailCode"]){
            $salt = base64_encode(getrandstr());
            $userPassWord = sha1($passWord . $salt);
            $sql = "insert into userinfo (user_name,user_pwd,user_salt,user_email,user_tel)values (?,?,?,?,?)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(1, $userName, PDO::PARAM_STR);
            $stmt->bindParam(2, $userPassWord, PDO::PARAM_STR);
            $stmt->bindParam(3, $salt, PDO::PARAM_STR);
            $stmt->bindParam(4, $userEmail, PDO::PARAM_STR);
            $stmt->bindParam(5, $userPhone, PDO::PARAM_STR);
            $res = $stmt->execute();
            if ($res) {
                echo json_encode(array("status" => 1, "msg" => "注册成功"));
            } else {
                echo json_encode(array("status" => 0, "msg" => "注册失败"));
            }

        }else{
            echo json_encode(array("status" => -2, "msg" => "邮箱验证码不正确！"));
        }


    } else {
        echo json_encode(array("status" => -1, "msg" => "关键信息为空"));
    }

}
if (isset($_POST["type"]) && $_POST["type"] == "emailCode") {
    $email = isset($_POST["email"]) ? $_POST["email"] : "";
    $emailCode=getrandstr();
    $_SESSION["emailCode"]=$emailCode;
    require_once("sendEmail.php");
//    $flag = sendMail($email, '百草味邮箱验证', '123');
    $flag = sendMail($email, '百草味邮箱验证', '<div style="width: 600px;height: 400px;margin: 30px auto;border: solid 1px #ccc;"><div style="width: 100%;height: 50px;line-height:50px;border-bottom: solid 1px #ccc;text-indent: 2em;font-size: 22px;color: #fff;font-weight: 700;background: #00aaee">验证您的邮箱！</div><div style="width: 100%;height: 549px;"><p style="margin: 60px 40px 20px;font-size: 18px;color: #666;font-weight: 700;">您的邮箱验证码是：</p><p style="margin: 20px;font-size: 28px;color: #00aaee;text-align: center;font-weight: 700;">'.$emailCode.'</p><p style="margin: 20px 40px 20px;font-size: 18px;color: #666;font-weight: 700;">请勿向任何人泄露您收到的验证码。</p><p style="margin: 20px 40px 20px;font-size: 18px;color: #666;font-weight: 700;">From：<span style="color: #ff5f42">百草味</span></p><p style="margin: 20px 40px 20px;font-size: 18px;color: #666;font-weight: 700;">注：本邮件为系统自动发出，请勿回复。</p></div></div>');

    if ($flag) {
        echo json_encode(array("status" => 1, "msg" => "发送邮件成功"));
    } else {
        echo json_encode(array("status" => 0, "msg" => "发送邮件失败"));
    }

}
function getrandstr()
{

    $str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

    $randStr = str_shuffle($str);//打乱字符串

    $rands = substr($randStr, 0, 6);//substr(string,start,length);返回字符串的一部分

    return $rands;

}