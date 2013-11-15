/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-8-26
 * Time: PM5:41
 * To change this template use File | Settings | File Templates.
 */

var util = require('util');

var mongoose = require('./mongooseClient').mongoose;
var mongooseSchema = require('./mongooseSchema');

var Product = mongoose.model('Product', mongooseSchema.ProductSchema);
var Shop = mongoose.model('Shop', mongooseSchema.ShopSchema);
var Activity = mongoose.model('Activity', mongooseSchema.ActivitySchema);


var enterShopById = function(req, res){
    var shopId = req.params.shopId;
    var tempActivityId = req.params.tempActivityId;

    var shopQuery = Shop.findOne().where('shopId').equals(shopId);
    shopQuery.select('_id shopId shopName branchName telephone introduce address website shopImg');
    shopQuery.exec(function(err, shop){
        if(err){
            handleError(req, res);
        }else{

            var query = Product.find().where('shopId').equals(shopId);
            query.select('_id shopId shopName subjectName categoryName expense temperature introduce productImg');
            query.exec(function(err, products){
                if(err){
                    handleError(req, res);
                }else{
                    //console.log(util.inspect(products));
                    if(products !== null){
                        var productsNum = products.length;
                        var categorys = [];
                        var cate2productsMap = {};
                        for(var i=0; i<productsNum; i++){
                            var product = products[i];
                            var categoryName = product.categoryName;
                            if(cate2productsMap[categoryName] !== undefined){
                                cate2productsMap[categoryName].push(product);
                            }else{
                                categorys.push(categoryName);
                                cate2productsMap[categoryName] = [product];
                            }
                        }

                        if(tempActivityId){

                            var queryActivity = Activity.findOne()
                                .where('activityId').equals(tempActivityId)
                                .where('confirmTime').equals(null);
                            queryActivity.select('_id creatorName activityId shopId orderList createTime confirmTime');
                            queryActivity.exec(function(err, activity){
                                if(err){
                                    handleError(req, res);
                                }else{
                                    if(activity){
                                        res.cookie('tempActivityId', tempActivityId, { maxAge: 60000*60*12, path: '/shop/'+shopId });
                                        res.cookie('tempActivity_Id', activity._id, { maxAge: 60000*60*12, path: '/shop/'+shopId });
                                        res.cookie('tempCreatorName', activity.creatorName, { maxAge: 60000*60*12, path: '/shop/'+shopId });
                                    }
                                    res.render('menu', {'shopId':shopId, 'shop':shop, 'productsNum':productsNum, 'categorys':categorys, 'cate2productsMap':cate2productsMap});
                                }
                            });


                        }else{
                            res.render('menu', {'shopId':shopId, 'shop':shop, 'productsNum':productsNum, 'categorys':categorys, 'cate2productsMap':cate2productsMap});
                        }

                    }else{
                        handleError(req, res);
                    }

                }
            });

        }
    });


}

exports.enterShopById = enterShopById;

var handleError = function(req, res){
    res.writeHead(500, {'Content-type': 'text/json;charset=utf-8'} );
    res.end({code:500,msg:'商戶不存在!'});
}







//var productDemo = {
//    "shopId" : "5890888",
//    "shopName" : "鲜芋仙",
//    "subjectName" : "仙草系列",
//    "categoryName" : "仙草1號",
//    "expense" :
//        [
//            { "size" : "小", "price" : "20" }//,
////            { "size" : "中", "price" : "12" }//,
////            { "size" : "大", "price" : "15" }
//        ],
//    "temperature" : ["冷", "热"],//["冷", "热", "加冰"],
//    "introduce" : ["经典原味的奶茶", "真的很不错！"],
//    "productImg" : "/images/product/order.png"
//}

//var productDemo = {
//    "shopId" : "5890888",
//    "shopName" : "鲜芋仙",
//    "subjectName" : "仙草鮮奶茶",
//    "categoryName" : "茶饮",
//    "expense" :
//        [
//            { "size" : "默", "price" : "10" }
//        ],
//    "temperature" : ["冷", "热"],
//    "introduce" : ["仙草為擁有特殊香味的草類植物，養顏美容、預防中暑及感冒。鮮奶營養價值高，所含的維生素是活力泉源，更是骨骼和牙齒構成時不可缺少的主要成分。"],
//    "productImg" : "/images/product/chayin10.png"
//}
var productDemo = {
    "shopId" : "5890888",
    "shopName" : "鲜芋仙",
    "subjectName" : "芋頭牛奶冰",
    "categoryName" : "点心",
    "expense" :
        [
            { "size" : "默", "price" : "20" }
        ],
    "temperature" : ["冷"],
    "introduce" : ["嚴選上等芋頭口感綿密鬆軟，有開胃生津、預防便秘的作用。"],
    "productImg" : "/images/product/bingpin3.png"
}


var addProductTest = function(){
    var product = new Product(productDemo);
    console.log(util.inspect(product));
    product.save(function(err){
        console.log(err);
    });
}
//addProductTest();

var shopDemo = {
    shopId : 5890888,
    shopName : '鲜芋仙',
    branchName : '凯旋路店',
    telephone : '021-32170172',
    introduce : '营业时间：10:30-24:00',
    address : '长宁区凯旋路200号(近龙之梦)',
    website : 'http://www.meetfresh.com.tw',
    shopImg : '/images/shop/xianyuxian.jpg'
}
var addShopTest = function(){
    var shop = new Shop(shopDemo);
    console.log(util.inspect(shop));
    shop.save(function(err){
        console.log(err);
    });
}
//addShopTest();




var test = function() {
    var a = {};
    var array = [];//a.key1;
    a['奶茶'] = array;
    var key1 = '奶茶';
    var key2 = '果汁';

    a[key1].push('红豆奶茶');
    a[key1].push('原味奶茶');
    console.log(util.inspect(a));
    console.log(a[key2]);

}
//test();
