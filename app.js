
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , home = require('./routes/homeService')
  , shop = require('./routes/shopService')
  , schemajs = require('schemajs')
  , menu = require('./routes/menuService')
  , onLineService = require('./routes/onLineService')
  , user = require('./routes/user')
  , http = require('http')
  , socketio = require('socket.io')
  , path = require('path');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.cookieParser());
//  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/index', routes.index);
app.get('/', home.index);
app.get('/home', home.home);
app.get('/shop/:shopId/activity/:tempActivityId', shop.enterShopById);
app.get('/shop/:shopId', shop.enterShopById);
app.get('/getactivity', menu.getActivity);
app.post('/attendactivity', menu.attendActivity);
app.post('/confirmactivity', menu.confirmActivity);
app.post('/addorder', menu.addOrder);
app.post('/removeorder', menu.removeOrder);


app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = socketio.listen(server);

io.sockets.on('connection', function (socket) {
    console.log('connect once');

    var channel;
	var registerName;
    var hostName;
	socket.on('register', function (data) {
        channel = data.activityId;
        registerName = data.userName;
        hostName = data.creatorName;

        onLineService.registe(socket, channel, hostName, registerName);

	});

    socket.on('closeactivity', function(data){
        console.log(data);
        onLineService.closeActivity(channel);
    });

	socket.on('disconnect', function () {
        console.log(registerName + ' disconnect the socket.io ------------------ ');
	});
});
