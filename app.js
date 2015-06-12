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
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  Users[socket.id] = { id: socket.id };

  socket.emit('requestName', { msg: 'Please provide a handle.', id: socket.id });
  for( i in Users ) {
    var user = Users[i];
    io.emit('drawCircle', { id: user.id, x: user.x, y: user.y });
  }

  socket.on('usrName', function(data) {
    Users[socket.id]['name'] = data.name;
  });

  socket.on('drawCircle', function(data) {
    Users[socket.id]['x'] = data.x;
    Users[socket.id]['y'] = data.y;
    io.emit('drawCircle', { id: socket.id, x: Users[socket.id]['x'], y: Users[socket.id]['y'] });
  });

  socket.on('disconnect', function(data) {
    io.emit('userLeft', {id: socket.id});
    delete Users[socket.id];
    console.log("user left");
  });
});
