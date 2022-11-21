module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes} = require('sequelize');
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
      productStatus: {
        type: DataTypes.STRING,
        defaultValue: 'SELLING'
      },
      warrantyPeriod: {
        type: DataTypes.STRING,
        defaultValue: '12 tháng'
      }
    }, {
        timestamps: false
    });
    return Product;
  }