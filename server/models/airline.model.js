module.exports = (sequelize, DataTypes) => {
    const Airline = sequelize.define("Airline", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_code: {
        type: DataTypes.CHAR(3),
        allowNull: true, 
      },
      motto: {
        type: DataTypes.TEXT,
        allowNull: true, 
      },
      establish_date: {
        type: DataTypes.DATE,
        allowNull: true, 
      },
    }, {
      tableName: "airlines", // Tên bảng trong cơ sở dữ liệu
      timestamps: true, // Tự động thêm createdAt và updatedAt
    });
  
    Airline.associate = function (models) {
      // Mối quan hệ với bảng Airplane
      Airline.hasMany(models.Airplane, { foreignKey: "airline_id" }); // Liên kết với bảng Airplane
    };
  
    return Airline;
  };
  