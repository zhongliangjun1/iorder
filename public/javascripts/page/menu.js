/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-8-28
 * Time: PM6:35
 * To change this template use File | Settings | File Templates.
 */


$(function(){

    var rememberNameGlobal = null;
    var tempActivityIdGlobal = null;
    var tempActivity_IdGlobal = null;
    function init(){

        var rememberName = $.cookie('rememberName');
        var tempActivityId = $.cookie('tempActivityId');
        var tempActivity_Id = $.cookie('tempActivity_Id');

        if(rememberName){
            rememberNameGlobal = rememberName;
        }

        if(tempActivityId){
            tempActivityIdGlobal = tempActivityId;
        }

        if(tempActivity_Id){
            tempActivity_IdGlobal = tempActivity_Id;
        }

    };
    init();

    $('#user a').click(function(){
        var rememberName = $.cookie('rememberName');
        var tempActivityId = $.cookie('tempActivityId');

        if(rememberName){
            $('#name-input').val(rememberName);
        }

        if(tempActivityId){
            $('#activity-input').val(tempActivityId);
        }

        if(!tempActivityId || !rememberName){

            var dialogNode = $('#effeckt-modal-wrap');
            var overlayNode = $('#effeckt-overlay');

            dialogNode.attr('isJustLogIn', 'yes');  // just join activity without adding order now

            dialogNode.addClass('md-effect-16');
            dialogNode.addClass('effeckt-show');
            dialogNode.attr('style', 'display: block;');
            overlayNode.addClass('effeckt-show');
        }else{ // note 最好加个验证，防止用户登出再回来是活动已结束，而cookie还未清
            var msg = rememberName+', 你已成功加入了 '+tempActivityId+' 这单订单';
            $('#head-pop-msg-content').text(msg);
            $('#head-pop-msg').fadeIn('slow');
            setTimeout(function(){
                $('#head-pop-msg').fadeOut('slow');
            }, 2000);
        }
    });

    $('#drawer a').click(function(){
        var lastActivity_Id = $.cookie('lastActivity_Id');
        if(lastActivity_Id){
            $('#effeckt-off-screen-nav').attr('isShowhistory', 'yes');

            var operations = function(){
                setTimeout(function(){
                    $('#order-combine-box').removeClass('disappear');
                    $('#order-split-box').addClass('disappear');

                    var isShowhistory = $('#effeckt-off-screen-nav').attr('isShowhistory');
                    if(isShowhistory && isShowhistory==='yes'){
                        $('#order-confirm-box').addClass('disappear');
                        $('#order-confirmed-box').removeClass('disappear');
                    }else{
                        $('#order-confirm-box').removeClass('disappear');
                        $('#order-confirmed-box').addClass('disappear');
                    }

                    $('#effeckt-off-screen-nav').addClass('effeckt-show');
                }, 1000);

            };
            getSplitDetailOrderList(lastActivity_Id, operations);


        }else{
            var msg = '近两个月在这家店你都木有订单哦';
            $('#head-pop-msg-content').text(msg);
            $('#head-pop-msg').fadeIn('slow');
            setTimeout(function(){
                $('#head-pop-msg').fadeOut('slow');
            }, 2000);
        }


    });

    $('#head-pop-msg-close-wrap').click(function(){
        $('#head-pop-msg').fadeOut('slow');
    });


    $('.product').click(function(e){
        var targetNode = jQuery(e.target);
        var nowNode = $(this);

        if(targetNode.hasClass('minus')){ // 奶茶数目增减
            treatNum(targetNode, nowNode, -1);
        }else if(targetNode.hasClass('plus')){
            treatNum(targetNode, nowNode, 1);
        }

        if(targetNode.hasClass('small') || targetNode.hasClass('middle') || targetNode.hasClass('big')
            || targetNode.hasClass('cold') || targetNode.hasClass('hot')){  // 备注：奶茶尺寸、温度
            treatNote(targetNode, nowNode);
        }

        if(targetNode.hasClass('choice-button-inner') || targetNode.hasClass('choice-button')){ // 选中提交
            treatChoose(targetNode, nowNode);
        }


    });

    // 奶茶数目增减
    var treatNum = function(targetNode, nowNode, num){
        var numNode = nowNode.find('.num');
        var numValue = parseInt(numNode.text()) + num;
        var choiceButtonWrapNode = nowNode.find('.choice-button-wrap');

        if(numValue <= 0){
            numNode.html(0);
            choiceButtonWrapNode.addClass('hidden');
        }else{
            numNode.html(numValue);
            choiceButtonWrapNode.removeClass('hidden');
        }
    }

    // 奶茶尺寸、温度
    var treatNote = function(targetNode, nowNode){
        var smallNode = nowNode.find('.small');
        var middleNode = nowNode.find('.middle');
        var bigNode = nowNode.find('.big');
        var coldNode = nowNode.find('.cold');
        var hotNode = nowNode.find('.hot');

        var onmouseoverImg = targetNode.attr('onmouseoverImg');
        var onmouseoutImg = targetNode.attr('onmouseoutImg');
        var isSelected = targetNode.attr('isSelected');

        if(!isSelected || isSelected==='false'){
            targetNode.attr("src", onmouseoverImg);
            targetNode.attr("isSelected", 'true');

            if(targetNode.hasClass('small')){
                middleNode.attr("src", middleNode.attr('onmouseoutImg'));
                middleNode.attr("isSelected", 'false');
                bigNode.attr("src", bigNode.attr('onmouseoutImg'));
                bigNode.attr("isSelected", 'false');
            }else if (targetNode.hasClass('middle')){
                smallNode.attr("src", smallNode.attr('onmouseoutImg'));
                smallNode.attr("isSelected", 'false');
                bigNode.attr("src", bigNode.attr('onmouseoutImg'));
                bigNode.attr("isSelected", 'false');
            }else if (targetNode.hasClass('big')){
                middleNode.attr("src", middleNode.attr('onmouseoutImg'));
                middleNode.attr("isSelected", 'false');
                smallNode.attr("src", smallNode.attr('onmouseoutImg'));
                smallNode.attr("isSelected", 'false');
            }else if (targetNode.hasClass('cold')){
                hotNode.attr("src", hotNode.attr('onmouseoutImg'));
                hotNode.attr("isSelected", 'false');
            }else if (targetNode.hasClass('hot')){
                coldNode.attr("src", coldNode.attr('onmouseoutImg'));
                coldNode.attr("isSelected", 'false');
            }
        }else{
            targetNode.attr("src", onmouseoutImg);
            targetNode.attr("isSelected", 'false');
        }

    }

    // 备注选择翻转效果
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

    // 选中提交
    var treatChoose = function(targetNode, nowNode){
        var smallNode = nowNode.find('.small');
        var middleNode = nowNode.find('.middle');
        var bigNode = nowNode.find('.big');
        var coldNode = nowNode.find('.cold');
        var hotNode = nowNode.find('.hot');

        var size = '未选';
        if(smallNode.attr('isSelected') && smallNode.attr('isSelected') === 'true'){
            size = '小';
        }else if(middleNode.attr('isSelected') && middleNode.attr('isSelected') === 'true'){
            size = '中';
        }else if(bigNode.attr('isSelected') && bigNode.attr('isSelected') === 'true'){
            size = '大';
        }

        var temperature = '未选';
        if(coldNode.attr('isSelected') && coldNode.attr('isSelected') === 'true'){
            temperature = '冷';
        }else if(hotNode.attr('isSelected') && hotNode.attr('isSelected') === 'true'){
            temperature = '热';
        }

        // 温度: 时令&默认选中
        if(coldNode.length===1 && hotNode.length===1){
            var nowMonth = new Date().getMonth() + 1;
            if(nowMonth>10 || nowMonth<5){
                temperature = '热';
            }else{
                temperature = '冷';
            }
        }else if(coldNode.length===1){
            temperature = '冷';
        }else if(hotNode.length===1){
            temperature = '热';
        }

        var numNode = nowNode.find('.num');
        var num = numNode.text();

        var productId = nowNode.attr('productId');

        var rememberName = $.cookie('rememberName');
        var tempActivityId = $.cookie('tempActivityId');

//        rememberName = 'test'; // ------test------
//        tempActivityId = 'test';

        if(rememberName != null && tempActivityId != null){

            var orderTreatingNode = nowNode.find('.order-treating');
            orderTreatingNode.removeClass('disappear');
            var orderTreatOkNode = nowNode.find('.order-treat-ok');
            var orderTreatNotOkNode = nowNode.find('.order-treat-notok');
            var callback = function(status, returnedData){
                if("success" === status && returnedData.code === 200){
                    orderTreatingNode.addClass('disappear');
                    orderTreatNotOkNode.addClass('disappear');
                    orderTreatOkNode.removeClass('disappear');
                    setTimeout(function(){
                        clearOrder(nowNode);
                        orderTreatOkNode.addClass('disappear');
                    }, 2000);
                    var choiceButtonWrapNode = nowNode.find('.choice-button-wrap');
                    choiceButtonWrapNode.addClass('hidden');
                }else{
                    orderTreatingNode.addClass('disappear');
                    orderTreatNotOkNode.removeClass('disappear');
                }
            }
            addOrder(productId, size, temperature, num, rememberName, tempActivityId, false, false, callback);
        }else{
            var newActivityButtonWrapNode = $('#new-activity-button-wrap');
            var joinActivityButtonWrapNode = $('#join-activity-button-wrap');

            newActivityButtonWrapNode.attr('productId', productId);
            newActivityButtonWrapNode.attr('size', size);
            newActivityButtonWrapNode.attr('temperature', temperature);
            newActivityButtonWrapNode.attr('num', num);
            joinActivityButtonWrapNode.attr('productId', productId);
            joinActivityButtonWrapNode.attr('size', size);
            joinActivityButtonWrapNode.attr('temperature', temperature);
            joinActivityButtonWrapNode.attr('num', num);


            if(rememberName){
                $('#name-input').val(rememberName);
                //var nameInputWrapNode = $('#name-input-wrap');
                //nameInputWrapNode.addClass('disappear');
                //newActivityButtonWrapNode.attr('rememberName', rememberName);
                //joinActivityButtonWrapNode.attr('rememberName', rememberName);
            }

            if(tempActivityId){
                $('#activity-input').val(tempActivityId);
                //var activityInputWrapNode = $('#activity-input-wrap');
                //activityInputWrapNode.addClass('disappear');
                //newActivityButtonWrapNode.attr('tempActivityId', tempActivityId);
                //joinActivityButtonWrapNode.attr('tempActivityId', tempActivityId);
            }


            var dialogNode = $('#effeckt-modal-wrap');
            var overlayNode = $('#effeckt-overlay');
            dialogNode.addClass('md-effect-16');
            dialogNode.addClass('effeckt-show');
            dialogNode.attr('style', 'display: block;');
            overlayNode.addClass('effeckt-show');
        }


    }

    // 弹出框恢复为输入表单项
    var recover2input = function(){
        $('#effecktTitle').text('创建或加入他人的订单');
        //$('#effecktOutput').addClass('disappear');
        $('#effecktOutput').css('display','none');
        //$('#effecktInput').removeClass('disappear');
        $('#effecktInput').css('display','block');
        $('#name-input').val('');
        $('#dialog-without-name-error').addClass('disappear');
        $('#activity-input').val('');
        $('#dialog-without-activityId-error').addClass('disappear');
        $('#dialog-locking-activityId-error').addClass('disappear');
        $('#dialog-without-activityId-error').addClass('disappear');
        $('#new-activity-treat').addClass('hidden');
        $('#join-activity-treat').addClass('hidden');
    }

    var attendActivity = function(shopId, userName, activityId, isActivityInit, callback){
        $.post("/attendactivity",
            {
                shopId:shopId,
                userName:userName,
                activityId:activityId,
                isActivityInit:isActivityInit
            }, function(returnedData, status)
            {
                //console.log(JSON.stringify(returnedData));  // -------- console
                callback(status, returnedData);

            }
        );
    }

    var confirmActivity = function(activityId, userName, callback){
        $.post("/confirmactivity",
            {
                userName:userName,
                activityId:activityId
            }, function(returnedData, status)
            {
                //console.log(JSON.stringify(returnedData));  // -------- console
                callback(status, returnedData);

            }
        );
    }

    var addOrder = function(productId, size, temperature, num, userName, activityId, isActivityInit, isFirstShow, callback){

        $.post("/addorder",
            {
                productId:productId,
                size:size,
                temperature:temperature,
                num:num,
                userName:userName,
                activityId:activityId,
                isActivityInit:isActivityInit,
                isFirstShow:isFirstShow
            }, function(returnedData, status)
            {
                //console.log(JSON.stringify(returnedData));  // -------- console
                callback(status, returnedData);
            }
        );

    }

    var removeOrder = function(order_id, callback){

        $.post("/removeorder",
            {
                userName:rememberNameGlobal,
                activityId:tempActivityIdGlobal,
                order_id:order_id
            }, function(returnedData, status)
            {
                //console.log(JSON.stringify(returnedData));  // -------- console
                callback(status, returnedData);
            }
        );

    }

    // clear完成的order选项
    var clearOrder = function(nowNode){
        var smallNode = nowNode.find('.small');
        var middleNode = nowNode.find('.middle');
        var bigNode = nowNode.find('.big');
        var coldNode = nowNode.find('.cold');
        var hotNode = nowNode.find('.hot');
        var numNode = nowNode.find('.num');

        smallNode.attr("src", smallNode.attr('onmouseoutImg'));
        smallNode.attr("isSelected", 'false');
        middleNode.attr("src", middleNode.attr('onmouseoutImg'));
        middleNode.attr("isSelected", 'false');
        bigNode.attr("src", bigNode.attr('onmouseoutImg'));
        bigNode.attr("isSelected", 'false');
        hotNode.attr("src", hotNode.attr('onmouseoutImg'));
        hotNode.attr("isSelected", 'false');
        coldNode.attr("src", coldNode.attr('onmouseoutImg'));
        coldNode.attr("isSelected", 'false');
        numNode.html(0);
    }




    // 关闭弹出框
    $('#dialog-close').click(function(){
        closeDialog();
    });

    var closeDialog = function(){

        var dialogNode = $('#effeckt-modal-wrap');
        var overlayNode = $('#effeckt-overlay');

        dialogNode.removeAttr('isJustLogIn');

        dialogNode.removeClass('md-effect-16');
        dialogNode.removeClass('effeckt-show');
        dialogNode.attr('style', 'display: none;');
        overlayNode.removeClass('effeckt-show');
    }


    $('#effeckt-modal-wrap').click(function(e){

        var targetNode = jQuery(e.target);
        var nowNode = $(this);

        var dialogNode = $('#effeckt-modal-wrap');
        var isJustLogIn = dialogNode.attr('isJustLogIn');

        if(isJustLogIn && isJustLogIn==='yes'){

            // 发起创建
            if(targetNode.attr('id')==='new-activity-button' || targetNode.attr('id')==='new-activity-button-inner' ){
                checkInputThenJoinActivity(true); console.log('isJustLogIn new-activity-button');
            }

            // 加入
            if(targetNode.attr('id')==='join-activity-button' || targetNode.attr('id')==='join-activity-button-inner' ){
                checkInputThenJoinActivity(false); console.log('isJustLogIn join-activity-button');
            }

        }else{

            // 发起创建
            if(targetNode.attr('id')==='new-activity-button' || targetNode.attr('id')==='new-activity-button-inner' ){
                checkInputThenAddOrder(true); console.log('not isJustLogIn new-activity-button');
            }

            // 加入
            if(targetNode.attr('id')==='join-activity-button' || targetNode.attr('id')==='join-activity-button-inner' ){
                checkInputThenAddOrder(false); console.log('not isJustLogIn join-activity-button');
            }
        }

    });

    // 创建或发起活动 同时加入选中的产品
    var checkInputThenAddOrder = function(isActivityInit){

        var rememberName = $.cookie('rememberName');
        var tempActivityId = $.cookie('tempActivityId');

        // check
        if(rememberName === null || rememberName === ''){
            rememberName = $('#name-input').val();
        }
        if(rememberName === null || rememberName === ''){
            $('#dialog-without-name-error').removeClass('disappear');
            //return;
        }
        if(tempActivityId === null || tempActivityId === ''){
            tempActivityId = $('#activity-input').val();
        }
        if(tempActivityId === null || tempActivityId === ''){
            $('#dialog-without-activityId-error').removeClass('disappear');
            return;
        }

        // add
        if(rememberName != null && rememberName != '' && tempActivityId != null && tempActivityId != ''){

            rememberNameGlobal = rememberName; // setting global params
            tempActivityIdGlobal = tempActivityId;

            var newActivityButtonWrapNode = $('#new-activity-button-wrap');
            var productId = newActivityButtonWrapNode.attr('productId');
            var size = newActivityButtonWrapNode.attr('size');
            var temperature = newActivityButtonWrapNode.attr('temperature');
            var num = newActivityButtonWrapNode.attr('num');

            var newActivityTreatNode = $('#new-activity-treat');
            var newActivityTreatImgNode = $('#new-activity-treat-img');

            var joinActivityTreatNode = $('#join-activity-treat');
            var joinActivityTreatImgNode = $('#join-activity-treat-img');

            var dialogLockingActivityIdErrorNode = $('#dialog-locking-activityId-error');
            var effecktTitleNode = $('#effecktTitle');
            var effecktInputNode = $('#effecktInput');
            var effecktOutputNode = $('#effecktOutput');

            var callback = null;

            if(isActivityInit){
                newActivityTreatImgNode.attr('src', '/images/source/loading.ico');
                newActivityTreatNode.removeClass('hidden');

                callback = function(status, returnedData){
                    if("success" === status && returnedData.code === 200){
                        effecktTitleNode.html('成功啦');
                        dialogLockingActivityIdErrorNode.addClass('disappear');
                        newActivityTreatImgNode.attr('src', '/images/source/ok.png');


                        setTimeout(function(){
                            $('#new-activity-success-msg-content-orderId').html(returnedData.activityId);
                            var newActivitySuccessMsgContentHrefNode = $('#new-activity-success-msg-content-href');
                            //newActivitySuccessMsgContentHrefNode.attr('href', returnedData.activityURL);
                            newActivitySuccessMsgContentHrefNode.html(returnedData.activityURL);

                            $('#new-activity-success').removeClass('disappear');
                            effecktInputNode.slideUp('fast');
                            effecktOutputNode.slideDown('fast');

                            registCopy(); // 需放置在页面已render之后

                            $('#order-button-wrap').removeClass('disappear');
                            regist2activity(tempActivityId, rememberName, returnedData.creatorName);
                        }, 1000);

                        var shopId = parseInt($('#logo').attr('shopId'));
                        $.cookie('rememberName', rememberName, { path: '/' } );
                        $.cookie('tempActivityId', tempActivityId, { expires: 1, path: '/shop/'+shopId  });
                        tempActivity_IdGlobal = returnedData.activity_Id;
                        $.cookie('tempActivity_Id', returnedData.activity_Id, { expires: 1, path: '/shop/'+shopId  });
                        $.cookie('tempCreatorName', returnedData.creatorName, { expires: 1, path: '/shop/'+shopId  });

                    }else{
                        dialogLockingActivityIdErrorNode.removeClass('disappear');
                        newActivityTreatImgNode.attr('src', '/images/source/not-ok.png');
                    }
                }

            }else{
                joinActivityTreatImgNode.attr('src', '/images/source/loading.ico');
                joinActivityTreatNode.removeClass('hidden');

                callback = function(status, returnedData){
                    if("success" === status && returnedData.code === 200){
                        effecktTitleNode.html('成功啦');
                        dialogLockingActivityIdErrorNode.addClass('disappear');
                        joinActivityTreatImgNode.attr('src', '/images/source/ok.png');
                        setTimeout(function(){
                            $('#join-activity-success-msg-title').html('您点的东西已成功加入订单');
                            $('#join-activity-success').removeClass('disappear');
                            effecktInputNode.slideUp('fast');
                            effecktOutputNode.slideDown('fast');

                            setTimeout(function(){
                                $('#order-button-wrap').addClass('disappear');
                                closeDialog();
                                regist2activity(tempActivityId, rememberName, returnedData.creatorName);
                            }, 1000);

                        }, 1000);

                        var shopId = parseInt($('#logo').attr('shopId'));
                        $.cookie('rememberName', rememberName, { path: '/' } );
                        $.cookie('tempActivityId', tempActivityId, { expires: 1, path: '/shop/'+shopId  });
                        tempActivity_IdGlobal = returnedData.activity_Id;
                        $.cookie('tempActivity_Id', returnedData.activity_Id, { expires: 1, path: '/shop/'+shopId  });
                        $.cookie('tempCreatorName', returnedData.creatorName, { expires: 1, path: '/shop/'+shopId  });

                    }else{
                        joinActivityTreatImgNode.attr('src', '/images/source/not-ok.png');
                    }
                }
            }
            addOrder(productId, size, temperature, num, rememberName, tempActivityId, isActivityInit, true, callback);

        }
    }

    // just创建或发起活动
    var checkInputThenJoinActivity = function(isActivityInit){
        var rememberName = $('#name-input').val();
        var tempActivityId = $('#activity-input').val();

        if(rememberName === null || rememberName === ''){
            $('#dialog-without-name-error').removeClass('disappear');
            //return;
        }

        if(tempActivityId === null || tempActivityId === ''){
            $('#dialog-without-activityId-error').removeClass('disappear');
            return;
        }

        rememberNameGlobal = rememberName; // setting global params
        tempActivityIdGlobal = tempActivityId;


        var newActivityTreatNode = $('#new-activity-treat');
        var newActivityTreatImgNode = $('#new-activity-treat-img');

        var joinActivityTreatNode = $('#join-activity-treat');
        var joinActivityTreatImgNode = $('#join-activity-treat-img');

        var dialogLockingActivityIdErrorNode = $('#dialog-locking-activityId-error');
        var effecktTitleNode = $('#effecktTitle');
        var effecktInputNode = $('#effecktInput');
        var effecktOutputNode = $('#effecktOutput');

        var shopId = parseInt($('#logo').attr('shopId'));

        var callback = null;

        if(isActivityInit){
            newActivityTreatImgNode.attr('src', '/images/source/loading.ico');
            newActivityTreatNode.removeClass('hidden');

            callback = function(status, returnedData){
                if("success" === status && returnedData.code === 200){
                    effecktTitleNode.html('成功啦');
                    dialogLockingActivityIdErrorNode.addClass('disappear');
                    newActivityTreatImgNode.attr('src', '/images/source/ok.png');



                    setTimeout(function(){
                        $('#new-activity-success-msg-content-orderId').html(returnedData.activityId);
                        var newActivitySuccessMsgContentHrefNode = $('#new-activity-success-msg-content-href');
                        //newActivitySuccessMsgContentHrefNode.attr('href', returnedData.activityURL);
                        newActivitySuccessMsgContentHrefNode.html(returnedData.activityURL);

                        $('#new-activity-success').removeClass('disappear');
                        effecktInputNode.slideUp('fast');
                        effecktOutputNode.slideDown('fast');

                        registCopy();

//                        $('#new-activity-success-msg-content-href').zclip({
//                            path: "/javascripts/ZeroClipboard.swf",
//                            copy: function(){console.log('do it');
//                                return $('#new-activity-success-msg-content-href').text();
//                            },
//                            afterCopy: function(){
//                                alert('get it');
//                            }
//                        });

                        $('#order-button-wrap').removeClass('disappear');
                        regist2activity(tempActivityId, rememberName, returnedData.creatorName);
                    }, 1000);

                    $.cookie('rememberName', rememberName, { path: '/' } );
                    $.cookie('tempActivityId', tempActivityId, { expires: 1, path: '/shop/'+shopId  });
                    tempActivity_IdGlobal = returnedData.activity_Id;
                    $.cookie('tempActivity_Id', returnedData.activity_Id, { expires: 1, path: '/shop/'+shopId  });
                    $.cookie('tempCreatorName', returnedData.creatorName, { expires: 1, path: '/shop/'+shopId  });

                }else{
                    dialogLockingActivityIdErrorNode.removeClass('disappear');
                    newActivityTreatImgNode.attr('src', '/images/source/not-ok.png');
                }
            }

        }else{
            joinActivityTreatImgNode.attr('src', '/images/source/loading.ico');
            joinActivityTreatNode.removeClass('hidden');

            callback = function(status, returnedData){
                if("success" === status && returnedData.code === 200){
                    effecktTitleNode.html('成功啦');
                    dialogLockingActivityIdErrorNode.addClass('disappear');
                    joinActivityTreatImgNode.attr('src', '/images/source/ok.png');
                    setTimeout(function(){
                        $('#join-activity-success-msg-title').html('成功加入订单');
                        $('#join-activity-success').removeClass('disappear');
                        effecktInputNode.slideUp('fast');
                        effecktOutputNode.slideDown('fast');

                        setTimeout(function(){
                            closeDialog();
                            $('#order-button-wrap').addClass('disappear');
                            regist2activity(tempActivityId, rememberName, returnedData.creatorName);
                        }, 1000);

                    }, 1000);

                    $.cookie('rememberName', rememberName, { path: '/' } );
                    $.cookie('tempActivityId', tempActivityId, { expires: 1, path: '/shop/'+shopId  });
                    tempActivity_IdGlobal = returnedData.activity_Id;
                    $.cookie('tempActivity_Id', returnedData.activity_Id, { expires: 1, path: '/shop/'+shopId  });
                    $.cookie('tempCreatorName', returnedData.creatorName, { expires: 1, path: '/shop/'+shopId  });

                }else{
                    joinActivityTreatImgNode.attr('src', '/images/source/not-ok.png');
                }
            }
        }
        attendActivity(shopId, rememberName, tempActivityId, isActivityInit, callback);

    };

    $('#effeckt-modal-wrap').keyup(function(e){

        var targetNode = jQuery(e.target);

        // 检测 name-input 输入
        if(targetNode.attr('id')==='name-input'){
            var rememberName = targetNode.val();
            if(rememberName != null && rememberName != ''){
                $('#dialog-without-name-error').addClass('disappear');
                $('#dialog-locking-activityId-error').addClass('disappear');
            }else{
                $('#dialog-without-name-error').removeClass('disappear');
            }
            return;
        }

        // 检测 activity-input 输入
        if(targetNode.attr('id')==='activity-input'){
            var tempActivityId = targetNode.val();
            if(tempActivityId != null && tempActivityId != ''){
                $('#dialog-without-activityId-error').addClass('disappear');
                $('#dialog-locking-activityId-error').addClass('disappear');
            }else{
                $('#dialog-without-activityId-error').removeClass('disappear');
            }
            return;
        }

    });


    var socket ;
    var connectCount = 0;
    var regist2activity = function(activityId, userName, creatorName){
        //var socket = io.connect('http://localhost');
        //socket = io.connect('http://localhost', {'sync disconnect on unload' : true});
        connectCount = connectCount + 1;
        if(connectCount === 1){
            socket = io.connect('http://biandang.la');
        }else{
            socket.socket.connect();
        }
        socket.emit('register', { activityId: activityId, userName: userName, creatorName: creatorName });


        var orderNode = $('#order');

        socket.on('regist-result', function (data) {
            console.log(data);
            if(orderNode.hasClass('hidden')){ // 尚未展示过order list
                orderNode.removeClass('hidden');
                sortAndShowOrderList(JSON.parse(data.activity));
            }

        });

        socket.on('addNewOrder', function (data) {

            var order = JSON.parse(data.order);
            insert2orderList(order);

        });

        socket.on('removeOrder', function (data) {
            var order_id = data.order_id;
            var removeLiNode = $('#order-list .order_id_'+order_id);
            removeLiNode.remove();
        });

        socket.on('confirmActivity', function (data) {
            var msg = data.msg;

            recover2input();

            $('#effeckt-off-screen-nav').attr('isShowhistory', 'yes');

            var orderNode = $('#order');
            orderNode.addClass('hidden');

            $('#effeckt-off-screen-nav').removeClass('effeckt-show');

            var shopId = parseInt($('#logo').attr('shopId'));
            $.cookie('lastActivity_Id', tempActivity_IdGlobal, { expires: 60, path: '/shop/'+shopId  });
            tempActivityIdGlobal = null;
            tempActivity_IdGlobal = null;
            $.cookie('tempActivityId', null, { expires: 1, path: '/shop/'+shopId  });
            $.cookie('tempActivity_Id', null, { expires: 1, path: '/shop/'+shopId  });
            $.cookie('tempCreatorName', null, { expires: 1, path: '/shop/'+shopId  });

            var operations = function(){
                //setTimeout(function(){
                $('#order-combine-box').removeClass('disappear');
                $('#order-split-box').addClass('disappear');

                var isShowhistory = $('#effeckt-off-screen-nav').attr('isShowhistory');
                if(isShowhistory && isShowhistory==='yes'){
                    $('#order-confirm-box').addClass('disappear');
                    $('#order-confirmed-box').removeClass('disappear');
                }else{
                    $('#order-confirm-box').removeClass('disappear');
                    $('#order-confirmed-box').addClass('disappear');
                }

                $('#effeckt-off-screen-nav').addClass('effeckt-show');
                //}, 500);

            };
            setTimeout(function(){
                var isShowhistory = $('#effeckt-off-screen-nav').attr('isShowhistory');
                if(isShowhistory && isShowhistory==='yes'){
                    var lastActivity_Id = $.cookie('lastActivity_Id');
                    getSplitDetailOrderList(lastActivity_Id, operations);
                }else{
                    getSplitDetailOrderList(tempActivity_IdGlobal, operations);
                }
            }, 1000);

            // 通知关闭此活动在服务器端建立的所有socket.io链接
            socket.emit('disconnect', { msg: 'close me' });

        });

    }
    // 令其刷新页面便会regist，只不过是如果成功加入活动会regist失败，因为此时还没有提供活动信息
    // 而且因为刷洗页面会导致socket.io disconnect ，所以刷新后仍需要重新建立连接
    var registOnLoad = function(){

        var rememberName = $.cookie('rememberName');
        var tempActivityId = $.cookie('tempActivityId');
        var tempCreatorName = $.cookie('tempCreatorName');

        if(rememberName != null && rememberName != '' && tempActivityId != null && tempActivityId != ''
            && tempCreatorName !=null && tempCreatorName != ''){
            regist2activity(tempActivityId, rememberName, tempCreatorName);
        }

    }
    registOnLoad();

    var registCopy = function(){

        $('#new-activity-success-msg-content-href').zclip({
            path: "/javascripts/ZeroClipboard.swf",
            copy: function(){
                return 'http://'+$('#new-activity-success-msg-content-href').text();
            },
            afterCopy: function(){
                var msg = '链接已复制到剪贴板';
                $('#head-pop-msg-content').text(msg);
                $('#head-pop-msg').fadeIn('slow');
                setTimeout(function(){
                    $('#head-pop-msg').fadeOut('slow');
                }, 2000);
            }
        });

    }


    var sortAndShowOrderList = function(activity){
        var ulNode = $('#order-list');
        ulNode.html('');
        var orderList = activity.orderList;
        var length = orderList.length;
        for(var i=0;i<length;i++){
            var order = orderList[i];
            insert2orderList(order);
        }
    }

    var insert2orderList = function(order){
        var order_id = order._id;
        var productId = order.productId;
        var productName = order.productName;
        var size = order.size;
        var temperature = order.temperature;
        var num = order.num;
        var price = order.price;
        var userName = order.userName;
        var isMine = false;
        if(rememberNameGlobal === userName){
            isMine = true;
        }

        var ulNode = $('#order .effeckt-list');
        var check = ulNode.find('.'+productId);

        var tempStr = '<li id="${productId}-${orderth}" order_id="${order_id}" class="new-item ${productId} order_id_${order_id}">${productName}<span>&nbsp;</span>\
                <span class="ex-size">{{if size }}${size}{{/if}}{{if temperature && temperature!="未选" }}/${temperature}{{/if}}</span>\
                <span class="isMine ex-right {{if !isMine }}hidden{{/if}}">\
                <img class="isMine-img" order_id="${order_id}" src="/images/source/checkmark-circle.png" /></span>\
                <span class="ex-num ex-right">${num}</span>\
                <span class="ex-right">X</span>\
                <span class="ex-price ex-right">${price}</span>\
                {{if !isMine }}<span class="who"><img src="/images/source/tag-white.png" /><span class="who-name">${userName}&nbsp;点的</span></span>{{/if}}\
                {{if isMine }}<span class="order-remove-result order_id_${order_id}_remove_result"><img src="/images/source/cancel-circle.png" /><span class="order-remove-msg"></span></span>{{/if}}\
                </li>';
        $.template( "orderTemplate", tempStr );

        if(check.length === 0){
            //ulNode.append('<li id="'+productId+'-'+1+'" class="new-item '+productId+'">'+productName+'<span></span></li>');

            var tempObject = {
                'order_id' : order_id,
                'productId' : productId,
                'productName' : productName,
                'size' : size,
                'temperature' : temperature,
                'num' : num,
                'price' : price,
                'userName' : userName,
                'orderth' : 1,
                'isMine' : isMine
            };
            $.tmpl( "orderTemplate", tempObject ).appendTo( "#order .effeckt-list" );

        }else{
            var i = 2;
            while(ulNode.find('#'+productId+'-'+i).length != 0){
                i = i + 1;
            }
            var tempObject = {
                'order_id' : order_id,
                'productId' : productId,
                'productName' : productName,
                'size' : size,
                'temperature' : temperature,
                'num' : num,
                'price' : price,
                'userName' : userName,
                'orderth' : i,
                'isMine' : isMine
            };

            var priorNode = ulNode.find('#'+productId+'-'+(i-1));
            //priorNode.after('<li id="'+productId+'-'+i+'" class="new-item '+productId+'">'+productName+'<span></span></li>');
            $.tmpl( "orderTemplate", tempObject).insertAfter(priorNode);
        }
    }




    $(document.body).on('mouseover', '#order .isMine-img' , function(){
        $(this).attr("src", "/images/source/cancel-circle.png");
    });
    $(document.body).on('mouseout', '#order .isMine-img', function(){
        $(this).attr("src", "/images/source/checkmark-circle.png");
    });

    $(document.body).on('mouseover', '#order .new-item' , function(){
        var whoNode = $(this).find('.who');
        if(whoNode.length !== 0){
            whoNode.css('width', '100%');
        }
    });
    $(document.body).on('mouseout', '#order .new-item', function(){
        var whoNode = $(this).find('.who');
        if(whoNode.length !== 0){
            whoNode.css('width', '0');
        }
    });


    $('#order-list').click(function(e){
        var targetNode = jQuery(e.target);

        if(targetNode.hasClass('isMine-img')){
            //console.log('get it');
            var order_id = targetNode.attr('order_id');
            var callback = function(status, returnedData){
                if("success" === status && returnedData.code === 200){
                    var removeLiNode = $('#order-list .order_id_'+order_id);
                    removeLiNode.remove();
                }else{
                    var orderRemoveResultNode = $('#order-list .order_id_'+order_id+'_remove_result');
                    var orderRemoveMsgNode = orderRemoveResultNode.find('.order-remove-msg');
                    orderRemoveMsgNode.html(returnedData.msg);
                    orderRemoveResultNode.css('width', '100%');
                    setTimeout(function(){
                        orderRemoveResultNode.css('width', '0');
                    }, 2000);
                }
            };
            removeOrder(order_id, callback);
        }
    });


    var getSplitDetailOrderList = function(activity_Id, operations){
        $.get('/getactivity?activity_Id='+activity_Id, function(returnedData, status){
            $('#effeckt-off-screen-nav .details-order').remove(); // clear
            if("success" === status && returnedData.code === 200){
                var activity = returnedData.activity;
                if(activity){
                    var orderList = activity.orderList;
                    if(orderList){
                        var tempStr = '<li class="details-order" style="">\
                                          <a href="#0">\
                                            <span class="details-no">${details_no}</span>\
                                            <span class="details-name">${details_name}</span>\
                                            <span class="details-size">${details_size}</span>\
                                            <span class="details-price">${details_price}</span>\
                                            <span class="details-num">${details_num}</span>\
                                            <span class="details-subtotal">${details_subtotal}</span>\
                                            <span class="details-who">${details_who}</span>\
                                          </a>\
                                       </li>';
                        $.template( "detailsOrderTemplate", tempStr );

                        var orderMap = {};
                        for(var i=0; i<orderList.length; i++){
                            var order = orderList[i];
                            var productName = order.productName;
                            if(!orderMap[productName]){
                                orderMap[productName] = [order];
                            }else{
                                orderMap[productName].push(order);
                            }

                        }

                        var totalNum = 0;  // 总份数
                        var totalPeople = 0; // 总下单人数
                        var totalPrice = 0; // 总价
                        var totalPeopleMap = {};


                        var no = 0;
                        for(var key in orderMap){
                            if(orderMap.hasOwnProperty(key)){
                                var childOrderList = orderMap[key];
                                for(var i=0; i<childOrderList.length; i++){
                                    no = no + 1;
                                    var order = childOrderList[i];
                                    var details_size = order.size;
                                    if(order.temperature !== '未选'){
                                        details_size = details_size+'/'+order.temperature;
                                    }
                                    var tempObject = {
                                        'details_no' : no,
                                        'details_name' : order.productName,
                                        'details_size' : details_size,
                                        'details_price' : order.price,
                                        'details_num' : order.num,
                                        'details_subtotal' : order.price*order.num,
                                        'details_who' : order.userName
                                    };
                                    $.tmpl( "detailsOrderTemplate", tempObject).appendTo($('#details-order-container'));

                                    totalNum = totalNum + order.num;
                                    //totalPeople = totalPeople + 1;
                                    totalPeopleMap[order.userName] = order.userName;
                                    totalPrice = totalPrice + order.price*order.num;
                                }
                            }
                        }

                        for(var key in totalPeopleMap){
                            if(totalPeopleMap.hasOwnProperty(key)){
                                totalPeople = totalPeople + 1;
                            }
                        }

                        $('#total-num').text(totalNum);
                        $('#total-people').text(totalPeople);
                        $('#total-price').text(totalPrice);
                    }
                    var isShowhistory = $('#effeckt-off-screen-nav').attr('isShowhistory');
                    if(isShowhistory && isShowhistory==='yes'){
                        var confirmDate = new Date(activity.confirmTime);
                        var month = confirmDate.getMonth();
                        var date = confirmDate.getDate();
                        //var day = confirmDate.getDay();
                        var hour = confirmDate.getHours();
                        if(hour < 10){
                            hour = '0'+hour;
                        }
                        var minute = confirmDate.getMinutes();
                        if(minute < 10){
                            minute = '0'+minute;
                        }

                        var timeStr = ' '+month+'月'+date+'日 '+hour+':'+minute+' ';

                        $('#order-confirmed-box span').text('订单'+activity.activityId+'已于'+timeStr+'确认下单');
                    }
                    operations();
                }
            }
        });
    };

    var getCombineDetailOrderList = function(activity_Id, operations){
        $.get('/getactivity?activity_Id='+activity_Id, function(returnedData, status){

            $('#effeckt-off-screen-nav .details-order').remove(); // clear

            if("success" === status && returnedData.code === 200){
                var activity = returnedData.activity;
                if(activity){
                    var orderList = activity.orderList;
                    if(orderList){
                        var tempStr = '<li class="details-order" style="">\
                                          <a href="#0">\
                                            <span class="details-no">${details_no}</span>\
                                            <span class="details-name">${details_name}</span>\
                                            <span class="details-size">${details_size}</span>\
                                            <span class="details-price">${details_price}</span>\
                                            <span class="details-num">${details_num}</span>\
                                            <span class="details-subtotal">${details_subtotal}</span>\
                                            <span class="details-who">${details_who}</span>\
                                          </a>\
                                       </li>';
                        $.template( "detailsOrderTemplate", tempStr );

                        var orderMap = {};
                        for(var i=0; i<orderList.length; i++){
                            var order = orderList[i];
                            var productName = order.productName;
                            var size = order.size;

                            var key = productName+'_'+size;

                            var size_temp = size;
                            if(order.temperature !== '未选'){
                                size_temp = size_temp+'/'+order.temperature;
                                key = key+'_'+order.temperature;
                            }

                            if(!orderMap[productName]){
                                var orderCombineMap = {};
                                var orderCombine = {
                                    'productName' : productName,
                                    'size_temp' : size_temp,
                                    'price' : order.price,
                                    'num' : order.num,
                                    'subtotal_price' : order.price*order.num,
                                    'who' : [order.userName]
                                };
                                orderCombineMap[key] =orderCombine;
                                orderMap[productName] = orderCombineMap;
                            }else{
                                var orderCombineMap = orderMap[productName];
                                var orderCombine = orderCombineMap[key];
                                if(orderCombine){
                                    orderCombine.num = orderCombine.num + order.num;
                                    orderCombine.subtotal_price = orderCombine.subtotal_price + order.price*order.num;
                                    var contains = false;
                                    for(var w in orderCombine.who){
                                        if(orderCombine.who.hasOwnProperty(w)){
                                            if(orderCombine.who[w] === order.userName){
                                                contains = true;
                                            }
                                        }
                                    }
                                    if(!contains){  // 不重复插入 下单人名
                                        orderCombine.who.push(order.userName);
                                    }
                                }else{
                                    var orderCombine = {
                                        'productName' : productName,
                                        'size_temp' : size_temp,
                                        'price' : order.price,
                                        'num' : order.num,
                                        'subtotal_price' : order.price*order.num,
                                        'who' : [order.userName]
                                    };
                                    orderCombineMap[key] =orderCombine;
                                }
                            }

                        }

                        var totalNum = 0;  // 总份数
                        var totalPrice = 0; // 总价
                        var totalPeople = 0; // 总下单人数
                        var totalPeopleMap = {};


                        var no = 0;
                        for(var key in orderMap){
                            if(orderMap.hasOwnProperty(key)){

                                var orderCombineMap = orderMap[key];

                                for(var innerKey in orderCombineMap){
                                    if(orderCombineMap.hasOwnProperty(innerKey)){
                                        no = no + 1;
                                        var orderCombine = orderCombineMap[innerKey];
                                        var userNames = '';
                                        for(var i=0; i<orderCombine.who.length; i++){
                                            if(i === 0){
                                                userNames = userNames + orderCombine.who[i];
                                            }else{
                                                userNames = userNames + ', ' + orderCombine.who[i];
                                            }
                                            totalPeopleMap[orderCombine.who[i]] = orderCombine.who[i];
                                        }
                                        var tempObject = {
                                            'details_no' : no,
                                            'details_name' : orderCombine.productName,
                                            'details_size' : orderCombine.size_temp,
                                            'details_price' : orderCombine.price,
                                            'details_num' : orderCombine.num,
                                            'details_subtotal' : orderCombine.subtotal_price,
                                            'details_who' : userNames
                                        };
                                        $.tmpl( "detailsOrderTemplate", tempObject).appendTo($('#details-order-container'));

                                        totalNum = totalNum + orderCombine.num;
                                        //totalPeople = totalPeople + orderCombine.who.length;
                                        totalPrice = totalPrice + orderCombine.subtotal_price;
                                    }
                                }

                            }
                        }


                        for(var key in totalPeopleMap){
                            if(totalPeopleMap.hasOwnProperty(key)){
                                totalPeople = totalPeople + 1;
                            }
                        }

                        $('#total-num').text(totalNum);
                        $('#total-people').text(totalPeople);
                        $('#total-price').text(totalPrice);
                    }


                    var isShowhistory = $('#effeckt-off-screen-nav').attr('isShowhistory');
                    if(isShowhistory && isShowhistory==='yes'){
                        var confirmDate = new Date(activity.confirmTime);
                        var month = confirmDate.getMonth();
                        var date = confirmDate.getDate();
                        //var day = confirmDate.getDay();
                        var hour = confirmDate.getHours();
                        if(hour < 10){
                            hour = '0'+hour;
                        }
                        var minute = confirmDate.getMinutes();
                        if(minute < 10){
                            minute = '0'+minute;
                        }

                        var timeStr = ' '+month+'月'+date+'日 '+hour+':'+minute+' ';

                        $('#order-confirmed-box span').text('订单'+activity.activityId+'已于'+timeStr+'确认下单');
                    }
                    operations();

                }
            }
        });
    };

    $('#order-button-wrap').click(function(){
        if(!$('#effeckt-off-screen-nav').hasClass('effeckt-show')){
            var operations = function(){
                $('#order-combine-box').removeClass('disappear');
                $('#order-split-box').addClass('disappear');

                $('#effeckt-off-screen-nav').removeAttr('isShowhistory');
                $('#order-confirm-box').removeClass('disappear');
                $('#order-confirmed-box').addClass('disappear');

//                var isShowhistory = $('#effeckt-off-screen-nav').attr('isShowhistory');
//                if(isShowhistory && isShowhistory==='yes'){
//                    $('#order-confirm-box').addClass('disappear');
//                    $('#order-confirmed-box').removeClass('disappear');
//                }else{
//                    $('#order-confirm-box').removeClass('disappear');
//                    $('#order-confirmed-box').addClass('disappear');
//                }

                $('#effeckt-off-screen-nav').addClass('effeckt-show');
            };
            getSplitDetailOrderList(tempActivity_IdGlobal, operations);
        }
    });

    $('#order-combine-button').click(function(){

        $('#effeckt-off-screen-nav').removeClass('effeckt-show');

        var operations = function(){
            setTimeout(function(){
                $('#order-combine-box').addClass('disappear');
                $('#order-split-box').removeClass('disappear');

                var isShowhistory = $('#effeckt-off-screen-nav').attr('isShowhistory');
                if(isShowhistory && isShowhistory==='yes'){
                    $('#order-confirm-box').addClass('disappear');
                    $('#order-confirmed-box').removeClass('disappear');
                }else{
                    $('#order-confirm-box').removeClass('disappear');
                    $('#order-confirmed-box').addClass('disappear');
                }

                $('#effeckt-off-screen-nav').addClass('effeckt-show');
            }, 1000);

        };
        var isShowhistory = $('#effeckt-off-screen-nav').attr('isShowhistory');
        if(isShowhistory && isShowhistory==='yes'){
            var lastActivity_Id = $.cookie('lastActivity_Id');
            getCombineDetailOrderList(lastActivity_Id, operations);
        }else{
            getCombineDetailOrderList(tempActivity_IdGlobal, operations);
        }

    });

    $('#order-split-box').click(function(){

        $('#effeckt-off-screen-nav').removeClass('effeckt-show');

        var operations = function(){
            //setTimeout(function(){
                $('#order-combine-box').removeClass('disappear');
                $('#order-split-box').addClass('disappear');

                var isShowhistory = $('#effeckt-off-screen-nav').attr('isShowhistory');
                if(isShowhistory && isShowhistory==='yes'){
                    $('#order-confirm-box').addClass('disappear');
                    $('#order-confirmed-box').removeClass('disappear');
                }else{
                    $('#order-confirm-box').removeClass('disappear');
                    $('#order-confirmed-box').addClass('disappear');
                }

                $('#effeckt-off-screen-nav').addClass('effeckt-show');
            //}, 500);

        };
        setTimeout(function(){
            var isShowhistory = $('#effeckt-off-screen-nav').attr('isShowhistory');
            if(isShowhistory && isShowhistory==='yes'){
                var lastActivity_Id = $.cookie('lastActivity_Id');
                getSplitDetailOrderList(lastActivity_Id, operations);
            }else{
                getSplitDetailOrderList(tempActivity_IdGlobal, operations);
            }
            //getSplitDetailOrderList(tempActivity_IdGlobal, operations);
        }, 1000);


    });

    $('#effeckt-off-screen-nav-close').click(function(){
        $('#effeckt-off-screen-nav').removeClass('effeckt-show');
        $('#order-combine-box').removeClass('disappear');
        $('#order-split-box').addClass('disappear');
        $('#effeckt-off-screen-nav').removeAttr('isShowhistory');
        $('#order-confirmed-box').addClass('disappear');
    });



    //  确认下单
    $('#order-confirm-button').click(function(){

        var callback = function(status, returnedData){
            console.log(returnedData);
            if("success" === status && returnedData.code === 200){

                $('#effeckt-off-screen-nav').removeClass('effeckt-show');

                recover2input();

                $('#effeckt-off-screen-nav').attr('isShowhistory', 'yes');

                var orderNode = $('#order');
                orderNode.addClass('hidden');


                setTimeout(function(){
                    var confirmDate = new Date(returnedData.confirmTime);
                    var month = confirmDate.getMonth();
                    var date = confirmDate.getDate();
                    //var day = confirmDate.getDay();
                    var hour = confirmDate.getHours();
                    if(hour < 10){
                        hour = '0'+hour;
                    }
                    var minute = confirmDate.getMinutes();
                    if(minute < 10){
                        minute = '0'+minute;
                    }

                    var timeStr = ' '+month+'月'+date+'日 '+hour+':'+minute+' ';

                    $('#order-confirmed-box span').text('订单'+returnedData.activityId+'已于'+timeStr+'确认下单');
                    $('#order-confirm-box').addClass('disappear');
                    $('#order-confirmed-box').removeClass('disappear');

                    $('#effeckt-off-screen-nav').addClass('effeckt-show');

                }, 1000);

                // 通知关闭此活动在服务器端建立的所有socket.io链接
                socket.emit('closeactivity', { msg: 'close me' });
                //socket.disconnect();

                var shopId = parseInt($('#logo').attr('shopId'));
                $.cookie('lastActivity_Id', tempActivity_IdGlobal, { expires: 60, path: '/shop/'+shopId  });
                tempActivityIdGlobal = null;
                tempActivity_IdGlobal = null;
                $.cookie('tempActivityId', null, { expires: 1, path: '/shop/'+shopId  });
                $.cookie('tempActivity_Id', null, { expires: 1, path: '/shop/'+shopId  });
                $.cookie('tempCreatorName', null, { expires: 1, path: '/shop/'+shopId  });



            }else{
                $('#head-pop-msg-content').text(returnedData.msg);
                $('#head-pop-msg').fadeIn('slow');
                setTimeout(function(){
                    $('#head-pop-msg').fadeOut('slow');
                }, 2000);
            }
        }

        confirmActivity(tempActivityIdGlobal, rememberNameGlobal, callback);
    });






    var testSocketIO = function(){
        //var socket = io.connect('http://localhost');//http://10.128.98.83/
        var socket = io.connect('http://192.168.1.107');
        socket.emit('register', { activityId: '678', userName: 'a', creatorName: 'a' });
        socket.on('regist-result', function (data) {
            console.log(data);
            if(data.type === 'new'){
                socket.emit('register', { activityId: '67878', userName: 'b', creatorName: 'a' });
            }

        });
    }
    //testSocketIO();




});