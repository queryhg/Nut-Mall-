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
if (isset($_POST["type"]) && $_POST["type"] == "goodList") {
    if (array_key_exists("proinfo", $_SESSION)) {
       echo json_encode(array("status" => 1, "proinfo" => $_SESSION["proinfo"]));
    } else {
        $sql = "select * from proinfo";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $_SESSION["proinfo"] = $res;
        echo json_encode(array("status" => 1, "proinfo" => $_SESSION["proinfo"]));
    }
}
if (isset($_POST["type"]) && $_POST["type"] == "cartList") {
    if (array_key_exists("user_name", $_SESSION)) {
        if (array_key_exists("cartList", $_SESSION)) {
            echo json_encode(array("status" => 1, "cartList" => $_SESSION["cartList"]));
        } else {
            $sql = "select * from carts where user_id='{$_SESSION["user_id"]}'";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $cartList = array();
            foreach ($res as $value) {
                $cart = array("goodId" => $value["pro_id"], "num" => $value["car_num"]);
                array_push($cartList, $cart);
            }
            $_SESSION["cartList"] = json_encode($cartList);
            echo json_encode(array("status" => 1, "cartList" => $_SESSION["cartList"]));
        }
    } else {
        echo json_encode(array("status" => -1, "msg" => "未登录"));
    }

}
if (isset($_POST["type"]) && $_POST["type"] == "saveCartList") {
    if (array_key_exists("user_name", $_SESSION)) {
        $cartList=isset($_POST["cartList"])?$_POST["cartList"]:"";
        $_SESSION["cartList"] = $cartList;
        $cartList=json_decode($cartList);
        foreach ($cartList as $value){

            $num=(int)$value->num;
            $gooid=(int)$value->goodId;
            //查询是否已经存在该条购物信息
            $sql = "select * from carts where user_id='{$_SESSION["user_id"]}'and pro_id=?";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(1, $gooid, PDO::PARAM_INT);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (count($res)>=1){
                //            UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
                $sql = "update carts set car_num=? where user_id='{$_SESSION["user_id"]}' and pro_id=?";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(1, $num, PDO::PARAM_INT);
                $stmt->bindParam(2, $gooid, PDO::PARAM_INT);
                $stmt->execute();
            }else{
                //                INSERT INTO 表名称 VALUES (值1, 值2,....)
                $sql = "insert into carts (pro_id,user_id,car_num)values (?,'{$_SESSION["user_id"]}',?)";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(1, $gooid, PDO::PARAM_INT);
                $stmt->bindParam(2, $num, PDO::PARAM_INT);
                $stmt->execute();
            }
        }
        $sql = "select * from carts where user_id='{$_SESSION["user_id"]}'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $cartList = array();
        foreach ($res as $value) {
            $cart = array("goodId" => $value["pro_id"], "num" => $value["car_num"]);
            array_push($cartList, $cart);
        }
        $_SESSION["cartList"] = json_encode($cartList);
        echo json_encode(array("status" => 1, "msg" => "保存成功"));
    } else {
        echo json_encode(array("status" => -1, "msg" => "未登录"));
    }

}