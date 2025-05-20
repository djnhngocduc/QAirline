const Sequelize = require("sequelize");

const sequelize = new Sequelize(
   'qairline',
   'root',
   '',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Kết nối databaset thành công.');
}).catch((error) => {
   console.error('Kết nối database thất bại', error);
});

module.exports = sequelize;