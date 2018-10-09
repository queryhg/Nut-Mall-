/**
 *@Author : fengzhiqing
 *@Date   : 2018/10/8 20:08
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/10/8 20:08
 **/
define(["jquery"], function ($) {
    return {
        headerInit: function () {
            //logo定时闪烁
            setInterval(function () {
                $("header h1 img").animate({
                    opacity: 0
                }, 200, function () {
                    $("header h1 img").animate({
                        opacity: 1
                    }, 200)
                })
            }, 3000);
            //头部导航效果
            let imgCangShu;
            imgCangShu = $("<img src='img/cangshu.png' id='imgCangShu'>");
            $("header .nav").append(imgCangShu);
            $("header .nav div").hover(function (e) {
                $(this).css({
                    background: "#f60",
                    top: "10px",
                    // "border-top":"10px solid rgba(0,0,0,1)",
                })
                $(this).find("a").css({
                    color: "#fff"
                })

                let moveX = $(this).index() * 114 + 130;
                console.log(moveX);
                imgCangShu.stop().animate({
                    left: moveX,
                    opacity: 1
                }, 500)
            }, function () {
                $(this).css({
                    background: "#fff",
                    top: 0,
                    "border-top":0,
                })
                $(this).find("a").css({
                    color: "#333"
                })
                imgCangShu.stop().animate({
                    left: 0,
                    opacity: 0
                }, 500)

            })
        },
        footerInit: function () {
//    回到顶部效果
            $(document).on("scroll", function () {
                if ($("html").scrollTop() > 500) {
                    $(".toTop").css("display", "block")
                } else if ($("html").scrollTop() < 500) {
                    $(".toTop").css("display", "none")
                }

            })
            $(".toTop").on("click", function () {
                let timer = setInterval(function () {
                    window.scrollTo(0, parseInt($("html").scrollTop() * 0.8))
                    if ($("html").scrollTop() == 0) {
                        clearInterval(timer)
                    }
                }, 30)
            })
        }
    }
});