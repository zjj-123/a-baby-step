const express = require('express');
const register = require('./router/account/register');
const app = express();

app.use('/login', register);

app.get('/', (req, res) => {
  res.send('hihi');
});

const server = app.listen(8083, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
