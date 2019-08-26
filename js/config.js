/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/28 18:50
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/28 18:50
 **/
define("config", function () {
    require.config({
        baseUrl: "./js",
        urlArgs: "bust=" + (new Date()).getTime(),
        paths: {
            jquery: ["../lib/jquery/jquery.min"],
            bootstrap: ["../lib/bootstrap/js/bootstrap"],
            html5: ["../lib/html5shiv/html5shiv.min"],
            respond: ["../lib/respond/respond.min"],
            cookie:["../lib/jquery.cookie"],
            "xcConfirm":["../lib/xcConfirm"],
            index: ["index"],
            login: ["login"],
            loginCheck: ["loginCheck"],
            register: ["register"],
            shop: ["shop"],
            "bootstrap-require":["bootstrap-require"],
            cart:["cart"],
            goodsDetail:["goodsDetail"],
            headAndFoot:["headAndFoot"],
            order: ["order"],
            brand: ["brand"],
            pay: ["pay"],
            about: ["about"],
            digit:["digit"]
        },
        shim: {
            bootstrap: {
                deps: ["jquery", "html5", "respond"],
            },
            xcConfirm: {
                deps: ["jquery"]
            }
        },
    })
});