const Sequelize = require("sequelize");

const sequelize = new Sequelize(
   process.env.DATABASE_NAME,
   process.env.DATABASE_USERNAME,
   process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Kết nối databaset thành công.');
}).catch((error) => {
   console.error('Kết nối database thất bại', error);
});

module.exports = sequelize;