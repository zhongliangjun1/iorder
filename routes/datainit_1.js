/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-11-14
 * Time: PM7:28
 * To change this template use File | Settings | File Templates.
 */


var util = require('util');

var mongoose = require('./mongooseClient').mongoose;
var mongooseSchema = require('./mongooseSchema');

var Product = mongoose.model('Product', mongooseSchema.ProductSchema);
var Shop = mongoose.model('Shop', mongooseSchema.ShopSchema);


var shopDemo1 = {
    shopId : 2063266,
    shopName : '快乐柠檬',
    branchName : '长宁龙之梦店',
    telephone : '021-61157540',
    introduce : '营业时间：上午10:00 – 晚上22:00',
    address : '长宁区长宁路1018号龙之梦购物中心B2楼通往地铁2号线走廊中(近凯旋路)',
    website : 'http://www.happy-lemon.com/',
    shopImg : '/images/shop/happy-lemon.jpg'
}
var addShopTest = function(){
    var shop = new Shop(shopDemo1);
    console.log(util.inspect(shop));
    shop.save(function(err){
        console.log(err);
    });
}
addShopTest();

var productDemo1 = [
    {
    "shopId" : 2063266,
    "shopName" : "快乐柠檬",
    "subjectName" : "苹果荔枝纤果茶",
    "categoryName" : "柠檬纤果茶系列",
    "expense" :
        [
            { "size" : "默", "price" : 12 }
        ],
    "temperature" : ["冷"],
    "introduce" : ["鲜苹果肉与荔枝味果汁相遇，清爽的口感、淡雅的香味，前所未有的味蕾新体验！"],
    "productImg" : "/images/product/lm-xianguo1.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "草莓纤果茶",
        "categoryName" : "柠檬纤果茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["鲜草莓冻果、搭配高山青茶融合其口感，加上Q软的水晶晶砖，感受草莓在嘴里跳舞的滋味！"],
        "productImg" : "/images/product/lm-xianguo2.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "菠萝香橙纤果茶",
        "categoryName" : "柠檬纤果茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["鲜菠萝冻果，口口酸甜，淡淡橙香，结合高山青茶，茶香与果香让您一口接一口！"],
        "productImg" : "/images/product/lm-xianguo3.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "养乐多水果纤果茶",
        "categoryName" : "柠檬纤果茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 14 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["养乐多加上多种冻果（苹果、草莓、柠檬、青金桔、菠萝粒等），口感丰富，值得品尝。"],
        "productImg" : "/images/product/lm-xianguo4.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "柠檬绿茶 ",
        "categoryName" : "柠檬纤果茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 7 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["加入新鲜柠檬片现调而成，具有清新柠檬香的茉香绿茶。"],
        "productImg" : "/images/product/lm-xianguo5.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "柠檬青茶",
        "categoryName" : "柠檬纤果茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 8 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["加入新鲜柠檬片现调而成,来自台湾高山的乌龙茶。"],
        "productImg" : "/images/product/lm-xianguo6.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "金桔柠檬茶",
        "categoryName" : "健康柠檬系列",
        "expense" :
            [
                { "size" : "默", "price" : 9 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["新鲜柠檬汁与新鲜金桔的完美混搭，再加上嚼劲十足的水晶椰果，使整杯饮品鲜·酸可口，具有嚼趣！"],
        "productImg" : "/images/product/lm-xianguo7.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "柠檬C芦荟优多",
        "categoryName" : "健康柠檬系列",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["柠檬口味中加上乳酸菌，酸甜可口，是一款健康饮品。"],
        "productImg" : "/images/product/lm-xianguo8.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "柠檬水晶薄荷蜜",
        "categoryName" : "健康柠檬系列",
        "expense" :
            [
                { "size" : "默", "price" : 7 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["以柠檬味为主，略带薄荷味的饮料，加入水晶椰果，口感清凉，炎夏必喝。"],
        "productImg" : "/images/product/lm-xianguo9.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "柠檬冰冻",
        "categoryName" : "健康柠檬系列",
        "expense" :
            [
                { "size" : "默", "price" : 7 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["用蜂蜜和柠檬汁调制的饮品，是一款柠檬味的饮料，清爽解渴。"],
        "productImg" : "/images/product/lm-xianguo10.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "柠檬弹珠",
        "categoryName" : "健康柠檬系列",
        "expense" :
            [
                { "size" : "默", "price" : 8 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["柠檬味的饮料，搭配上爽口的原味海藻颗粒，粒粒酸甜可口。"],
        "productImg" : "/images/product/lm-xianguo11.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "翡翠柠檬菠萝冻",
        "categoryName" : "健康柠檬系列",
        "expense" :
            [
                { "size" : "默", "price" : 9 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["用新鲜柠檬片和菠萝汁等原料调制的饮品，加上水晶椰果，香甜清爽，口味丰富。"],
        "productImg" : "/images/product/lm-xianguo12.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "养乐多柠檬绿茶",
        "categoryName" : "健康柠檬系列",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["柠檬口味的茉香绿茶中加上养乐多，酸甜口感，手工摇制，是一款健康又时尚的饮品。"],
        "productImg" : "/images/product/lm-xianguo13.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "岩盐芝士可可",
        "categoryName" : "岩盐芝士系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["香浓可可，加上快乐柠檬秘制的芝士奶盖酱调制的创意饮品，口感浓郁。"],
        "productImg" : "/images/product/lm-xianguo14.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "岩盐芝士青茶",
        "categoryName" : "岩盐芝士系列",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["以高山乌龙茶，加上快乐柠檬秘制的芝士奶盖酱调制的创意饮品， 口感清新。"],
        "productImg" : "/images/product/lm-xianguo15.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "岩盐芝士绿茶",
        "categoryName" : "岩盐芝士系列",
        "expense" :
            [
                { "size" : "默", "price" : 9 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["以茉香绿茶，加上快乐柠檬秘制的芝士奶盖酱调制的创意饮品，口感清新。"],
        "productImg" : "/images/product/lm-xianguo16.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "甘菊柚香鲜萃茶",
        "categoryName" : "原味纯泡茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["柚菊清香绿茶茶包用漩茶机高速漩制，搭配新鲜水果片，温顺甘醇，健康宜人。"],
        "productImg" : "/images/product/lm-xianguo17.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "柠檬青柠鲜萃茶",
        "categoryName" : "原味纯泡茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["淡黄的柠檬与浅绿色莱姆完美的结合，清香宜人的味道。"],
        "productImg" : "/images/product/lm-xianguo18.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "桂花荔枝鲜萃茶",
        "categoryName" : "原味纯泡茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["桂花淡雅的香气与荔枝甘甜的口感，茶味清香，口感顺滑，带出绿茶不同的风味。"],
        "productImg" : "/images/product/lm-xianguo19.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "草莓普洱鲜萃茶",
        "categoryName" : "原味纯泡茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["普洱醇厚回甘的茶感，独特的陈年香与草莓谱出的幸福滋味。"],
        "productImg" : "/images/product/lm-xianguo20.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "红梅苹果鲜萃茶",
        "categoryName" : "原味纯泡茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["蔓越莓苹果茶包，搭配新鲜水果片，双重果味创造出清新独特无法抵挡的口感，健康美味。"],
        "productImg" : "/images/product/lm-xianguo21.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "芒橙优多冰沙",
        "categoryName" : "冰沙系列",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["芒果、鲜橙和优格调制而成的香甜冰沙，具有浓郁的热带风情，果香诱人。"],
        "productImg" : "/images/product/lm-xianguo22.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "养乐多柠檬冰沙",
        "categoryName" : "冰沙系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["柠檬、养乐多和优格调制而成的冰沙，口味酸甜，清新怡人。"],
        "productImg" : "/images/product/lm-xianguo23.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "红豆抹绿冰沙",
        "categoryName" : "冰沙系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷"],
        "introduce" : ["清新的日式抹茶和牛奶调制而成的冰沙，是炎炎夏日首选。"],
        "productImg" : "/images/product/lm-xianguo24.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "OREO特浓可可",
        "categoryName" : "多口感鲜品系列",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["香醇的牛奶可可，融入香脆可口的OREO饼干与绵密的蛋糕忌廉，口感浓郁至极。"],
        "productImg" : "/images/product/lm-xianguo25.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "OREO特浓抹绿",
        "categoryName" : "多口感鲜品系列",
        "expense" :
            [
                { "size" : "默", "price" : 15 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["牛奶与抹茶搭配，口感浓郁、醇香，再加入OREO脆，增加香浓的口感。"],
        "productImg" : "/images/product/lm-xianguo26.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "大满贯奶茶仙草冻",
        "categoryName" : "多口感鲜品系列",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["以烧仙草为主与原味奶茶搭配，小珍珠与椰果增加更丰富的口感。"],
        "productImg" : "/images/product/lm-xianguo27.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "布丁可可",
        "categoryName" : "多口感鲜品系列",
        "expense" :
            [
                { "size" : "默", "price" : 9 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["香浓的可可搭配上香滑的鸡蛋布丁，醇香浓郁。"],
        "productImg" : "/images/product/lm-xianguo28.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "芋圆小丸子可可",
        "categoryName" : "多口感鲜品系列",
        "expense" :
            [
                { "size" : "默", "price" : 12 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["香浓顺滑的牛奶可可，口感浓郁，搭配上Q软嚼劲的小芋圆。"],
        "productImg" : "/images/product/lm-xianguo29.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "芋圆小丸子抹茶绿",
        "categoryName" : "多口感鲜品系列",
        "expense" :
            [
                { "size" : "默", "price" : 13 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["香滑的牛奶与抹茶口感丰富，加入小芋圆增加口感及嚼趣。"],
        "productImg" : "/images/product/lm-xianguo30.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "葡萄柚芦荟绿茶",
        "categoryName" : "多口感鲜品系列",
        "expense" :
            [
                { "size" : "默", "price" : 9 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["绿茶中加上清香葡萄柚，搭配芦荟果肉，口味酸甜，清爽怡人。"],
        "productImg" : "/images/product/lm-xianguo31.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "红豆布丁抹绿",
        "categoryName" : "多口感鲜品系列",
        "expense" :
            [
                { "size" : "默", "price" : 11 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["清新的抹茶中融入沙沙的红豆，搭配上香滑的鸡蛋布丁，口感丰富。"],
        "productImg" : "/images/product/lm-xianguo32.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "红豆芋圆仙草冻",
        "categoryName" : "多口感鲜品系列",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["以仙草冻为主，搭配上绵密松软的蜜红豆与嚼劲十足的芋圆，口感丰富。"],
        "productImg" : "/images/product/lm-xianguo33.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "OREO曲奇奶茶",
        "categoryName" : "经典醇香奶茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["快乐柠檬今年的独创产品，将OREO曲奇融合丝滑的奶茶，丰富浓郁加上奇趣的口感，百尝不腻！"],
        "productImg" : "/images/product/lm-xianguo34.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "大满贯布丁奶茶",
        "categoryName" : "经典醇香奶茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 9 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["香醇的奶茶搭配布丁、珍珠、水晶椰果、丰富果肉，多重享受。奶茶的口感也更加柔滑细腻。"],
        "productImg" : "/images/product/lm-xianguo35.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "布丁奶茶王",
        "categoryName" : "经典醇香奶茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 9 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["精选高山红茶，经过严谨的冲泡比例，使滋味浓强，茶韵幽香，加入100%新鲜牛奶，口感顺滑，搭配上布丁、珍珠、水晶椰果，丰富的嚼料使奶茶再升一级。"],
        "productImg" : "/images/product/lm-xianguo36.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "芋圆小丸子奶茶",
        "categoryName" : "经典醇香奶茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["香浓的原味奶茶搭配上芋香Q软的小芋圆，口感顺滑。"],
        "productImg" : "/images/product/lm-xianguo37.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "烤珍珠奶茶",
        "categoryName" : "经典醇香奶茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 9 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["用高品质的炭烤煎茶为茶底，调制出来的奶茶，具有特殊的烤香味和浓郁的奶香味，清爽不腻。"],
        "productImg" : "/images/product/lm-xianguo38.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "蛋糕珍珠奶茶",
        "categoryName" : "经典醇香奶茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["奶香滑润，口感馥密，再搭配Q感大珍珠，双重美味，不容错过。"],
        "productImg" : "/images/product/lm-xianguo39.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "黑珍珠奶茶",
        "categoryName" : "经典醇香奶茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 8 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["在鲜香奶茶中加入软Q的小珍珠，搭配原味奶茶，双重美味，不容错过。"],
        "productImg" : "/images/product/lm-xianguo40.png"
    },
    {
        "shopId" : 2063266,
        "shopName" : "快乐柠檬",
        "subjectName" : "红豆布丁烤奶茶",
        "categoryName" : "经典醇香奶茶系列",
        "expense" :
            [
                { "size" : "默", "price" : 10 }
            ],
        "temperature" : ["冷","热"],
        "introduce" : ["原味的烤茶中加入红豆和鸡蛋布丁，能品尝到红豆沙沙的感觉，口感丰富跃动，回味无穷。"],
        "productImg" : "/images/product/lm-xianguo41.png"
    }
];

var addProduct = function(){
    for(var i=0 ; i<productDemo1.length; i++){
        var product = new Product(productDemo1[i]);
        console.log(util.inspect(product));
        product.save(function(err){
            console.log(err);
        });
    }
}
//addProduct();