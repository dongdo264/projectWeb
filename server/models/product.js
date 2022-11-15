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
      productDescription: {
        type: DataTypes.STRING(4000),
        allowNull: false,
      },
      productQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      factoryCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wcCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      productStatus: {
        type: DataTypes.STRING
      }
    }, {
        timestamps: false
    });
    return Product;
  }