module.exports = (db) => {
    const {DataTypes, NOW} = require('sequelize');
    const Product = db.define('products', {
      // Model attributes are defined here
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      productLine: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      warrantyPeriod: {
        type: DataTypes.STRING,
        defaultValue: '60 tháng'
      },
      avatar: {
        type: DataTypes.BLOB('long'),
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active'
      },
      createAt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: NOW
      }
    }, {
        timestamps: false
    });
    return Product;
  }