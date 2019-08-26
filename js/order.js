define("order",["loginCheck","jquery","shop","headAndFoot","cart"],function (loginCheck,$,shop,headAndFoot,cart) {
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

    var cartList = [];
    var cartData = [];
    var cartObj = [];
    


    $("#buyshop").click(function() {
        var input_out = $(".input_style");
        for (var i = 0; i <= input_out.length; i++) {
            if ($(input_out[i]).val() == "") {
                $(input_out[i]).css("border", "1px solid red");
                
                return false;
            } else {
                $(input_out[i]).css("border", "1px solid #cccccc");
            }
        }

    });

    $.ajax({
        type:"post",
        url:"php/shop.php",
        data:"type=cartList",
        dataType:"json",
        success:function(res) {
            console.log(res)
            cartData = JSON.parse(res.cartList) ;
        }

    })
    $.ajax({
        type:"post",
        url:"php/shop.php",
        data:"type=goodList",
        dataType:"json",
        success:function (res) {
            console.log(cartData)
            // var obj = new
            // cartList = JSON.parse(res.cartList)
            // console.log(cartList)
            cartData.forEach((ele, index) => {
                for (let i of res.proinfo) {
                    if (i.pro_id == ele.goodId) {
                        // console.log(new CartObj(i, ele.num))
                        
                        cartObj.push(new CartObj(i, ele.num))
                    }
                }
            });

            cartObj.forEach((ele, index) => {
                console.log(ele)
                if (ele.num >= 1) {
                    let cartListStr = `<tr data-cart="${ele.id}">
        <td></td>
        <td><div class="goodImg"><img src="${ele.src}" alt=""></div><div class="content"><h4 class="goodName">${ele.name}</h4><p class="goodDepict">${ele.depict}</p></div></td>
        <td>¥<span class="goodPrice">${ele.price}</span></td>
        <td><span class="goodNum"><span /></td>
        <td>¥<span class="Subtotal">${ele.price * ele.num}</span></td>`;
                    let cartEle = $(cartListStr);
                    console.log(cartEle)
                    $(".container").find("tbody").append(cartEle);
                    cartEle.find(".goodNum").html(ele.num);

                }
        
            });

        }
    })

    $("#buyshop").on("click",function(){

        if($("#inputAdress").val()&&$("#inputDetailed").val()&&$("#inputPoscode").val()&&$("#inputname").val()&&$("#inputTel").val()){
            var o_Number = (new Date()).getTime();
            var user_id = window.localStorage.getItem("user_id");
            var o_time = (new Date()).toLocaleString( );
            var o_total = $(".Total").text();
            var o_name = $("#inputname").val();
            var o_address = $("#inputAdress").val() +" "+ $("#inputDetailed").val();
            var o_tel = $("#inputTel").val();
            var o_poscode = $("#inputPoscode").val();
            $.ajax({
                type : "post",
                url : "php/addToOrder.php",
                dataType : "json",
                data : {
                    "o_Number" : o_Number,
                    "user_id" : user_id,
                    "o_time" : o_time,
                    "o_total" : o_total,
                    "o_name" : o_name,
                    "o_address" : o_address,
                    "o_tel" : o_tel,
                    "o_poscode" : o_poscode
                },
                success : function(res) {
                    console.log (res);
                    sessionStorage.setItem("orderInfo",JSON.stringify({"o_Number":o_Number,"o_total":o_total}));
                    $("#buyshop").text("提交中...");
                    setTimeout(function(){
                        
                        window.location.href="pay.html"
                        $("#buyshop").html("立即购买");
                    },2000)
                    
                }
            })
        } 
    })
   

})
