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
if (isset($_GET["type"]) && $_GET["type"] == "commentSend") {
    $comment = isset($_GET["comment"]) ? $_GET["comment"] : "";
    $star = isset($_GET["star"]) ? (int)$_GET["star"] : 0;
    $goodsId = isset($_GET["goodsId"]) ? (int)$_GET["goodsId"] : 0;
    if (mb_strlen($comment, "utf-8") > 0 && $star > 0 && $goodsId > 0) {
        if (array_key_exists("user_id", $_SESSION)) {
            $time = time();
            $sql = "insert into comment(pro_id,user_id,cmt_content,cmt_star,cmt_time,cmt_good,cmt_bad)values (?,?,?,?,?,0,0)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(1, $goodsId, PDO::PARAM_INT);
            $stmt->bindParam(2, $_SESSION["user_id"], PDO::PARAM_INT);
            $stmt->bindParam(3, $comment, PDO::PARAM_STR);
            $stmt->bindParam(4, $star, PDO::PARAM_INT);
            $stmt->bindParam(5, $time, PDO::PARAM_INT);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                selectcmt($pdo, $goodsId);

            } else {
                echo json_encode(array("status" => 0, "msg" => "评论发布失败！"));
            }
        } else {
            echo json_encode(array("status" => -1, "msg" => "未登录！"));
        }
    } else {
        echo json_encode(array("status" => -2, "msg" => "关键信息为空！"));
    }
}
if (isset($_GET["type"]) && $_GET["type"] == "commentList") {
    $goodsId = isset($_GET["goodsId"]) ? (int)$_GET["goodsId"] : 0;
    if ($goodsId > 0) {
        selectcmt($pdo, $goodsId);
    } else {
        echo json_encode(array("status" => -2, "msg" => "关键信息为空！"));
    }

}
if (isset($_GET["type"]) && $_GET["type"] == "commentGoodOrBad") {
    $cmtId = isset($_GET["cmtId"]) ? (int)$_GET["cmtId"] : 0;
    $goodsId = isset($_GET["goodsId"]) ? (int)$_GET["goodsId"] : 0;
    $data = isset($_GET["data"]) ? $_GET["data"] : "";
    if ($cmtId > 0) {
        if ($data=="good"){
            $sql = "update comment set cmt_good=cmt_good+1 where cmt_id={$cmtId}";
        }else{
            $sql = "update comment set cmt_bad=cmt_bad+1 where cmt_id={$cmtId}";
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            selectcmt($pdo, $goodsId);
        } else {
            echo json_encode(array("status" => 0, "msg" => "点赞或踩失败！"));
        }
    } else {
        echo json_encode(array("status" => -2, "msg" => "关键信息为空！"));
    }

}
function selectcmt($pdo, $pro_id)
{
    $sql = "SELECT c.cmt_id,c.cmt_content,c.cmt_star,c.cmt_time,c.cmt_good,c.cmt_bad,u.user_name FROM COMMENT AS c INNER JOIN userinfo AS u ON c.user_id=u.user_id WHERE c.pro_id={$pro_id}";
    $stmt = $pdo->query($sql);
    $res = $stmt->fetchAll();
    echo json_encode(array("status" => 1, "cmtList" => $res));
}