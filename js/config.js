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
            index: ["index"],
            login: ["login"],
            loginCheck: ["loginCheck"],
            register: ["register"],
            shop: ["shop"]
        },
        shim: {
            bootstrap: {
                deps: ["jquery", "html5", "respond", "css!../lib/bootstrap/css/bootstrap.min.css"],
            },
            index: {
                deps: ["css!../css/public.css", "css!../css/foot.css", "css!../css/head.css", "css!../css/index.css"]
            },
            login: {
                deps: ["css!../css/public.css", "css!../css/foot.css", "css!../css/head.css", "css!../css/login.css"]
            },
            register: {
                deps: ["css!../css/public.css", "css!../css/foot.css", "css!../css/head.css", "css!../css/register.css"]
            },
            shop: {
                deps: ["css!../css/public.css","css!../css/foot.css", "css!../css/head.css", "css!../css/shop.css"]
            },
        },
        map: {
            '*': {
                'css': '../lib/require-css.min' // or whatever the path to require-css is
            }
        },
    })
});