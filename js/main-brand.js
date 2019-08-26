require(["config"],function () {
    //优先调用bootstrap,防止bootstrap的css文件后加载覆盖自己定义的css文件
    require(["bootstrap-require"],function () {
        require(["brand"],function () {
        });
    });

});