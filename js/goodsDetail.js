
define(["cart", "loginCheck", "jquery", "headAndFoot",], function (cart, loginCheck, $, headAndFoot) {

    $("header").load("head.html", function () {
        headAndFoot.headerInit();
    });
    $("footer").load("foot.html", function () {
        headAndFoot.footerInit()
    });
    loginCheck.init(function () {
        cart.init()
    }, function () {
        cart.init()
    });

    function getStyle(ele, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(ele, null)[attr];
        }
        return ele.currentStyle[attr];
    }

    //页面初始化
    let goodsId = parseInt(window.location.search.substring(9));
    $.ajax({
        type: "get",
        url: "php/goodsDetail.php",
        data: {
            type: "goodsDetail",
            goodsId: goodsId
        },
        dataType: "json",
        success: function (res) {
            if (res["status"] == 1) {
                let goodsDetail = res["goodsDetail"];
                let goodsNum = 1;
                $("#middleImg").find("img").attr("src", "img/goodsDetail/" + goodsDetail.pro_name + ".jpg");
                $("#bigArea").find("img").attr("src", "img/goodsDetail/" + goodsDetail.pro_name + ".jpg");
                $(".main .right h3").text(goodsDetail.pro_name);
                $(".main .right .goodsDepict").text(goodsDetail.pro_depict);
                $(".main .right .goodsPrice span").text(goodsDetail.pro_price);
                updateGoods(goodsDetail, goodsNum)
                $(".main .right .goodsNum button:first-of-type").on("click", function () {
                    if (goodsNum > 1) {
                        goodsNum--;
                        updateGoods(goodsDetail, goodsNum)
                    }
                })
                $(".main .right .goodsNum button:nth-of-type(2)").on("click", function () {
                    if (goodsNum < 999) {
                        goodsNum++;
                        updateGoods(goodsDetail, goodsNum)
                    }
                })
                $(".main .right .goodsNum input").on("change", function () {
                    if (parseInt($(this).val()) >= 1 && parseInt($(this).val()) <= 999) {
                        goodsNum = parseInt($(this).val());
                    } else if (parseInt($(this).val()) > 999) {
                        goodsNum = 999;
                    } else {
                        goodsNum = 1;
                    }
                    updateGoods(goodsDetail, goodsNum)
                })
                $(".main .right #addCart").on("click", function () {
                    for (let i = 0; i < goodsNum; i++) {
                        cart.addCart(goodsDetail)
                    }
                });
                goodsDetailFn(goodsDetail.pro_name)
            }
        }
    });

    function updateGoods(Detail, Num) {
        $(".main .right .goodsNum input").val(Num);
        $(".main .right .goodsTotal span").text(Num * Detail.pro_price)
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
            let disX = e.pageX - oBox.offsetLeft - oMiddleImg.offsetLeft - oSamllArea.offsetWidth / 2
            let disY = e.pageY - oBox.offsetTop - oMiddleImg.offsetTop - oSamllArea.offsetHeight / 2

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

    //页面下部详情生成
    function goodsDetailFn(name) {
        //详情页导航切换
        $(".detail .nav li").on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(".detail .navContent li").eq($(this).index()).addClass("active").siblings().removeClass("active")
            return false;
        });
        //商品详情图片加载
        let imgNum;
        if (name == "巴旦木") {
            imgNum = 11;
        } else if (name == "瓜子") {
            imgNum = 6;
        } else if (name == "碧根果") {
            imgNum = 10;
        }
        for (let i = 0; i < imgNum; i++) {
            let goodsDetailImg = $("<img>");
            if (i < 10) {
                goodsDetailImg.attr("src", "img/goodsDetail/" + name + "/" + name + "-0" + i + ".jpg")
            } else {
                goodsDetailImg.attr("src", "img/goodsDetail/" + name + "/" + name + "-" + i + ".jpg")
            }
            goodsDetailImg.appendTo($(".detail .navContent>li:first-of-type"))
        }
        $(".detail .norm p:first-of-type span:last-of-type").text(name);
        //    评论模块
        //请求评论数据
        $.ajax({
            type: "get",
            url: "php/comment.php",
            data: {
                type: "commentList",
                goodsId: goodsId
            },
            dataType: "json",
            success: function (res) {
                console.log(12342)
                if (res["status"] == 1) {
                    createCmtList(res["cmtList"])
                } else {
                    console.log(res)
                }
            }
        })
        let starNum;    //星级
        //评星级
        $(".comment .star i").on("click", function () {
            $(this).removeClass("glyphicon-star-empty").addClass("glyphicon-star").prevAll().removeClass("glyphicon-star-empty").addClass("glyphicon-star");
            $(this).nextAll().removeClass("glyphicon-star").addClass("glyphicon-star-empty")
            starNum = $(this).index();
        })
        //提交评论
        let addComment=true;    //添加评论节流阀
        $(".comment button").on("click", function () {
            if (addComment) {
                let strComment = $(".comment textarea").val().trim();
                if (starNum && strComment.length > 0) {
                    $(".commentTips").text("")
                    $.ajax({
                        type: "get",
                        url: "php/comment.php",
                        data: {
                            type: "commentSend",
                            comment: strComment,
                            star: starNum,
                            goodsId: goodsId
                        },
                        dataType: "json",
                        success: function (res) {
                            if (res["status"] == 1) {
                                addComment=false;
                                createCmtList(res["cmtList"])
                            } else {
                                console.log(res)
                            }
                        }
                    })
                } else {
                    $(".commentTips").text("评论内容为空或未评分！")
                }
            }

        })



    }

    //更新评论列表
    function createCmtList(data) {
        $(".commentList").html("");
        console.log(123)
        data.forEach((ele, index) => {
            let time = new Date(ele.cmt_time * 1000);
            let strCmt = `<li class="clearfix" data-cmtid=${ele.cmt_id}>
                    <div class="left">
                        <h3><i class="glyphicon glyphicon-user"></i> ${ele.user_name}</h3>
                        <p class="star">
                            <i class="glyphicon"></i>
                            <i class="glyphicon"></i>
                            <i class="glyphicon"></i>
                            <i class="glyphicon"></i>
                            <i class="glyphicon"></i>
                        </p>
                    </div>
                    <div class="right">
                        <p class="cmtContent"></p>
                        <p><span class="commentTime">${time.toLocaleString()}</span><span class="goodOrBad"><button class="good"><span class="goodNum">${ele.cmt_good ? ele.cmt_good : 0}</span> <i class="glyphicon glyphicon-thumbs-up"></i>赞</button><button class="bad"><span class="badNum">${ele.cmt_bad ? ele.cmt_bad : 0}</span> <i class="glyphicon glyphicon-thumbs-down"></i>踩</button></span></p>
                    </div>
                </li>`;
            let cmt = $(strCmt);
            for (let i = 0; i < 5; i++) {
                if (i <= ele.cmt_star) {
                    cmt.find(".star i").eq(i).addClass("glyphicon-star")
                } else {
                    cmt.find(".star i").eq(i).addClass("glyphicon-star-empty")
                }
            }
            console.log(cmt);
            cmt.find(".cmtContent").text(ele.cmt_content);
            cmt.appendTo($(".commentList"))
        });
        addEvent()
    }
    let addGood=true;   //点赞节流阀
    let addBad=true;    //点踩节流阀
    function addEvent() {
        //    点赞
        $(".commentList .good").on("click", function () {
            if (addGood) {
                let cmtId = $(this).parent().parent().parent().parent().attr("data-cmtid")
                console.log(cmtId);
                $.ajax({
                    type: "get",
                    url: "php/comment.php",
                    data: {
                        type: "commentGoodOrBad",
                        data: "good",
                        cmtId: cmtId,
                        goodsId:goodsId
                    },
                    dataType: "json",
                    success: function (res) {
                        if (res["status"] == 1) {
                            addGood=false;
                            createCmtList(res["cmtList"])
                        } else {
                            console.log(res)
                        }
                    }
                })
            }

        })
        //    踩
        $(".commentList .bad").on("click", function () {
            if (addBad){
                let cmtId = $(this).parent().parent().parent().parent().attr("data-cmtid");
                console.log(cmtId);
                $.ajax({
                    type: "get",
                    url: "php/comment.php",
                    data: {
                        type: "commentGoodOrBad",
                        data: "bad",
                        cmtId: cmtId,
                        goodsId:goodsId
                    },
                    dataType: "json",
                    success: function (res) {
                        if (res["status"] == 1) {
                            addBad=false;
                            createCmtList(res["cmtList"])

                        } else {
                            console.log(res)
                        }
                    }
                })
            }

        })
    }
});