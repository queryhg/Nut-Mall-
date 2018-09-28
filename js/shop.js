/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/26 19:25
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/26 19:25
 **/
define("shop",["loginCheck"],function (loginCheck) {
    $("header").load("head.html");
    $("footer").load("foot.html");
    $.ajax({
        type:"post",
        url:"php/shop.php",
        data:"type:goodList",
        dataType:"json",
        success:function (res) {

        }
    })
});


