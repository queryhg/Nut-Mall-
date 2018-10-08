/**
 *@Author : fengzhiqing
 *@Date   : 2018/10/7 8:45
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/10/7 8:45
 **/
define(["jquery", "loginCheck", "cookie"], function ($, loginCheck, $$) {
    function CartObj(goodData, num) {
        this.id = goodData.pro_id;
        this.src = goodData.pro_img;
        this.name = goodData.pro_name;
        this.price = goodData.pro_price;
        this.classify = goodData.pro_classify;
        this.depict = goodData.pro_depict;
        this.stock = goodData.pro_stock;
        this.num = num
    }

    return {
        cartObj: [],
        // cartList: [],
        init: function () {
            let cartData;
            let self = this;
            if (loginCheck.login) {
                $.ajax({
                    type: "post",
                    url: "php/shop.php",
                    data: "type=cartList",
                    dataType: "json",
                    success: function (res) {
                        if (res["status"] == 1) {
                            cartData = res["cartList"]
                            self.createCartObj(JSON.parse(cartData))
                        } else {
                            cartData = $.cookie("cart") || [];
                            cartData = JSON.parse(cartData);
                            self.createCartObj(cartData)
                        }

                    }
                })
                //隐藏购物车的登录提示！
                $(".loginTips").css("display", "none")
            } else {
                cartData = JSON.parse($.cookie("cart") || '[]');
                this.createCartObj(cartData)
            }
            //购物车打开与关闭
            let sliderOpen = false;
            $(".sliderBtn").on("click", function () {
                if (sliderOpen) {
                    $(".cart").animate({
                        right: -750
                    }, 500);
                    if (($("html").width()-960-800)/2>0){
                        $(".main>ul>li").animate({
                            "margin-left": 0
                        }, 500);
                    }
                    sliderOpen = false;
                } else {
                    $(".cart").animate({
                        right: -30
                    }, 500);
                    if (($("html").width()-960-800)/2>0){
                        $(".main>ul>li").animate({
                            "margin-left": -400
                        }, 500);
                    }

                    sliderOpen = true;
                }
            });
            $(".cart").find(".close").on("click", function () {
                $(".cart").animate({
                    right: -750
                }, 500);
                sliderOpen = false;
            })
            //购物车全选
            $(".cart thead").find("input").on("click", function () {
                $(".cart tbody").find("input[type='checkbox']").prop("checked", $(".cart thead").find("input").prop("checked"));
                $(".cart .foot").find("input").prop("checked", $(".cart thead").find("input").prop("checked"))
            })
            $(".cart .foot").find("input").on("click", function () {
                $(".cart tbody").find("input[type='checkbox']").prop("checked", $(".cart .foot").find("input").prop("checked"));
                $(".cart thead").find("input").prop("checked", $(".cart .foot").find("input").prop("checked"))
            })
            //购物车多选删除
            $("#deleteGoods").on("click", function () {
                $(".cart tbody").find("input[type='checkbox']").each(function () {
                    if ($(this).prop("checked")) {
                        let goodId = $(this).parent().parent().attr("data-cart")
                        self.cartObj.forEach((ele, index) => {
                            if (ele.id == goodId) {
                                ele.num = 0;
                            }
                        })
                    }
                })
                self.createCartList();
                self.saveCartList()
            })
        },
        createCartObj: function (data) {
            console.log(data);
            let self=this;
            $.ajax({
                type:"post",
                url:"php/shop.php",
                data:"type=goodList",
                dataType:"json",
                success:function (res) {

                    if (res["status"]==1){
                        let goodList =res["proinfo"]
                        data.forEach((ele, index) => {
                            for (let i of goodList) {
                                if (i.pro_id == ele.goodId) {

                                    self.cartObj.push(new CartObj(i, ele.num))
                                }
                            }

                        });
                        self.createCartList(this.cartObj)
                    }
                }
            })
        },
        createCartList: function () {
            $(".cartList").find("tbody").html("");
            let self = this;
            this.cartObj.forEach((ele, index) => {
                console.log(ele);
                if (ele.num >= 1) {
                    let cartListStr = `<tr data-cart="${ele.id}">
<td><input type="checkbox"></td>
<td><div class="goodImg"><img src="${ele.src}" alt=""></div><div class="content"><h4 class="goodName">${ele.name}</h4><p class="goodDepict">${ele.depict}</p></div></td>
<td>¥<span class="goodPrice">${ele.price}</span></td>
<td><button class="goodCut">-</button><input type="text" class="goodNum"><button class="goodAdd">+</button></td>
<td>¥<span class="Subtotal">${ele.price * ele.num}</span></td>
<td><button class="goodDelete">删除</button></td></tr>`;
                    let cartEle = $(cartListStr);
                    $(".cartList").find("tbody").append(cartEle);
                    cartEle.find(".goodNum").val(ele.num);
                    if (ele.num <= 1) {
                        cartEle.find(".goodCut").prop("disabled", true).css("opacity", 0.4)
                    } else if (ele.num >= 999) {
                        cartEle.find(".goodAdd").prop("disabled", true).css("opacity", 0.4)
                    }
                    cartEle.find(".goodCut").off("click").on("click", function () {
                        self.cartObj.forEach((ele, index) => {
                            if (ele.id == cartEle.attr("data-cart")) {
                                ele.num--;
                            }
                        })
                        self.createCartList();
                        self.saveCartList()
                    });
                    cartEle.find(".goodAdd").off("click").on("click", function () {
                        self.cartObj.forEach((ele, index) => {
                            if (ele.id == cartEle.attr("data-cart")) {
                                ele.num++;
                            }
                        })
                        self.createCartList();
                        self.saveCartList()
                    })
                    cartEle.find(".goodDelete").on("click", function () {
                        self.cartObj.forEach((ele, index) => {
                            if (ele.id == cartEle.attr("data-cart")) {
                                ele.num = 0;
                            }
                        });
                        self.createCartList();
                        self.saveCartList()
                    })
                    cartEle.find(".goodNum").on("change", function () {
                        self.cartObj.forEach((ele, index) => {
                            if (ele.id == cartEle.attr("data-cart")) {
                                if (parseInt(this.value) >= 1 && parseInt(this.value) <= 999) {
                                    ele.num = parseInt(this.value) || 1;
                                } else if (parseInt(this.value) >= 999) {
                                    ele.num = 999;
                                } else {
                                    ele.num = 1;
                                }

                            }
                        });
                        self.createCartList();
                        self.saveCartList()
                    })
                }

            });
            this.Total()
        },
        saveCartList: function () {
            let cartData = [];
            this.cartObj.forEach((ele, index) => {
                let carDataObj = {
                    goodId: ele.id,
                    num: ele.num
                }
                cartData.push(carDataObj)
            });
            if (loginCheck.login) {
                $.ajax({
                    type: "post",
                    url: "php/shop.php",
                    data: {
                        type: "saveCartList",
                        cartList: JSON.stringify(cartData)
                    },
                    dataType: "json",
                    success: function (res) {
                        if (res["status"] == 1) {
                            console.log("保存成功")
                        } else {
                            console.log("保存失败")
                        }

                    }
                })
            } else {
                $.cookie("cart", JSON.stringify(cartData))
            }
        },
        addCart: function (data) {

            let goodExist = false;
            this.cartObj.forEach((ele, index) => {
                if (ele.id == data.pro_id) {
                    ele.num++;
                    goodExist = true;
                }
            })
            if (!goodExist) {
                this.cartObj.push(new CartObj(data, 1))
            }
            this.createCartList();
            this.saveCartList()

        },
        Total: function () {
            let sum = 0;
            let num = 0;
            this.cartObj.forEach((ele, index) => {
                if (ele.num >= 1) {
                    num++;
                    sum += ele.price * ele.num;
                }
            })
            $(".cartNum").text(num);
            $(".Total").text(sum);
        }

    }
});