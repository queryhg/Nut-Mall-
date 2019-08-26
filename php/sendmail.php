<?php
  header("Content-Type: text/html;charset=utf-8");
   require_once("smtp.class.php");
    //******************** 配置信息 ********************************


    function sendMail($smail,$title,$content){
    $smtpserver = "smtp.163.com";//SMTP服务器
    $smtpserverport =25;//SMTP服务器端口
    $smtpusermail = "queryhg@163.com";//SMTP服务器的用户邮箱
    $smtpemailto =$smail;//发送给谁
    $smtpuser = "queryhg";//SMTP服务器的用户帐号，注：部分邮箱只需@前面的用户名
    $smtppass = "zdy15111537633";//SMTP服务器的授权码
    $mailtitle = $title;//邮件主题
    $mailcontent = $content;//邮件内容
    $mailtype = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件
    //************************ 配置信息 ****************************
    $smtp = new Smtp($smtpserver,$smtpserverport,true,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证.
    $smtp->debug = false;//是否显示发送的调试信息
    $state = $smtp->sendmail($smtpemailto, $smtpusermail, $mailtitle, $mailcontent, $mailtype);
     if($state==""){
       return false;
     }else{
      return true;
     }
   
    }
?>