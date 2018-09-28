/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/28 18:50
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/28 18:50
 **/
define("config",function () {
    require.config({
        baseUrl:"./js",
        urlArgs:"bust="+ (new Date()).getTime(),
    map: {
            '*': {
                'css': '../lib/require-css.min' // or whatever the path to require-css is
            }
        },
        paths:{
            jquery:["../lib/jquery/jquery.min"],
            bootstrap:["../lib/bootstrap/js/bootstrap.min"],
            html5:["../lib/html5shiv/html5shiv.min"],
            respond:["../lib/respond/respond.min"],
            index:["index"],
            login:["login"],
            loginCheck:["loginCheck"],
            register:["register"],
            shop:["shop"]
        },
        shim:{
            bootstrap:{
                deps:["jquery","html5","respond","css!../lib/bootstrap/css/bootstrap.min.css"]
            },
            index:{
                deps: ["loginCheck","bootstrap","css!../css/foot.css","css!../css/head.css","css!../css/index.css","css!../css/public.css"]
            },
            login:{
                deps: ["loginCheck","bootstrap","css!../css/foot.css","css!../css/head.css","css!../css/login.css","css!../css/public.css"]
            },
            register:{
                deps: ["bootstrap","css!../css/foot.css","css!../css/head.css","css!../css/register.css","css!../css/public.css"]
            },
            shop:{
                deps: ["loginCheck","bootstrap","css!../css/foot.css","css!../css/head.css","css!../css/shop.css","css!../css/public.css"]
            },
        }

    })
});