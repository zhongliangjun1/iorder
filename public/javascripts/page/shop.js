/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-8-27
 * Time: PM5:58
 * To change this template use File | Settings | File Templates.
 */


$(function(){


    // 奶茶数目增减
    $('.plus').click(function(){
        treatNum($(this), 1);
    });
    $('.minus').click(function(){
        treatNum($(this), -1);
    });


    var treatNum = function(clickNode, num){
        var numNode = clickNode.parent().parent().children().eq(0).children().eq(0);
        var numValue = parseInt(numNode.text())+num;
        var choiceButtonWrap = clickNode.parent().parent().parent().parent().next().children('.choice-button-wrap');
        if(numValue <= 0){
            numNode.html(0);
            choiceButtonWrap.addClass('hidden');
        }else{
            numNode.html(numValue);
            choiceButtonWrap.removeClass('hidden');
        }

    }


    // 奶茶大小杯冷热选择
    $('.note').mouseover(function(){
        var onmouseoverImg = $(this).attr('onmouseoverImg');
        var isSelected = $(this).attr('isSelected');
        if(!isSelected || isSelected==='false'){
            $(this).attr("src", onmouseoverImg);
        }
    });
    $('.note').mouseout(function(){
        var onmouseoutImg = $(this).attr('onmouseoutImg');
        var isSelected = $(this).attr('isSelected');
        if(!isSelected || isSelected==='false'){
            $(this).attr("src", onmouseoutImg);
        }
    });
    $('.note').click(function(){
        var onmouseoverImg = $(this).attr('onmouseoverImg');
        var onmouseoutImg = $(this).attr('onmouseoutImg');
        var isSelected = $(this).attr('isSelected'); // note to remove after choose
        if(!isSelected || isSelected==='false'){
            $(this).attr("src", onmouseoverImg);
            $(this).attr("isSelected", 'ture');
            noteOnlyOne($(this));
        }else{
            $(this).attr("src", onmouseoutImg);
            $(this).attr("isSelected", 'false');
        }
    });
    function noteOnlyOne(nowNode){
        var parentNode = nowNode.parent().parent();
        var smallNode = parentNode.children('.small').children('.small');
        var middleNode = parentNode.children('.middle').children('.middle');
        var bigNode = parentNode.children('.big').children('.big');
        var coldNode = parentNode.children('.cold').children('.cold');
        var hotNode = parentNode.children('.hot').children('.hot');
        if(nowNode.hasClass('small')){
            middleNode.attr("src", middleNode.attr('onmouseoutImg'));
            middleNode.attr("isSelected", 'false');
            bigNode.attr("src", bigNode.attr('onmouseoutImg'));
            bigNode.attr("isSelected", 'false');
        }else if (nowNode.hasClass('middle')){
            smallNode.attr("src", smallNode.attr('onmouseoutImg'));
            smallNode.attr("isSelected", 'false');
            bigNode.attr("src", bigNode.attr('onmouseoutImg'));
            bigNode.attr("isSelected", 'false');
        }else if (nowNode.hasClass('big')){
            middleNode.attr("src", middleNode.attr('onmouseoutImg'));
            middleNode.attr("isSelected", 'false');
            smallNode.attr("src", smallNode.attr('onmouseoutImg'));
            smallNode.attr("isSelected", 'false');
        }else if (nowNode.hasClass('cold')){
            hotNode.attr("src", hotNode.attr('onmouseoutImg'));
            hotNode.attr("isSelected", 'false');
        }else if (nowNode.hasClass('hot')){
            coldNode.attr("src", coldNode.attr('onmouseoutImg'));
            coldNode.attr("isSelected", 'false');
        }
    }

    // dialog
    $('.choice-button-wrap').click(function(){
        var productId = $(this).attr('productId');

        var productBoxNode = $(this).parent().parent();
        var selectNode = productBoxNode.children('.introduction').children('.select');
        var seSizeNode = selectNode.children('.se-size');
        var seNumNode = selectNode.children('.se-num');

        var smallNode = seSizeNode.children('.small');
        var middleNode = seSizeNode.children('.middle');
        var bigNode = seSizeNode.children('.big');

        if(smallNode.attr('isSelected') && smallNode.attr('isSelected') === 'true'){

        }else if(middleNode.attr('isSelected') && middleNode.attr('isSelected') === 'true'){

        }



        if(true){
            var dialogNode = $('#effeckt-modal-wrap');
            var overlayNode = $('#effeckt-overlay');
            dialogNode.addClass('md-effect-16');
            dialogNode.addClass('effeckt-show');
            dialogNode.attr('style', 'display: block;');
            overlayNode.addClass('effeckt-show');
        }



//        $.post("addFood",
//            {
//                productId:productId
//            }, function(returnedData, status)
//            {
//                if("success" == status){
//                }
//            }
//        );

    });

    $('#dialog-close').click(function(){
        var dialogNode = $('#effeckt-modal-wrap');
        var overlayNode = $('#effeckt-overlay');
        dialogNode.removeClass('md-effect-16');
        dialogNode.removeClass('effeckt-show');
        dialogNode.attr('style', 'display: none;');
        overlayNode.removeClass('effeckt-show');
    });






});