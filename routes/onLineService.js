/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-9-5
 * Time: AM12:46
 * To change this template use File | Settings | File Templates.
 */

var util = require('util');

var mongoose = require('./mongooseClient').mongoose;
var mongooseSchema = require('./mongooseSchema');
var Product = mongoose.model('Product', mongooseSchema.ProductSchema);
var Activity = mongoose.model('Activity', mongooseSchema.ActivitySchema);
var Order = mongoose.model('Order', mongooseSchema.OrderSchema);



var repertory = {};

var registe = function(socket, shopId, channel, hostName, registerName){

    //console.log(util.inspect(repertory));

    var isHost = (registerName === hostName);
    if(isHost && !repertory[channel]){ // 创建活动

        repertory[channel] = {};
        repertory[channel].hostName = hostName;
        repertory[channel].listeners = {};
        repertory[channel].listeners[registerName] = socket;

        var queryActivity = Activity.findOne()
            .where('activityId').equals(channel)
            .where('shopId').equals(shopId)
            .where('confirmTime').equals(null);
        queryActivity.select('creatorName activityId shopId orderList createTime confirmTime');
        queryActivity.exec(function(err, activity){
            if(err){
                // do something future
            }else{
                var response = {code:200, type: 'new' ,activity: JSON.stringify(activity), msg: registerName+' create channel '+channel+' success'};
                socket.emit('regist-result', response);
            }
        });

    }else if (repertory[channel]){ // 活动已存在

        repertory[channel].listeners[registerName] = socket;

        var queryActivity = Activity.findOne()
            .where('activityId').equals(channel)
            .where('confirmTime').equals(null);
        queryActivity.select('creatorName activityId shopId orderList createTime confirmTime');
        queryActivity.exec(function(err, activity){
            if(err){
                // do something future
            }else{
                var response = {code:200, type: 'join' ,activity: JSON.stringify(activity), msg: registerName+'join channel '+channel+' success'};
                socket.emit('regist-result', response);
            }
        });
//        var hostSocket = repertory[channel].listeners[hostName];
//        hostSocket.emit('regist-result', {code:200, msg:registerName+' join your channel '+channel+' success', type: 'join'});

    }else {  // 活动已关闭
        var response = {code:200, type: 'failure' , msg: registerName+' join channel '+channel+' failure'};
        socket.emit('regist-result', response);
    }

//    console.log(util.inspect(repertory));

}


var confirmActivity = function(activityId, userName){

    var channel = activityId;

    if( repertory[channel] ) {
        var listeners = repertory[channel].listeners;

        for (var registerName in listeners) {
            if (listeners.hasOwnProperty(registerName)) {

                if(registerName === userName){
                    continue;
                }

                var socket = listeners[registerName];
                try {
                    var response = {code:200, type: 'confirmActivity', msg: channel+' 这单已确认并存档'};
                    socket.emit('confirmActivity', response);
                }catch(e){
                    // 暂只做打印
                    console.log(e);
                }
            }
        }
    }


}

var closeActivity = function(activityId){

    var channel = activityId;

    if( repertory[channel] ){ // 活动还在

        var listeners = repertory[channel].listeners;

        for (var registerName in listeners) {
            if (listeners.hasOwnProperty(registerName)) {

                var socket = listeners[registerName];
                try {
                    console.log('try disconnect----------');
                    socket.disconnect(true);
                }catch(e){
                    // 暂只做打印
                    console.log(e);
                }
            }
        }

    }


}


var addNewOrder = function(order, isFirstShow){

    var channel = order.activityId;

    if( repertory[channel] ){

        var listeners = repertory[channel].listeners;

        for (var registerName in listeners) {
            if (listeners.hasOwnProperty(registerName)) {

                if(isFirstShow && registerName === order.userName){
                    continue;
                }

                var socket = listeners[registerName];
                try {
                    var response = {code:200, type: 'addNewOrder' , order: JSON.stringify(order), msg: order.userName+' add new order to channel '+channel};
                    socket.emit('addNewOrder', response);
                }catch(e){
                    // 暂只做打印
                    console.log(e);
                }
            }
        }
    }


}

var removeOrder = function(order){
    var channel = order.activityId;

    if( repertory[channel] ) {

        var listeners = repertory[channel].listeners;

        for (var registerName in listeners) {
            if (listeners.hasOwnProperty(registerName)) {

                if(registerName === order.userName){
                    continue;
                }

                var socket = listeners[registerName];
                try {
                    var response = {code:200, type: 'removeOrder' , order_id: order._id, msg:order.userName+'取消了自己的订单' };
                    socket.emit('removeOrder', response);
                }catch(e){
                    // 暂只做打印
                    console.log(e);
                }
            }
        }
    }


}

exports.registe = registe;
exports.addNewOrder = addNewOrder;
exports.removeOrder = removeOrder;
exports.confirmActivity = confirmActivity;
exports.closeActivity = closeActivity;






var testForEach = function(){
    var myObject = {
        a : 1,
        b : 2,
        c : 'c'
    }
    for (var name in myObject) {
        console.log(name);
    }
}
//testForEach();


