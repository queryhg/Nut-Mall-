/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/22 18:34
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/22 18:34
 **/
define("index", ["jquery", "loginCheck", "headAndFoot"], function ($, loginCheck, headAndFoot) {
    $("header").load("head.html", function () {
        headAndFoot.headerInit();
    });
    $("footer").load("foot.html", function () {
        headAndFoot.footerInit()
    });
    loginCheck.init();
    $(document).on("mousemove", function (e) {
        let X = e.clientX;

        let Y = e.clientY;
        let moveX = parseInt(X * 40 / document.documentElement.clientWidth);
        let moveY = parseInt(Y * 40 / document.documentElement.clientHeight);
        $(".phone").stop().animate({
            "margin-left": moveX - 10,
            "margin-top": moveY - 10,
        }, 10)
        $(".main>ul>li .info").stop().animate({
            "margin-left": moveX - 10,
            "margin-top": moveY - 10,
        }, 10)
    })
    //圆形导航放大效果
    $(".main nav li").hover(function () {
        $(this).find("img").css({
            position: "absolute",
            left: "50%",
            "margin-left": -55,
            top: 0,
        })
        $(this).find("img").stop().animate({
            width: 140,
            "margin-left": -70,
        }, 500)
        $(this).find("p").css({
            "padding-top": 110
        })
    }, function () {
        $(this).find("img").css({
            position: "static",
            "margin-left": 0,
        })
        $(this).find("img").stop().animate({
            width: 110,
            "margin-left": -0,
        }, 500)
        $(this).find("p").css({
            "padding-top": 0
        })
    })

});
