$(function () {
    $(".left_menu").mCustomScrollbar({
        // theme:"dark",
        // scrollInertia :0,//滚动延迟
        // callbacks:{
        //     onScroll: function(){
        //         alert(1)
        //     }
        // },
        scrollButtons:{
            enable:true,
            scrollType:"continuous",
            scrollSpeed:20,
            scrollAmount:40
        }
    });

    $(".left_menu .list").hide().eq(0).show();

    $(".top_title li").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        $(".left_menu .list").hide().eq($(this).index()).show();
    });

    $.ajax({
        url:'server/leftmenu.json',
        cache:false,
        dataType:'json',
        success:function (msg) {
            var data = msg.jsonObject;
            var DC = data.DC;
            var CH = data.CH;
            var GK = data.GK;
            if(DC.length>0){
                var DCHtml = childrenNode(DC);
                $('#dc_menu').append(DCHtml);
            }
            if(CH.length>0){
                var CHHtml = childrenNode(CH);
                $("#ch_menu").append(CHHtml);
            }
            if(GK.length>0){
                var GKHtml = childrenNode(GK);
                $("#gk_menu").append(GKHtml);
            }

            shiftChildren();
            
            $(".left_menu li a").click(function () {
                $(this).parent("li").toggleClass("on");
                if($(this).parent("li").hasClass("on")){
                    $(this).parent("li").children("ul").stop().slideDown();
                }
                else {
                    $(this).parent("li").find("ul").stop().slideUp().find("li").removeClass("on");
                }
                $(this).parent("li").siblings("li").find("li").removeClass("on");
                $(this).parent("li").siblings("li").removeClass("on").find("ul").stop().slideUp();
            });
        }
    });

});

function childrenNode(data) {
    var htmlstr = '';
    if(data.length>0){
        for(var i in data){
            if(data[i].children){
                htmlstr += '<li><a id="'+data[i].id+'" href="javascript:void(0)"><span>'+ data[i].text +'('+data[i].children.length+')</span><label></label></a>';
                htmlstr += '<ul>';
                htmlstr += childrenNode(data[i].children);
                htmlstr += '</ul></li>'
            }else{
                htmlstr += '<li><a id="'+data[i].id+'" href="javascript:void(0)" onclick=\'getPlaneId("'+data[i].id+'")\'>'+data[i].text+'</a></li>';
            }
        }
        return htmlstr;
    }
}

function shiftChildren() {
    var str = '.left_menu ';
    for (var i=0;i<4;i++){
        str = str + 'ul li ';
        $(str+'a').css('padding-left',(20*(i+1)).toString()+'px');
    }
}

function getPlaneId(id) {
}