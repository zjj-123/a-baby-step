const Sequelize = require('sequelize');
const sequelize = require('../sqlConfig');

var sysUser = sequelize.define(
  'sys_user',
  {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    loginCode: Sequelize.STRING(20), // 用户账号
    userName: Sequelize.STRING(20), // 用户昵称
    password: Sequelize.STRING(20), // 密码
    avatar: Sequelize.STRING(255), // 头像地址
    intro: Sequelize.STRING(255), // 简介
    state: Sequelize.INTEGER, // 状态
    type: Sequelize.INTEGER, // 账户类型
    createdAt: Sequelize.DATE, // 创建时间
    updatedAt: Sequelize.DATE, // 更新时间
    version: Sequelize.BIGINT
  },
  {
    timestamps: true // 默认时间戳
  }
);

module.exports = sysUser;
