

define("pay",["loginCheck","jquery","headAndFoot","order","xcConfirm"],function (loginCheck,$,headAndFoot,order,xcConfirm) {
    $(function(){
        var orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

        $("#ddbh").html(orderInfo.o_Number);
        $("#jine").html(orderInfo.o_total);

        $("#ljgm").on("click",function(){
            
          
        var txt = "实际付款金额：￥"+orderInfo.o_total ;
        var option = {
            title: "付款成功",
            btn: parseInt("0011", 2),//按钮类型，可以是单个
            success: "success",
            onOk: function () {
        
                    $.ajax({
                        type: "post",
                        url: "php/delGoodsByU_id.php",
                        data: {
                            "user_id": window.localStorage.getItem("user_id"),
                        },
                        dataType: "json",
                        success : function(res) {
                            alert("购买成功");
                            window.location.href="shop.html";
                        }
                    })

                }
            }  
        window.wxc.xcConfirm(txt, "success", option);
        })
    })
})