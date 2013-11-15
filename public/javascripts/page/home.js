/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-10-7
 * Time: PM3:40
 * To change this template use File | Settings | File Templates.
 */

$(function(){

    var page = 1;
    var i = 6; //每版放4个图片

    $('.pre').click(function(){
        var $v_show = $('#suggest-diy .v_content_list');
        var $v_content = $('#suggest-diy .v_content');
        var v_width = $v_content.width() ;
        var len = $v_show.find("li").length;
        var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数

        if( !$v_show.is(":animated") ){
            if( page == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
//                $v_show.animate({ left : '-='+v_width*(page_count-1) }, "slow");
//                page = page_count;
            }else{
                $v_show.animate({ left : '+='+v_width }, "slow");
                page--;
            }
        }
    });

    $('.next').click(function(){
        var $v_show = $('#suggest-diy .v_content_list');
        var $v_content = $('#suggest-diy .v_content');
        var v_width = $v_content.width() ;
        var len = $v_show.find("li").length;
        var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数

        if( !$v_show.is(":animated") ){
            if( page == page_count ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
//                $v_show.animate({ left : '0px'}, "slow"); //通过改变left值，跳转到第一个版面
//                page = 1;
            }else{
                $v_show.animate({ left : '-='+v_width }, "slow");  //通过改变left值，达到每次换一个版面
                page++;
            }
        }
    });


});


