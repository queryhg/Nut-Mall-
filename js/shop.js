/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/26 19:25
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/26 19:25
 **/
define("shop",["loginCheck","jquery","cart"],function (loginCheck,$,cart) {
    $("header").load("head.html");
    $("footer").load("foot.html");
    $.ajax({
        type:"post",
        url:"php/shop.php",
        data:"type=goodList",
        dataType:"json",
        success:function (res) {

            if (res["status"]==1){
                res["proinfo"].forEach((ele,index)=>{
                   var goodstr=`<li data-good='${JSON.stringify(ele)}'><img src="${ele.pro_img}" alt=""><div class="content"><p>${ele.pro_name}</p><p>¥${ele.pro_price} / 500g</p><button class="goodsDetail">商品详情</button><button class="addCartBtn">加入购物车</button></div></li>`;
                   var $good=$(goodstr);
                    $(`[data-classify='${ele.pro_classify}']`).find(".goodList").append($good)
                    $good.find(".addCartBtn").on("click",function () {
                        addCart($(this).parent().parent());
                    })
                    $good.find(".goodsDetail").on("click",function () {
                        window.location.href="goodsDetail.html?goodsId="+ele.pro_id;
                    })
                });
                carousel();
                cart.init();
            }
        }
    })
    function carousel() {
        $(".goodList").each(function () {
            var moveNum=0;
            let self=this;
            this.timer=setInterval(function () {
                moveNum++;
                var  num=($(self).width()-$(self).parent().width())/170;
                carouselMove(self,moveNum,num)
                if (moveNum>num){
                    moveNum=0;
                }
            },2000);
            $(this).parent().on("mouseenter",function () {
                clearInterval($(this).find(".goodList").get(0).timer)
            })
            $(this).parent().on("mouseleave",function () {
                clearInterval($(this).find(".goodList").get(0).timer);
                $(this).find(".goodList").get(0).timer=setInterval(function () {
                    moveNum++;
                    var  num=($(self).width()-$(self).parent().width())/170;
                    carouselMove(self,moveNum,num)
                    if (moveNum>num){
                        moveNum=0;
                    }
                },2000);
            })
            $(this).next().on("click",function () {
                moveNum++;
                var  num=($(self).width()-$(self).parent().width())/170;
                carouselMove(self,moveNum,num)
                if (moveNum>num){
                    moveNum=0;
                }
            })
            $(this).next().next().on("click",function () {
                moveNum--;
                var  num=($(self).width()-$(self).parent().width())/170;
                carouselMove(self,moveNum,num)
                if (moveNum<0){
                    moveNum=num;
                };
            })
        })
    }
    function carouselMove(ele,index,maxIndex) {
        if (index>maxIndex){
            $(ele).animate({
                opacity:0
            },250,function () {
                $(ele).css("left","0px");
                $(ele).animate({
                    opacity:1
                },250)
            })
        }else if (index<0){
            $(ele).animate({
                opacity:0
            },250,function () {
                $(ele).css("left",-170*maxIndex);
                $(ele).animate({
                    opacity:1
                },250)
            })
        } else {
            var moveLeft=-170*index;
            $(ele).animate({
                left:moveLeft
            },500)
        }

    };
    function addCart(ele) {
            let goodData=JSON.parse(ele.attr("data-good"));
        cart.addCart(goodData)
    }
});


