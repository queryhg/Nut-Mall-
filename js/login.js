/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/23 23:34
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/23 23:34
 **/
define("login", ["jquery", "loginCheck","cookie","headAndFoot","digit"], function ($, loginCheck,cookie,headAndFoot,digit) {
    $("header").load("head.html",function () {
        headAndFoot.headerInit();
    });
    $("footer").load("foot.html",function () {
        headAndFoot.footerInit()
    });
    loginCheck.init();
    createVeriCode();
    let strEmail=$.cookie("saveAccount")||'';
    $("#inputEmail").val(strEmail);
    var veriCodecheck = false;
    $("#veriCode").on("input", function () {
        var strVeriCode = $("#veriCodeImg").text();
        var regVeriCode = new RegExp("^" + strVeriCode + "$", "gi");
        if ($(this).val().trim().search(regVeriCode) != -1) {
            $(this).parent().removeClass("has-error  has-feedback");
            $(this).parent().addClass("has-success has-feedback");
            $(this).next().removeClass("glyphicon-remove");
            $(this).next().addClass("glyphicon-ok");
            veriCodecheck = true;
        } else {
            $(this).parent().removeClass("has-success  has-feedback");
            $(this).parent().addClass("has-error  has-feedback");
            $(this).next().removeClass("glyphicon-ok");
            $(this).next().addClass("glyphicon-remove");
            veriCodecheck = false;
        }
    });
    $("#resetVeriCode").on("click", function () {
        createVeriCode();
        var oVeriCode = $("#veriCode");
        oVeriCode.parent().removeClass("has-error  has-feedback");
        oVeriCode.next().removeClass("glyphicon-remove");
        oVeriCode.parent().removeClass("has-success  has-feedback");
        oVeriCode.next().removeClass("glyphicon-ok");
        oVeriCode.val("");
    });
    $("#login").on("click", function () {
        let strEmail = $("#inputEmail").val().trim();
        var regEmail = /^\w+@(\w+\.)+\w+$/i;
        var strPassword = $("#inputPassword").val().trim();
        var regPassWord = /^\S{6,16}$/i;
        if (veriCodecheck && regEmail.test(strEmail) && regPassWord.test(strPassword)) {
            $.ajax({
                url: "php/login.php",
                data: {
                    type: "login",
                    email: strEmail,
                    passWord: strPassword
                },
                type: "POST",
                async: true,
                dataType: "json",
                success: function (res) {
                    if (res["status"] == 1) {
                        let cartData=JSON.parse($.cookie("cart")||'[]');
                        $.ajax({
                            type: "post",
                            url: "php/shop.php",
                            data: {
                                type:"saveCartList",
                                cartList:JSON.stringify(cartData)
                            },
                            dataType: "json",
                            success: function (res) {
                                if (res["status"] == 1) {
                                    console.log("保存成功");
                                    $.removeCookie("cart",-1)
                                } else {
                                    console.log("保存失败")
                                }

                            }
                        });
                        $.cookie("saveAccount",strEmail)

/*                      原来的登录成功展示
                        var $modal = $("#modal");
                        let time = 4;
                        $modal.find(".modal-body").children().text("登录成功！5秒后跳转至原来页面！");
                        setInterval(function () {
                            $modal.find(".modal-body").children().text("登录成功！" + time + "秒后跳转至原来页面！");
                            time--;
                        }, 1000);
                        $modal.modal();
                        setTimeout(function () {
                            document.referrer === '' ?
                                window.location.href = 'login.html' :
                                window.history.go(-1);
                        }, 5000)
*/
                        welcome(res["user_name"])
                    } else {
                        var $modal = $("#modal");
                        console.log(res["msg"]);
                        $modal.find(".modal-body").children().text("登录失败!邮箱或密码错误!");
                        $modal.modal();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(errorThrown);
                    var $modal = $("#modal");
                    $modal.find(".modal-body").children().text("网络故障!")
                    $modal.modal();
                }
            })
        } else {
            var $modal = $("#modal");
            $modal.find(".modal-body").children().text("用户名、密码或验证码不正确!");
            $modal.modal();
        }
        return false
    });
    function createVeriCode() {
        var strVeriCode = "";
        for (let i = 0; i < 4; i++) {
            var randomNUm = parseInt(Math.random() * 36);
            if (randomNUm > 9) {
                strVeriCode += String.fromCharCode(randomNUm + 55)
            } else {
                strVeriCode += randomNUm;
            }
        }
        $("#veriCodeImg").text(strVeriCode);

    }
    function welcome(name) {
        //canvas欢迎登录动画
        $("#welcome").css({
            display:"block"
        })
        $("#welcome").animate({
            opacity:1
        },500)
        let canvas=$("#welcome").get(0);
        canvas.width=document.documentElement.clientWidth;
        canvas.height=document.documentElement.clientHeight;
        console.log(canvas.width,canvas.height);

        let context=canvas.getContext("2d");
        let welcomeImg=$("<img>");
        welcomeImg.attr("src","img/welcome.png");
        welcomeImg.on("load",function () {
            context.drawImage(welcomeImg.get(0),canvas.width*0.4,canvas.width*0.025,canvas.width*0.2,canvas.width*0.065)
        })
        context.font = 'bold 80px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'bottom';
        context.fillStyle = '#0256c7';
        context.fillText(name+"，欢迎您回来！",canvas.width/2, canvas.width*0.16);
        let num=5;
        let marginTop = canvas.width*0.2;
        let marginLeft = document.documentElement.clientWidth/2-canvas.width*0.05;
        let clientHeight = document.documentElement.clientHeight;
        let clientWidth = document.documentElement.clientWidth;
        let r = 8;
        var balls=[];
        setInterval(function () {
            addBalls(marginLeft,marginTop,num)
            num--;
            if (num<=0){
                document.referrer === '' ?
                    window.location.href = 'login.html' :
                    window.history.go(-1);
            }
        },1000);
        setInterval(function () {
            drawTime(context,num)
        },30)
        function addBalls(x,y,index) {
            for (let i = 0; i < digit[index].length; i++) {
                for (let j = 0; j < digit[index][i].length; j++) {
                    if (digit[index][i][j] == 1) {
                        var ball={
                            color:`rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256})`,
                            x:x + (2 * j + 1) * (r + 1),
                            y:y + (2 * i + 1) * (r + 1),
                            vx:Math.random()*20-10,
                            vy:Math.random()*-3,
                            g:Math.random()*2+1
                        };
                        balls.push(ball);
                    }
                }
            }
        }
        function drawTime(cet,num) {
            cet.clearRect(0, canvas.width*0.19, clientWidth, clientHeight);
            createNum(marginLeft, marginTop, num, cet);
            for (var i=0;i<balls.length;i++){

                balls[i].x+=balls[i].vx;
                balls[i].y+=balls[i].vy;
                balls[i].vy+=balls[i].g;
                if (balls[i].y>=clientHeight-r){
                    balls[i].y=clientHeight-r
                    balls[i].vy*=-0.75
                }
                cet.fillStyle =balls[i].color;
                cet.beginPath();
                cet.arc(balls[i].x, balls[i].y, r, 0, 2 * Math.PI);
                cet.fill();

            }
            console.log(balls.length);
            var saveBalls=[];
            // console.log(balls.length);
            for (let i=0;i<balls.length;i++){
                if ((balls[i].x<(clientWidth+r))&&(balls[i].x>(0-r))){
                    saveBalls.push(balls[i])
                }
            }
            balls=saveBalls;
        }
        function createNum(x, y, index, cet) {

            for (let i = 0; i < digit[index].length; i++) {
                for (let j = 0; j < digit[index][i].length; j++) {
                    if (digit[index][i][j] == 1) {
                        cet.fillStyle = "#ff3d5a";
                        cet.beginPath();
                        cet.arc(x + (2 * j + 1) * (r + 1), y + (2 * i + 1) * (r + 1), r, 0, 2 * Math.PI);
                        cet.fill()
                    }
                }
            }

        }
    }
});

