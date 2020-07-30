const { Sequelize } = require('sequelize');

const sqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'a-baby-step'
};

const sequelize = new Sequelize(
  sqlConfig.database,
  sqlConfig.user,
  sqlConfig.password,
  {
    host: sqlConfig.host,
    dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  }
);

(function() {
  sequelize.sync({ force: true });
})();

module.exports = sequelize;
