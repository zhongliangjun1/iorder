/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-8-30
 * Time: PM2:13
 * To change this template use File | Settings | File Templates.
 */


var util = require('util');

var schemajs = require('schemajs');
var requestSchema = require('./requestSchema');
var onLineService = require('./onLineService');

var mongoose = require('./mongooseClient').mongoose;
var mongooseSchema = require('./mongooseSchema');
var Product = mongoose.model('Product', mongooseSchema.ProductSchema);
var Activity = mongoose.model('Activity', mongooseSchema.ActivitySchema);
var Order = mongoose.model('Order', mongooseSchema.OrderSchema);

var attendActivity = function(req, res){

    var attendActivityModel = requestSchema.attendActivityModel;
    var form = attendActivityModel.validate(req.body);

    if( form.valid ) {
        var data = form.data;

        var shopId = data.shopId;
        var userName = data.userName;
        var activityId = data.activityId;
        var isActivityInit = data.isActivityInit;

        var queryActivity = Activity.findOne()
            .where('activityId').equals(activityId)
            .where('confirmTime').equals(null);
        queryActivity.select('_id creatorName activityId shopId orderList createTime confirmTime');
        queryActivity.exec(function(err, activity){

            if(err){
                res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
                res.end(JSON.stringify({code:500,msg:'服务出问题了'}));
            }else{

                if( !isActivityInit && activity === null){  // 订单已失效

                    res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                    res.end(JSON.stringify({code:201,msg:'订单已失效'}));

                }else if( isActivityInit && activity != null){ // 订单号已被他人占用

                    res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                    res.end(JSON.stringify({code:202,msg:'订单号已被他人占用'}));

                }else{

                    if( isActivityInit ){  // 创建活动

                        var activityContent = {};
                        activityContent.activityId = activityId;
                        activityContent.creatorName = userName;
                        activityContent.shopId = shopId;
                        activityContent.orderList = [];
                        activity = new Activity(activityContent);

                        activity.save(function(err){
                            if(err){
                                res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
                                res.end(JSON.stringify({code:500,msg:'服务出问题了'}));
                            }else{

                                var activityURL = req.headers.host + '/shop/' + shopId + '/activity/' + activity.activityId;

                                var resultData = {};
                                resultData.code = 200;
                                resultData.activity_Id = activity._id;
                                resultData.activityId = activity.activityId;
                                resultData.creatorName = activity.creatorName;
                                resultData.shopId = activity.shopId;
                                resultData.activityURL = activityURL;

                                res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                                res.write(JSON.stringify(resultData));
                                res.end();
                            }
                        });


                    }else{ // 加入活动

                        var activityURL = req.headers.host + '/shop/' + shopId + '/activity-' + activity.activityId;

                        var resultData = {};
                        resultData.code = 200;
                        resultData.activityId = activity.activityId;
                        resultData.activity_Id = activity._id;
                        resultData.creatorName = activity.creatorName;
                        resultData.shopId = activity.shopId;
                        resultData.activityURL = activityURL;

                        res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                        res.write(JSON.stringify(resultData));
                        res.end();

                    }

                }


            }

        });

    }else{
        res.writeHead(400, {'Content-type': 'text/json;charset=utf-8'} );
        res.end(JSON.stringify({code:400, msg:'参数不合法!', errors:form.errors}));
    }

}

var confirmActivity = function(req, res){

    var data = req.body;
    var activityId = data.activityId;
    var userName = data.userName;

    var queryActivity = Activity.findOne()
        .where('activityId').equals(activityId)
        .where('creatorName').equals(userName)
        .where('confirmTime').equals(null);
    queryActivity.select('activityId confirmTime');
    queryActivity.exec(function(err, activity){

        if(err){
            res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
            res.end(JSON.stringify({code:500,msg:'服务出问题了'}));
        }else{
            if(!activity){
                res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                res.end(JSON.stringify({code:201,msg:'订单已失效'}));
            }else{
                activity.confirmTime = Date.now();
                activity.save(function(err){
                    if(err){
                        res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
                        res.end(JSON.stringify({code:500,msg:'服务出问题了'}));
                    }else{
                        var resultData = {};
                        resultData.code = 200;
                        resultData.msg = '订单已存档';
                        resultData.activityId = activity.activityId;
                        resultData.confirmTime = activity.confirmTime;

                        res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                        res.write(JSON.stringify(resultData));
                        res.end();
                        onLineService.confirmActivity(activityId, userName); //通知他人，活动已确认结束
                    }
                });
            }
        }

    });

}


var addOrder = function(req, res){

    var orderModel = requestSchema.orderModel;
    var form = orderModel.validate(req.body);

    if( form.valid ){
        var data = form.data;

        var productId = data.productId;
        var size = data.size;
        var temperature = data.temperature;
        var num = data.num;
        var userName = data.userName;
        var activityId = data.activityId;
        var isActivityInit = data.isActivityInit;
        var isFirstShow = data.isFirstShow;

        var queryActivity = Activity.findOne()
            .where('activityId').equals(activityId)
            .where('confirmTime').equals(null);
        queryActivity.select('_id creatorName activityId shopId orderList createTime confirmTime');
        queryActivity.exec(function(err, activity){

            if(err){
                res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
                res.end(JSON.stringify({code:500,msg:'服务出问题了'}));
            }else{

                if( !isActivityInit && activity === null){  // 订单已失效

                    res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                    res.end(JSON.stringify({code:201,msg:'订单已失效'}));

                }else if( isActivityInit && activity != null){ // 订单号已被他人占用

                    res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                    res.end(JSON.stringify({code:202,msg:'订单号已被他人占用'}));

                }else{

                    var queryProduct = Product.findOne().where('_id').equals(productId);
                    queryProduct.select('_id shopId shopName subjectName categoryName expense temperature introduce productImg');
                    queryProduct.exec(function(err, product){

                        if(err){
                            res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
                            res.end(JSON.stringify({code:500,msg:'服务出问题了'}));
                        }else{
                            if(product != null){

                                // check cookie

                                var orderContent = {};
                                orderContent.shopId = product.shopId;
                                orderContent.productId = productId;
                                orderContent.productName = product.subjectName;
                                orderContent.size = size;
                                orderContent.temperature = temperature;
                                orderContent.num = num;
                                orderContent.userName = userName;
                                orderContent.activityId = activityId;

                                if(size != null && size != '' && size != '未选'){
                                    for(var i=0; i<product.expense.length; i++){
                                        if( size === product.expense[i].size){
                                            // price为单价
                                            orderContent.price = product.expense[i].price;//num*product.expense[i].price;
                                        }
                                    }
                                }else{
                                    orderContent.size = product.expense[0].size; // 未选默认最小 顺序:  默 || 小 中 大
                                    // price为单价
                                    orderContent.price = product.expense[0].price;//num*product.expense[0].price;
                                }

                                var order = new Order(orderContent);


                                if( isActivityInit ){  // 创建订单

                                    var activityContent = {};
                                    activityContent.activityId = activityId;
                                    activityContent.creatorName = userName;
                                    activityContent.shopId = product.shopId;
                                    activityContent.orderList = [order];
                                    activity = new Activity(activityContent);

                                }else{ // 加入订单

                                    activity.orderList.push(order);

                                }

                                activity.save(function(err){
                                    if(err){
                                        res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
                                        res.end(JSON.stringify({code:500,msg:'服务出问题了'}));
                                    }else{

                                        if( !isActivityInit ){
                                            onLineService.addNewOrder(order, isFirstShow);  // 知晓其他活动参与者新增了order
                                        }

                                        var activityURL = req.headers.host + '/shop/' + product.shopId + '/activity-' + activity.activityId;

                                        var resultData = {};
                                        resultData.code = 200;
                                        resultData.activity_Id = activity._id;
                                        resultData.activityId = activity.activityId;
                                        resultData.creatorName = activity.creatorName;
                                        resultData.shopId = activity.shopId;
                                        resultData.activityURL = activityURL;

                                        res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                                        res.write(JSON.stringify(resultData));
                                        res.end();
                                    }
                                });




                            }else{
                                res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                                res.end(JSON.stringify({code:201,msg:'物品不存在'}));
                            }
                        }

                    });

                }

            }

        });





    }else{
        res.writeHead(400, {'Content-type': 'text/json;charset=utf-8'} );
        res.end(JSON.stringify({code:400, msg:'参数不合法!', errors:form.errors}));
    }

}


var removeOrder = function(req, res){
    var data = req.body;
    var userName = data.userName;
    var activityId = data.activityId;
    var order_id = data.order_id;

    var queryActivity = Activity.findOne()
        .where('activityId').equals(activityId)
        .where('confirmTime').equals(null);
    queryActivity.select('creatorName activityId shopId orderList createTime confirmTime');
    queryActivity.exec(function(err, activity){

        if(err){
            res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
            res.end(JSON.stringify({code:500,msg:'服务出问题了'}));
        }else{

            if( activity === null){  // 活动已过期
                res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                res.end(JSON.stringify({code:201,msg:'活动已过期'}));
            }else{
                var order = activity.orderList.id(order_id);
                if(order !== null){
                    if( userName === order.userName ){ // 是自己的订单
                        order.remove();
                        activity.save(function(err){
                            if(err){
                                res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
                                res.end(JSON.stringify({code:500,msg:'服务出问题了'}));
                            }else{
                                var resultData = {};
                                resultData.code = 200;
                                resultData.msg = '您的订单已成功取消';
                                res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                                res.write(JSON.stringify(resultData));
                                res.end();
                                onLineService.removeOrder(order); // 通知其他订单列表也删除此订单
                            }
                        });
                    }else{
                        var resultData = {};
                        resultData.code = 203;
                        resultData.msg = '您无权限取消次订单';
                        res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                        res.write(JSON.stringify(resultData));
                        res.end();
                    }
                }else{
                    var resultData = {};
                    resultData.code = 200;
                    resultData.msg = '您的订单已成功取消';
                    res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                    res.write(JSON.stringify(resultData));
                    res.end();
                }
            }
        }

    });
}


var getActivity = function(req, res){
    var data = req.query;
    //var activityId = data.activityId;
    var activity_Id = data.activity_Id;

//    var queryActivity = Activity.findOne()
//        .where('activityId').equals(activityId)
//        .where('confirmTime').equals(null);
    var queryActivity = Activity.findOne()
        .where('_id').equals(activity_Id);
    queryActivity.select('creatorName activityId shopId orderList createTime confirmTime');
    queryActivity.exec(function(err, activity){

        if(err){
            console.log(err);
            res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
            res.end(JSON.stringify({code:500,msg:'服务出问题了'}));
        }else{

            if( activity === null){  // 活动已过期
                res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                res.end(JSON.stringify({code:201,msg:'活动已过期'}));
            }else{
                var resultData = {};
                resultData.code = 200;
                resultData.msg = '成功获取活动数据';
                resultData.activity = activity;
                res.writeHead(200, {'Content-type': 'text/json;charset=utf-8'} );
                res.write(JSON.stringify(resultData));
                res.end();
            }
        }

    });

}






exports.attendActivity = attendActivity;
exports.confirmActivity = confirmActivity;
exports.addOrder = addOrder;
exports.removeOrder = removeOrder;
exports.getActivity = getActivity;





