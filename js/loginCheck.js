/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/26 16:13
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/26 16:13
 **/


define("loginCheck",["jquery","bootstrap"],function ($,bootstrap) {
    var loginCheck={};
        $("header").load("head.html");
        $("footer").load("foot.html")
    loginCheck.login=(function () {
        $.ajax({
            type:"get",
            url:"php/login.php",
            data:"type=loginCheck",
            dataType:"json",
            success:function (res) {
                if (res["status"]){
                    loginCheck.loginsuccess(res["user_name"])
                }

            }
        });
        return false
    })();
    loginCheck.loginsuccess=function(data) {
        let $loginBtn=$("header>.row>div:nth-of-type(3) a");
        $loginBtn.html("<i class='glyphicon glyphicon-user'></i>"+data);
        $loginBtn.removeClass();
        $loginBtn.addClass("userNameIcon");
        $loginBtn.css("href","javascript:void(0);");
        let $registerBtn=$("header>.row>div:nth-of-type(4) a");
        $registerBtn.html("注销");
        $registerBtn.removeClass();
        $registerBtn.addClass("btn btn-danger");
        $registerBtn.on("click",function () {
            $loginBtn.html("登录");
            $loginBtn.removeClass();
            $loginBtn.addClass("btn btn-success");
            $loginBtn.css("href","login.html");
            $registerBtn.html("注册");
            $registerBtn.removeClass();
            $.ajax({
                type:"get",
                url:"php/login.php",
                data:"type=logout",
                dataType:"json",
                success:function (res) {
                    var $modal=$("#modal");
                    if (res["status"]){
                        $modal.find(".modal-body").children().text("注销成功!");
                        $modal.find(".modal-title").children().text("注销!");
                        $modal.modal();
                        loginCheck.login=false;
                    } else {
                        $modal.find(".modal-body").children().text("注销失败!");
                        $modal.find(".modal-title").children().text("注销!");
                        $modal.modal();
                    }

                }
            });
            return false
        });
        loginCheck.login=true;
    };
    return loginCheck
});

