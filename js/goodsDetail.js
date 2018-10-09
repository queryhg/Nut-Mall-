/**
 *@Author : fengzhiqing
 *@Date   : 2018/10/7 19:10
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/10/7 19:10
 **/
define([ "cart","loginCheck", "jquery","headAndFoot"], function (cart,loginCheck,$,headAndFoot) {

    $("header").load("head.html",function () {
        headAndFoot.headerInit();
    });
    $("footer").load("foot.html",function () {
        headAndFoot.footerInit()
    });
    loginCheck.init(function () {
        cart.init()
    },function () {
        cart.init()
    });
    function getStyle(ele, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(ele, null)[attr];
        }
        return ele.currentStyle[attr];
    }

    //页面初始化
    var goodsId = parseInt(window.location.search.substring(9));
    $.ajax({
        type:"get",
        url:"php/goodsDetail.php",
        data:{
            type:"goodsDetail",
            goodsId:goodsId
        },
        dataType:"json",
        success:function (res) {
            if (res["status"]==1){
                let goodsDetail=res["goodsDetail"];
                let goodsNum=1;
                $("#middleImg").find("img").attr("src", "img/goodsDetail/" + goodsDetail.pro_name + ".jpg");
                $("#bigArea").find("img").attr("src", "img/goodsDetail/" + goodsDetail.pro_name + ".jpg");
                $(".main .right h3").text(goodsDetail.pro_name);
                $(".main .right .goodsDepict").text(goodsDetail.pro_depict);
                $(".main .right .goodsPrice span").text(goodsDetail.pro_price);
                updateGoods(goodsDetail,goodsNum)
                $(".main .right .goodsNum button:first-of-type").on("click",function () {
                    if (goodsNum>1){
                        goodsNum--;
                        updateGoods(goodsDetail,goodsNum)
                    }
                })
                $(".main .right .goodsNum button:nth-of-type(2)").on("click",function () {
                    if (goodsNum<999){
                        goodsNum++;
                        updateGoods(goodsDetail,goodsNum)
                    }
                })
                $(".main .right .goodsNum input").on("change",function () {
                    if (parseInt($(this).val())>=1&&parseInt($(this).val())<=999){
                        goodsNum=parseInt($(this).val());
                    }else if (parseInt($(this).val())>999){
                        goodsNum=999;
                    }else {
                        goodsNum=1;
                    }
                    updateGoods(goodsDetail,goodsNum)
                })
                $(".main .right #addCart").on("click",function () {
                    for (let i=0;i<goodsNum;i++){
                        cart.addCart(goodsDetail)
                    }
                })
            }
        }
    });
    function updateGoods(Detail,Num){
        $(".main .right .goodsNum input").val(Num);
        $(".main .right .goodsTotal span").text(Num*Detail.pro_price)
    }


    //放大镜
    let oMiddleImg = document.getElementById('middleImg');
    let oSamllArea = document.getElementById('middleArea');// 小区域
    let oSamllImg = document.querySelector('#middleImg img');//小图
    let oBigArea = document.getElementById('bigArea');//大区域
    let oBigImg = document.getElementById('bigImg');//大图
    //1.解决小区域与其他的不成正比
    // 小图 350,
    // 小区 100,
    //大图 800
    //大区 400
    // 100/400=350/800   175/400=350/800
    // 小区域=(小图/大图)*大区域
    oSamllArea.style.width = (parseInt(getStyle(oSamllImg, "width")) / parseInt(getStyle(oBigImg, "width"))) * parseInt(getStyle(oBigArea, "width")) + "px"
    oSamllArea.style.height = (parseInt(getStyle(oSamllImg, "height")) / parseInt(getStyle(oBigImg, "height"))) * parseInt(getStyle(oBigArea, "height")) + "px"
    //等到移动的比例     大图/小图
    let oScale = parseInt(getStyle(oBigImg, "width")) / parseInt(getStyle(oSamllImg, "width"));

    // 小区域移动的像素, 移动的像素* 比例 赋值给 大图

    //1.鼠标进入 middleImg 盒子,让小区域显示

    let oBox = document.getElementById('box');

    oMiddleImg.onmouseenter = function () {
        oSamllArea.style.display = "block";
        oBigArea.style.display = "block";
        //移动
        document.onmousemove = function (evt) {
            let e = evt || window.event;
            let disX = e.clientX - oBox.offsetLeft - oMiddleImg.offsetLeft - oSamllArea.offsetWidth / 2
            let disY = e.clientY - oBox.offsetTop - oMiddleImg.offsetTop - oSamllArea.offsetHeight / 2

            if (disX <= 0) {
                disX = 0;
            }

            if (disX >= oMiddleImg.offsetWidth - oSamllArea.offsetWidth) {
                disX = oMiddleImg.offsetWidth - oSamllArea.offsetWidth;
            }

            if (disY <= 0) {
                disY = 0;
            }

            if (disY >= oMiddleImg.offsetHeight - oSamllArea.offsetHeight) {
                disY = oMiddleImg.offsetHeight - oSamllArea.offsetHeight;
            }

            oSamllArea.style.left = disX + "px";
            oSamllArea.style.top = disY + "px";

            oBigImg.style.left = -disX * oScale + "px";
            oBigImg.style.top = -disY * oScale + "px";

        }

    };
    oMiddleImg.onmouseleave = function (evt) {
        oSamllArea.style.display = "none";
        oBigArea.style.display = "none";
        document.onmousemove = null;
    };
    cart.init();

});