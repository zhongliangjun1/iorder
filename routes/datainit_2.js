/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-11-15
 * Time: AM12:24
 * To change this template use File | Settings | File Templates.
 */

var util = require('util');

var mongoose = require('./mongooseClient').mongoose;
var mongooseSchema = require('./mongooseSchema');

var Product = mongoose.model('Product', mongooseSchema.ProductSchema);
var Shop = mongoose.model('Shop', mongooseSchema.ShopSchema);


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

var productDemo = [
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "仙草1號",
        "categoryName" : "仙草系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["綠豆+蓮子+珍珠"],
        "productImg" : "/images/product/xiancao1.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "仙草2號",
        "categoryName" : "仙草系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["地瓜+薏仁+珍珠"],
        "productImg" : "/images/product/xiancao2.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "仙草3號",
        "categoryName" : "仙草系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["紅豆+花生+珍珠"],
        "productImg" : "/images/product/xiancao3.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "仙草4號",
        "categoryName" : "仙草系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["芋頭+紅豆+珍珠"],
        "productImg" : "/images/product/xiancao4.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "仙草5號",
        "categoryName" : "仙草系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["花豆+黑粉粿+珍珠"],
        "productImg" : "/images/product/xiancao5.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "仙草6號",
        "categoryName" : "仙草系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["粉粿+粉條+珍珠"],
        "productImg" : "/images/product/xiancao6.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "招牌燒仙草",
        "categoryName" : "仙草系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["小芋圓+花豆+珍珠"],
        "productImg" : "/images/product/xiancao7.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "鮮芋仙招牌",
        "categoryName" : "仙草系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["仙草凍+仙草冰沙+芋圓+鮮奶油"],
        "productImg" : "/images/product/xiancao8.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "芋圓1號",
        "categoryName" : "芋圓系列",
        "expense" :
            [
                { "size" : "默", "price" : 18 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["綠豆+蓮子+珍珠"],
        "productImg" : "/images/product/yuyuan1.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "芋圓2號",
        "categoryName" : "芋圓系列",
        "expense" :
            [
                { "size" : "默", "price" : 18 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["地瓜+薏仁+珍珠"],
        "productImg" : "/images/product/yuyuan2.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "芋圓3號",
        "categoryName" : "芋圓系列",
        "expense" :
            [
                { "size" : "默", "price" : 18 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["紅豆+花生+珍珠"],
        "productImg" : "/images/product/yuyuan3.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "芋圓4號",
        "categoryName" : "芋圓系列",
        "expense" :
            [
                { "size" : "默", "price" : 18 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["芋頭+紅豆+珍珠"],
        "productImg" : "/images/product/yuyuan4.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "芋圓5號",
        "categoryName" : "芋圓系列",
        "expense" :
            [
                { "size" : "默", "price" : 18 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["花豆+黑粉粿+珍珠"],
        "productImg" : "/images/product/yuyuan5.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "芋圓6號",
        "categoryName" : "芋圓系列",
        "expense" :
            [
                { "size" : "默", "price" : 18 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["粉粿+粉條+珍珠"],
        "productImg" : "/images/product/yuyuan6.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "花豆豆花",
        "categoryName" : "豆花",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["花豆富含膳食纖維，可促進消化，預防便祕。豆花富含蛋白質、鈣、卵磷脂等，營養價值高。"],
        "productImg" : "/images/product/douhua1.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "珍珠豆花",
        "categoryName" : "豆花",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["豆花富含蛋白質、鈣、卵磷脂等，營養價值高。搭配彈Q剔透的珍珠，口感極佳。"],
        "productImg" : "/images/product/douhua2.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "花生豆花",
        "categoryName" : "豆花",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["花生俗稱「長生果」，有助於記憶力提升、延緩老化。豆花富含蛋白質、鈣、卵磷脂等，營養價值高。"],
        "productImg" : "/images/product/douhua3.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "紅豆豆花",
        "categoryName" : "豆花",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["紅豆富含高量鐵質，可促進血液循環及增加抵抗力。豆花富含蛋白質、鈣、卵磷脂等，營養價值高。"],
        "productImg" : "/images/product/douhua4.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "綠豆豆花",
        "categoryName" : "豆花",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["綠豆具有消暑止渴、安定精神、補充元氣等益處。豆花富含蛋白質、鈣、卵磷脂等，營養價值高。"],
        "productImg" : "/images/product/douhua5.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "薏仁豆花",
        "categoryName" : "豆花",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["薏仁含有豐富蛋白質，有益於肌膚白皙光滑。豆花富含蛋白質、鈣、卵磷脂等，營養價值高。"],
        "productImg" : "/images/product/douhua6.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "番薯豆花",
        "categoryName" : "豆花",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["地瓜口感香甜鬆軟，熱量及膽固醇含量低、纖維質高，有利於體重控制。豆花富含蛋白質、鈣、卵磷脂等，營養價值高。"],
        "productImg" : "/images/product/douhua7.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "芋頭豆花",
        "categoryName" : "豆花",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["嚴選上等芋頭口感綿密鬆軟，有開胃生津、預防便秘的作用。豆花富含蛋白質、鈣、卵磷脂等，營養價值高。"],
        "productImg" : "/images/product/douhua8.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "蓮子豆花",
        "categoryName" : "豆花",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["蓮子具有止渴去熱、益胃安神等益處。豆花富含蛋白質、鈣、卵磷脂等，營養價值高。"],
        "productImg" : "/images/product/douhua9.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "芋圓豆花",
        "categoryName" : "豆花",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["嚴選上等芋頭，遵循傳統古法製成芋圓，有開胃生津、預防便秘的作用。豆花富含蛋白質、鈣、卵磷脂等，營養價值高。"],
        "productImg" : "/images/product/douhua10.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "古味紅茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 7 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["採漢方茶飲烘培技術，無苦澀味，保留最醇厚的紅茶香氣。"],
        "productImg" : "/images/product/chayin1.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "茶花綠茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 7 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["採漢方茶飲烘培技術，無苦澀味，保留最醇厚的茶香。"],
        "productImg" : "/images/product/chayin2.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "古味奶茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 9 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["採漢方茶飲烘培技術，無苦澀味，保留最醇厚的茶香。"],
        "productImg" : "/images/product/chayin3.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "茶花奶綠",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 9 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["採漢方茶飲烘培技術，無苦澀味，保留最醇厚的茶香。"],
        "productImg" : "/images/product/chayin4.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "仙草干茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 7 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["仙草為擁有特殊香味的草類植物，養顏美容、預防中暑及感冒。"],
        "productImg" : "/images/product/chayin5.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "仙草凍奶茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["仙草為擁有特殊香味的草類植物，養顏美容、預防中暑及感冒。"],
        "productImg" : "/images/product/chayin6.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "仙草鮮奶凍",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["仙草為擁有特殊香味的草類植物，養顏美容、預防中暑及感冒。鮮奶營養價值高，所含的維生素是活力泉源，更是骨骼和牙齒構成時不可缺少的主要成分。"],
        "productImg" : "/images/product/chayin7.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "珍珠鮮奶茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["彈Q剔透的珍珠，佐以高品質純鮮奶與上等紅茶，好喝又健康。鮮奶營養價值高，所含的維生素是活力泉源，更是骨骼和牙齒構成時不可缺少的主要成分。"],
        "productImg" : "/images/product/chayin8.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "珍珠鮮奶綠",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["彈Q剔透的珍珠，佐以高品質純鮮奶與上等紅茶，好喝又健康。鮮奶營養價值高，所含的維生素是活力泉源，更是骨骼和牙齒構成時不可缺少的主要成分。"],
        "productImg" : "/images/product/chayin9.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "仙草鮮奶茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷", "热"],
        "introduce" : ["仙草為擁有特殊香味的草類植物，養顏美容、預防中暑及感冒。鮮奶營養價值高，所含的維生素是活力泉源，更是骨骼和牙齒構成時不可缺少的主要成分。"],
        "productImg" : "/images/product/chayin10.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "冬瓜鮮奶茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["遵循古法製造，甜而不膩的冬瓜清香，為最佳解燥消腫的養生茶。鮮奶營養價值高，所含的維生素是活力泉源，更是骨骼和牙齒構成時不可缺少的主要成分。"],
        "productImg" : "/images/product/chayin11.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "古味冬瓜茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 7 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["遵循古法製造，甜而不膩的冬瓜清香，為最佳解燥消腫的養生茶。檸檬含有豐富維他命Ｃ，是養顏美容聖品。"],
        "productImg" : "/images/product/chayin12.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "冬瓜檸檬茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 8 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["遵循古法製造，甜而不膩的冬瓜清香，為最佳解燥消腫的養生茶。"],
        "productImg" : "/images/product/chayin13.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "冬瓜仙草凍",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["遵循古法製造，甜而不膩的冬瓜清香，為最佳解燥消腫的養生茶。仙草為擁有特殊香味的草類植物，養顏美容、預防中暑及感冒。"],
        "productImg" : "/images/product/chayin14.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "小芋圓冬瓜茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["遵循古法製造，甜而不膩的冬瓜清香，為最佳解燥消腫的養生茶。嚴選上等芋頭，獨家研發小芋圓，有開胃生津、預防便秘的作用。"],
        "productImg" : "/images/product/chayin15.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "QQ冬瓜茶",
        "categoryName" : "茶饮",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["小芋圓+粉條"],
        "productImg" : "/images/product/chayin16.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "傳統粉粿冰",
        "categoryName" : "冰品系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["珍珠+芋圓+紅豆"],
        "productImg" : "/images/product/bingpin1.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "紅豆牛奶冰",
        "categoryName" : "冰品系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["紅豆富含高量鐵質，可促進血液循環及增加抵抗力。"],
        "productImg" : "/images/product/bingpin2.png"
    },
    {
        "shopId" : 5890888,
        "shopName" : "鲜芋仙",
        "subjectName" : "芋頭牛奶冰",
        "categoryName" : "冰品系列",
        "expense" :
            [
                { "size" : "默", "price" : 20 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["嚴選上等芋頭口感綿密鬆軟，有開胃生津、預防便秘的作用。"],
        "productImg" : "/images/product/bingpin3.png"
    }

]


var addProduct = function(){
    for(var i=0 ; i<productDemo.length; i++){
        var product = new Product(productDemo[i]);
        console.log(util.inspect(product));
        product.save(function(err){
            console.log(err);
        });
    }
}
addProduct();