/**
 *@Author : fengzhiqing
 *@Date   : 2018/9/29 9:09
 *Version : 1.0
 *@Last Modified by :
 *@Last Modified time : 2018/9/29 9:09
 **/
define(["bootstrap"], function () {
    //bootstrap补充模块,针对bootstrap在requirejs异步加载后无法触发window.onload事件来启动bootstrap的js插件的问题,我们使用js重新调用插件
    $('.carousel').carousel();
    $('body').scrollspy({target: '#navbar-example'});
    $('#myAffix').affix({
        offset: {
            top: 100,
            bottom: function () {
                return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    });
//点击页面时产生心形图案
    function Heart(e) {
        this.left = e.clientX;
        this.top = e.clientY;
        this.ele = $(`<img src='img/heart.png' style='width: 30px;position: absolute;left: ${this.left-15}px;top: ${this.top-15}px;z-index: 99'>`);
        this.init = function () {
            $("body").append(this.ele);
            var self = this;
            this.ele.animate({
                top: self.top - 100,
                opacity: 0
            }, function () {
                self.ele.remove();
            })
        }
        this.init();
    }
    $(document).on("click", function (e) {
        new Heart(e)
    })
});