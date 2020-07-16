const sysUser = require('../table/sysUser');

async function createUserInfo(loginCode, password, type) {
  const result = await sysUser.create({
    loginCode: loginCode,
    password: password,
    type: type,
    version: 0
  });
  return result;
}

exports.createUserInfo = createUserInfo;
