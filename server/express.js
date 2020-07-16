const express = require('express');
const register = require('./router/account/register');
var app = express();

app.use('/login', register);

app.get('/', (req, res) => {
  res.send('hihi');
});

var server = app.listen(8082, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
