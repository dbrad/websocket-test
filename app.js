var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

var userIDC = 0;
var Users = {};

function handler (req, res) {
  fs.readFile(__dirname + '/public/' + req.url,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading ' + req.url);
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  Users[socket.id] = { id: socket.id, x: 400, y: 300, lastMsg: "" };

  socket.emit('requestName', { msg: 'Please provide a handle.', id: socket.id });
  for( i in Users ) {
    var user = Users[i];
    io.emit('newUser', user);
  }

  socket.on('usrName', function(data) {
    var user = Users[socket.id];
    user.name = data.name;
    console.log(user.name + "[" + user.id + "] sent usrName signal.");
    io.emit('renderUser', user);
    socket.emit('validated', user);
  });

  socket.on('renderUser', function(data) {
    var user = Users[socket.id];
    console.log(user.name + "[" + user.id + "] sent renderUser signal.");
    user.x = data.x;
    user.y = data.y;
    user.lastMsg = data.lastMsg;
    io.emit('renderUser', user );
  });

  socket.on('changeMsg', function(data) {
    var user = Users[socket.id];
    console.log(user.name + "[" + user.id + "] sent changeMsg signal.");
    user.lastMsg = data.lastMsg;
    io.emit('renderUser', user );
  });

  socket.on('disconnect', function(data) {
    var user = Users[socket.id];
    console.log(user.name + "[" + user.id + "] sent disconnect signal.");
    io.emit('userLeft', {id: socket.id});
    delete Users[socket.id];
  });
});
