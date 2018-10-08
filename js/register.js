/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/23 15:41
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/23 15:41
 **/
define("register",["jquery"],function ($) {
    $("header").load("head.html");
    $("footer").load("foot.html");
    var emailNoRepeat = false;
    var passWord;
    $("#inputUserName").on("input", function () {
        var regUserName = /^\S{3,12}$/i;
        var strUserName = this.value.trim();
        var $icon = $(this).next();
        $icon.appendTo($(this).parent());
        if (regUserName.test(strUserName)) {
            $(this).parent().removeClass("has-error  has-feedback");
            $(this).parent().addClass("has-success has-feedback");
            $icon.removeClass("glyphicon-remove");
            $icon.addClass("glyphicon-ok");
            $(this).parent().next().text("");
            return true;
        } else {
            $(this).parent().removeClass("has-success  has-feedback");
            $(this).parent().addClass("has-error  has-feedback");
            $icon.removeClass("glyphicon-ok");
            $icon.addClass("glyphicon-remove");
            $(this).parent().next().text("请输入至少3个字符的昵称！");
            return false;
        }
    });
    $("#inputEmail").on("input", function () {
        var regEmail = /^\w+@(\w+\.)+\w+$/i;
        var strEmail = this.value.trim();
        var $icon = $(this).next();
        $icon.appendTo($(this).parent());
        if (regEmail.test(strEmail)) {
            $.ajax({
                url: "php/register.php",
                data: {
                    type:"emailCheck",
                    email: strEmail,
                },
                type: "POST",
                async: true,
                dataType: "json",
                success: function (res) {
                    var oEmail=$("#inputEmail");
                    if (res["status"]) {
                        oEmail.parent().removeClass("has-error  has-feedback");
                        oEmail.parent().addClass("has-success has-feedback");
                        oEmail.next().removeClass("glyphicon-remove");
                        oEmail.next().addClass("glyphicon-ok");
                        oEmail.parent().next().text("");
                        emailNoRepeat=true;
                    } else {
                        oEmail.parent().removeClass("has-success  has-feedback");
                        oEmail.parent().addClass("has-error  has-feedback");
                        oEmail.next().removeClass("glyphicon-ok");
                        oEmail.next().addClass("glyphicon-remove");
                        oEmail.parent().next().text("该邮箱已被注册！");
                        emailNoRepeat=false;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                    $("#errorRegister").modal()
                }
            });
        } else {
            var oEmail=$("#inputEmail");
            oEmail.parent().removeClass("has-success  has-feedback");
            oEmail.parent().addClass("has-error  has-feedback");
            oEmail.next().removeClass("glyphicon-ok");
            oEmail.next().addClass("glyphicon-remove");
            oEmail.parent().next().text("请输入正确的邮箱！");
            emailNoRepeat=false;
        }
    });

    $("#inputPassword1").on("input", function () {
        var regPassWord = /^\S{6,16}$/i;
        var strPassWord = this.value.trim();
        var $icon = $(this).next();
        $icon.appendTo($(this).parent());
        if (regPassWord.test(strPassWord)) {
            $(this).parent().removeClass("has-error  has-feedback");
            $(this).parent().addClass("has-success has-feedback");
            $icon.removeClass("glyphicon-remove");
            $icon.addClass("glyphicon-ok");
            passWord=strPassWord;
            $(this).parent().next().text("");
            return true;
        } else {
            $(this).parent().removeClass("has-success  has-feedback");
            $(this).parent().addClass("has-error  has-feedback");
            $icon.removeClass("glyphicon-ok");
            $icon.addClass("glyphicon-remove");
            $(this).parent().next().text("请输入6-16个字符的密码！");
            return false;
        }
    });
    $("#inputPassword2").on("input", function () {
        var strPassWord = this.value.trim();
        var $icon = $(this).next();
        $icon.appendTo($(this).parent());
        if (strPassWord==passWord) {
            $(this).parent().removeClass("has-error  has-feedback");
            $(this).parent().addClass("has-success has-feedback");
            $icon.removeClass("glyphicon-remove");
            $icon.addClass("glyphicon-ok");
            $(this).parent().next().text("");
            return true;
        } else {
            $(this).parent().removeClass("has-success  has-feedback");
            $(this).parent().addClass("has-error  has-feedback");
            $icon.removeClass("glyphicon-ok");
            $icon.addClass("glyphicon-remove");
            $(this).parent().next().text("两次密码不一致！");
            return false;
        }
    });
    $("#inputPhone").on("input", function () {
        var regPhone = /^1\d{10}$/i;
        var strPhone = this.value.trim();
        var $icon = $(this).next();
        $icon.appendTo($(this).parent());
        if (regPhone.test(strPhone)) {
            $(this).parent().removeClass("has-error  has-feedback");
            $(this).parent().addClass("has-success has-feedback");
            $icon.removeClass("glyphicon-remove");
            $icon.addClass("glyphicon-ok");
            $(this).parent().next().text("");
            return true;
        } else {
            $(this).parent().removeClass("has-success  has-feedback");
            $(this).parent().addClass("has-error  has-feedback");
            $icon.removeClass("glyphicon-ok");
            $icon.addClass("glyphicon-remove");
            $(this).parent().next().text("请输入正确的手机号码！");
            return false;
        }
    });
    $("#register").on("click", function () {
        if ($("#inputUserName").triggerHandler("input") && $("#inputPassword1").triggerHandler("input") &&$("#inputPassword2").triggerHandler("input") && $("#inputPhone").triggerHandler("input") && emailNoRepeat) {
            var $userName = $("#inputUserName").val();
            var $passWord = $("#inputPassword1").val();

            var $email = $("#inputEmail").val();
            var $phone = $("#inputPhone").val();
            console.log(1);
            $.ajax({
                url: "php/register.php",
                data: {
                    type:"register",
                    userName: $userName,
                    email: $email,
                    passWord: $passWord,
                    phone: $phone
                },
                type: "POST",
                async: true,
                dataType: "json",
                success: function (res) {
                    console.log(2);
                    console.log(res);
                    if (res["status"]) {
                        $("#successRegister").modal();
                        setTimeout(function () {
                            window.location.href = "login.html"
                        }, 5000)

                    } else {
                        $("#failRegister").modal()
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                    $("#errorRegister").modal()
                }
            });
            return false
        } else {
            return false
        }
    })

});
