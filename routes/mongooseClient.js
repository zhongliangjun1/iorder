/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-5-23
 * Time: PM8:49
 * To change this template use File | Settings | File Templates.
 */

var dbName = 'iOrder';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/'+dbName);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
    console.log('mongoose connect success, use db : iOrder');
});

exports.mongoose = mongoose;




