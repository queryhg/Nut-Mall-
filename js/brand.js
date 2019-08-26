define("brand",["loginCheck","jquery","headAndFoot","order"],function (loginCheck,$,headAndFoot,order) {

    $(function(){
                    var str="";
            for(var i=1 ; i<57; i++){
                str+='<tr><td><img style="height: auto; margin: 0 auto" src="./img/brand/images_r'+i+'_c1.jpg"></tr></td>'
            }
            console.log(str)
            console.log(document.getElementById("brand"))
            $("#brand").append(str);
    })
    
})
