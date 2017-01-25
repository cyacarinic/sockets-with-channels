var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/cloud', function(req, res){
  res.sendfile('cloud.html');
});

app.get('/dominios', function(req, res){
  res.sendfile('dominios.html');
});

io.on('connection', function(socket){
  socket.on('room', function(room) {
  	socket.join(room);
  	console.log('a user connected to '+room);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('enviado', function(msg){
  	io.sockets.in(msg.canal).emit('recibido', msg.mensaje);
    socket.emit('recibido', msg);
    console.log('canal: ' + msg.canal);
    console.log('mensaje: ' + msg.mensaje);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
