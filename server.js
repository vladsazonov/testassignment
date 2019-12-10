var express             = require('express');
var sockjs              = require('sockjs');

var websocket_multiplex = require('websocket-multiplex');


// 1. Setup SockJS server
var sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js",
    websocket: false};
var service = sockjs.createServer(sockjs_opts);


// 2. Setup multiplexing
var multiplexer = new websocket_multiplex.MultiplexServer(service);

var ann = multiplexer.registerChannel('ann');
ann.on('connection', function(conn) {
    conn.write('Ann says hi!');
    conn.on('data', function(data) {
        conn.write('Ann nods: ' + data);
    });
});

var bob = multiplexer.registerChannel('bob');
bob.on('connection', function(conn) {
    conn.write('Bob doesn\'t agree.');
    conn.on('data', function(data) {
        conn.write('Bob says no to: ' + data);
    });
});

var carl = multiplexer.registerChannel('carl');
carl.on('connection', function(conn) {
    conn.write('Carl says goodbye!');
    // Explicitly cancel connection
    conn.end();
});


// 3. Express server
var app = express.createServer();
service.installHandlers(app, {prefix:'/multiplex'});

var port =  process.env.PORT || 9999;
console.log(' [*] Listening on 0.0.0.0:' + port);
app.listen(port, '0.0.0.0');

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/multiplex.js', function (req, res) {
    res.sendfile(__dirname + '/multiplex.js');
});


// Heroku hack
service.on('connection', function(conn){
    console.log(" [.] open event received");
    var t = setInterval(function(){
        try{
            conn._session.recv.didClose();
        } catch (x) {}
    }, 15000);
    conn.on('close', function() {
        console.log(" [.] close event received");
        clearInterval(t);
        t = null;
    });
});