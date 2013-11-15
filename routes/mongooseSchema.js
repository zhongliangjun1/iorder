/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-5-23
 * Time: PM9:00
 * To change this template use File | Settings | File Templates.
 */


var mongoose = require('./mongooseClient').mongoose;
var Schema = mongoose.Schema;

var ShopSchema = new Schema({
    shopId : Number,
    shopName : String,
    branchName : String,
    telephone : String,
    introduce : String,
    address : String,
    website : String,
    shopImg : { type: String, default: '/images/source/order.png'}
});

var ProductSchema = new Schema({

    shopId : Number,
    shopName : String,
    subjectName : String,
    categoryName : { type: String, default: '其他'},
    expense : [
        {
            _id : false ,
            size : String, //默 小 中 大 份
            price : Number
        }
    ],
    temperature : [ String ],
    introduce : [ String ],
    productImg : { type: String, default: '/images/source/order.png'}

});

var OrderSchema = new Schema({

    shopId : Number,
    productId : String,
    productName : String,
    size : String,
    temperature : String,
    num : Number,
    price : Number,  // 以防日后产品价格发生变更，影响历史账单记录，以成交时的价格为准【单价】
    userName : String,
    activityId : String

});

var ActivitySchema = new Schema({

    creatorName : String,
    activityId : String,
    shopId : Number,
    orderList : [ OrderSchema ],
    createTime : { type: Date, default: Date.now },
    confirmTime : { type: Date, default: null }

});

var DIYSchema = new Schema({

    itemName : String,
    itemImg : String,
    itemHref : String,
    addTime : { type: Date, default: Date.now }

});



exports.ProductSchema = ProductSchema;
exports.OrderSchema = OrderSchema;
exports.ActivitySchema = ActivitySchema;
exports.ShopSchema = ShopSchema;
exports.DIYSchema = DIYSchema;

