/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-8-31
 * Time: AM10:24
 * To change this template use File | Settings | File Templates.
 */

var schemajs = require('schemajs');

var orderModel = schemajs.create(
    {
        shopId : { type:'int', filters:['trim', 'toInt'], required:true, error:'shopId cannot be null' },
        productId : { type:'string', required:true, error:'productId cannot be null' },
        size : { type:'string', allownull:true, default:null },
        temperature : { type:'string', allownull:true, default:null },
        num : { type:'int', filters:['trim', 'toInt'], required:true, properties:{min:1}, error:'num is not a valid value'},
        userName : { type:'string', allownull:true, default:null }, // 亦可从cookie获取，从而无需传送
        activityId : { type:'string', allownull:true, default:null },
        isActivityInit : { type:'boolean', filters:['trim', 'toBoolean'], required:true, error:'isActivityInit cannot be null' },
        isFirstShow : { type:'boolean', filters:['trim', 'toBoolean'], required:true, error:'isFirstShow cannot be null' }
    }
);

var attendActivityModel = schemajs.create(
    {
        shopId : { type:'int', filters:['trim', 'toInt'], required:true, error:'shopId cannot be null' },
        userName : { type:'string', allownull:true, default:null }, // 亦可从cookie获取，从而无需传送
        activityId : { type:'string', allownull:true, default:null },
        isActivityInit : { type:'boolean', filters:['trim', 'toBoolean'], required:true, error:'isActivityInit cannot be null' }
    }
);

exports.orderModel = orderModel;
exports.attendActivityModel = attendActivityModel;





var reviewModel = schemajs.create(
    {
        reviewId : { type:'int', filters:['trim', 'toInt'], required:true, error:'review must has a reviewId' },
        price : {
            type:'object',
            schema:{
                priceValue : { type:'float', filters:['trim', 'toFloat'], properties:{min:0}, error:'priceValue is not a valid priceValue' }
            }
        }
    }
);