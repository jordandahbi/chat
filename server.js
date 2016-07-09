var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
	fs.readFile('./index.html','utf-8',function(error,content){
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end(content);
	});
});

var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){
	socket.emit('connect');
	socket.on('envoi_pseudo',function(pseudo){
		socket.broadcast.emit("envoi_pseudo_2",pseudo);
	});

	socket.on('envoi_message',function(msg,pseudo){
		socket.broadcast.emit('reenvoie_message',msg,pseudo);
		socket.emit('reenvoie_message',msg,pseudo);
	});

	
});


server.listen(8080);