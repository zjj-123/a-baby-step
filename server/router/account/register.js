const express = require('express');
const sysUser = require('../../database/map/sysUser');
const router = express.Router();

router.get('/', function(req, res) {
  console.log('/');
  res.send('Hello World');
});

router.get('/login', function(req, res) {
  console.log('/login');
  sysUser.createUserInfo('123', '123', 1);
  res.send('Hello Login');
});

module.exports = router;
