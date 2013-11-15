/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-10-6
 * Time: PM7:10
 * To change this template use File | Settings | File Templates.
 */

var util = require('util');

var fs = require('fs');

var mongoose = require('./mongooseClient').mongoose;
var mongooseSchema = require('./mongooseSchema');

var DIY = mongoose.model('DIY', mongooseSchema.DIYSchema);

exports.home = function(req, res){

    var homePage = fs.readFileSync('./views/home.html');
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(homePage);

};


// check 所有模块的prepare情况，所有人均准备OK，最后一个调用此函数的即为最后一个finish的，负责render页面
var checkAll2Render = function(req, res, modulePrepareStatus, moduleData){
    var isAllOK = true;
    for(var moduleKey in modulePrepareStatus){
        if(modulePrepareStatus.hasOwnProperty(moduleKey)){
            if(modulePrepareStatus[moduleKey] === 'preparing'){
                isAllOK = false;
            }
        }
    }
    if(isAllOK){  // render
        res.render('home', {'modulePrepareStatus':modulePrepareStatus, 'moduleData':moduleData});
    }
}


exports.index = function(req, res){

    var modulePrepareStatus = {  // unFinish:preparing  Finished:ok|failure|nothing
        'one' : 'preparing',
        'DIY' : 'preparing'
    };
    var moduleData = {
        'one' : null,
        'DIY' : null
    };

    modulePrepareStatus.one = 'ok';


    var query = DIY.find().limit(16).sort('-addTime');
    query.select('itemName itemImg itemHref');
    query.exec(function(err, diys){
        if(err){
            modulePrepareStatus.DIY = 'failure';
        }else{

            if(diys){
                moduleData.DIY = diys;
                modulePrepareStatus.DIY = 'ok';
            }else{
                modulePrepareStatus.DIY = 'nothing';
            }

        }
        checkAll2Render(req, res, modulePrepareStatus, moduleData);
    });

}








var DIYdemo = {
    'itemName' : '鳄梨牛奶',
    'itemImg' : '/images/DIY/1077864.1.jpg',
    'itemHref' : 'http://www.xiachufang.com/recipe/1077864/'
}

var addDIY = function(){
    var diy = new DIY(DIYdemo);
    console.log(util.inspect(diy));
    diy.save(function(err){
        console.log(err);
    });
}
//addDIY();







