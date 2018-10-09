/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/26 16:13
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/26 16:13
 **/


define("loginCheck",["jquery","bootstrap"],function () {
    let loginCheck={};
    loginCheck.init=function(successfn,failfn){
        console.log(3);
        $.ajax({
            type:"get",
            url:"php/login.php",
            data:"type=loginCheck",
            dataType:"json",
            success:function (res) {
                if (res["status"]==1){
                    loginCheck.loginsuccess(res["user_name"])
                    if (successfn&&typeof successfn=="function"){
                        successfn()
                    }

                }else if (res["status"]==-1){
                    loginCheck.loginfail()
                    console.log(4)
                    if (failfn&&typeof failfn=="function"){
                        console.log(5)
                        failfn()
                    }
                }

            }
        });
    };

    loginCheck.loginsuccess=function(data) {
        let $loginBtn=$("header>.row>div:nth-of-type(3) a");
        $loginBtn.html("<i class='glyphicon glyphicon-user'></i>"+data);
        $loginBtn.attr("href","javascript:void(0);");
        $loginBtn.removeClass();
        $loginBtn.addClass("userNameIcon");
        $loginBtn.css("href","javascript:void(0);");
        let $registerBtn=$("header>.row>div:nth-of-type(4) a");
        $registerBtn.html("注销");
        $registerBtn.removeClass();
        $registerBtn.addClass("btn btn-danger");
        //隐藏购物车的登录提示
        $(".loginTips").css("display","none")
        $registerBtn.on("click",function () {
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
                        loginCheck.loginfail();
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
    loginCheck.loginfail=function () {
        let $loginBtn=$("header>.row>div:nth-of-type(3) a");
        let $registerBtn=$("header>.row>div:nth-of-type(4) a");
        $loginBtn.html("登录");
        $loginBtn.attr("href","login.html");
        $loginBtn.removeClass();
        $loginBtn.addClass("btn btn-success");
        $loginBtn.css("href","login.html");
        $registerBtn.html("注册");
        $registerBtn.removeClass();
        loginCheck.login=false;
    };
    return loginCheck
});

