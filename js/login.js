/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/23 23:34
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/23 23:34
 **/
define("login",["loginCheck"],function (loginCheck) {
    $("header").load("head.html");
    $("footer").load("foot.html");
    console.log(loginCheck);
    createVeriCode();
    var veriCodecheck=false;
    $("#veriCode").on("input",function () {
        var strVeriCode=$("#veriCodeImg").text();
        var regVeriCode=new RegExp("^"+strVeriCode+"$","gi");
        if ($(this).val().trim().search(regVeriCode)!=-1){
            $(this).parent().removeClass("has-error  has-feedback");
            $(this).parent().addClass("has-success has-feedback");
            $(this).next().removeClass("glyphicon-remove");
            $(this).next().addClass("glyphicon-ok");
            veriCodecheck=true;
        } else {
            $(this).parent().removeClass("has-success  has-feedback");
            $(this).parent().addClass("has-error  has-feedback");
            $(this).next().removeClass("glyphicon-ok");
            $(this).next().addClass("glyphicon-remove");
            veriCodecheck=false;
        }
    });
    $("#resetVeriCode").on("click",function () {
        createVeriCode();
        var oVeriCode=$("#veriCode");
        oVeriCode.parent().removeClass("has-error  has-feedback");
        oVeriCode.next().removeClass("glyphicon-remove");
        oVeriCode.parent().removeClass("has-success  has-feedback");
        oVeriCode.next().removeClass("glyphicon-ok");
        oVeriCode.val("");
    });
    $("#login").on("click", function () {
        var strEmail=$("#inputEmail").val().trim();
        var regEmail = /^\w+@(\w+\.)+\w+$/i;
        var strPassword=$("#inputPassword").val().trim();
        var regPassWord = /^\S{6,16}$/i;
        if (veriCodecheck&&regEmail.test(strEmail)&&regPassWord.test(strPassword)) {
            $.ajax({
                url: "php/login.php",
                data: {
                    type:"login",
                    email: strEmail,
                    passWord:strPassword
                },
                type: "POST",
                async: true,
                dataType: "json",
                success: function (res) {
                    if (res["status"]){
                        console.log(1);
                        loginCheck.loginsuccess(res["user_name"]);
                        var $modal=$("#modal");
                        $modal.find(".modal-body").children().text("登录成功!")
                        $modal.modal();
                    }else {
                        var $modal=$("#modal");
                        console.log(res["msg"]);
                        $modal.find(".modal-body").children().text("登录失败!")
                        $modal.modal();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                    var $modal=$("#modal");
                    $modal.find(".modal-body").children().text("网络故障!")
                    $modal.modal();
                }
            })
        }else {
            var $modal=$("#modal");
            $modal.find(".modal-body").children().text("用户名或密码格式不正确!");
            $modal.modal();
        }
        return false
    });
    function createVeriCode() {
        var strVeriCode="";
        for (let i=0;i<4;i++){
            var randomNUm=parseInt(Math.random()*36);
            if (randomNUm>9){
                strVeriCode+=String.fromCharCode(randomNUm+55)
            }else {
                strVeriCode+=randomNUm;
            }
        }
        console.log(strVeriCode);
        $("#veriCodeImg").text(strVeriCode);
    }
});

