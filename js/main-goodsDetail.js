/**
 *@Author : fengzhiqing
 *@Date   : 2018/10/7 19:10
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/10/7 19:10
 **/
require(["config"],function () {
    //优先调用bootstrap,防止bootstrap的css文件后加载覆盖自己定义的css文件
    require(["bootstrap-require"],function () {
        require(["goodsDetail"],function () {

        });
    });

});