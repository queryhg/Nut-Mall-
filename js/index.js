/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/22 18:34
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/22 18:34
 **/
define("index",["jquery","loginCheck",],function ($,loginCheck) {
        $("header").load("head.html");
        $("footer").load("foot.html");
    $("window").trigger("load");
    console.log(loginCheck);
});
