/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-11-15
 * Time: PM8:23
 * To change this template use File | Settings | File Templates.
 */

var util = require('util');

var mongoose = require('./mongooseClient').mongoose;
var mongooseSchema = require('./mongooseSchema');

var DIY = mongoose.model('DIY', mongooseSchema.DIYSchema);


var DIYdemos = [
    {
        'itemName' : '鳄梨牛奶',
        'itemImg' : '/images/DIY/1077864.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/1077864/'
    },
    {
        'itemName' : '香芒lassi',
        'itemImg' : '/images/DIY/1071005.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/1071005/'
    },
    {
        'itemName' : '神奇去脂瘦身汤',
        'itemImg' : '/images/DIY/12085.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/12085/'
    },
    {
        'itemName' : '普洱咖啡奶茶',
        'itemImg' : '/images/DIY/1004061.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/1004061/'
    },
    {
        'itemName' : '苹果醋',
        'itemImg' : '/images/DIY/100112.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/100112/'
    },
    {
        'itemName' : '奶香南瓜汁',
        'itemImg' : '/images/DIY/29922.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/29922/'
    },
    {
        'itemName' : '椰浆可可',
        'itemImg' : '/images/DIY/1081962.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/1081962/'
    },
    {
        'itemName' : '红粉雪碧',
        'itemImg' : '/images/DIY/1011171.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/1011171/'
    },
    {
        'itemName' : '锅煮奶茶',
        'itemImg' : '/images/DIY/259753.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/259753/'
    },
    {
        'itemName' : '古巴鸡尾酒mojito',
        'itemImg' : '/images/DIY/265771.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/265771/'
    },
    {
        'itemName' : '盆栽酸奶',
        'itemImg' : '/images/DIY/1045949.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/1045949/'
    },
    {
        'itemName' : '焦糖奶茶',
        'itemImg' : '/images/DIY/1003620.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/1003620/'
    },
    {
        'itemName' : '柠檬薄荷冰茶',
        'itemImg' : '/images/DIY/1100842.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/1100842/'
    },
    {
        'itemName' : '自制葡萄酒',
        'itemImg' : '/images/DIY/109843.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/109843/'
    },
    {
        'itemName' : '胡萝卜草莓柠檬饮',
        'itemImg' : '/images/DIY/1087965.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/1087965/'
    },
    {
        'itemName' : '青金桔柠檬汽水',
        'itemImg' : '/images/DIY/100022178.1.jpg',
        'itemHref' : 'http://www.xiachufang.com/recipe/100022178/'
    }
];


var addDIY = function(){

    for(var i=0 ; i<DIYdemos.length; i++){
        var diy = new DIY(DIYdemos[i]);
        console.log(util.inspect(diy));
        diy.save(function(err){
            console.log(err);
        });
    }

}
//addDIY();