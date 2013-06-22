
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , chat = require('./routes/chat')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/chat/:id([0-9]+)', chat.index);

var server =  http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {
    socket.on('init', function (data) {
        //socket.set('id', data.id);
        socket.join(data.chatId);
    });
    socket.on('msg:send', function (data) {
        console.log(data);
        // var id;
        // socket.get('id', function(err, _id) {
        //     id = _id;
        // });
//        io.sockets.in(data.id).emit("msg:stream", data);
        io.sockets.in(data.chatId).emit("msg:stream", data);
    });
});
