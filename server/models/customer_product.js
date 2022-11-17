module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes, NOW } = require('sequelize');
    const CustomerProduct = db.define('customer_products', {
      
      // Model attributes are defined here
      userCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      dateOfPurchase: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
      },
      productStatus: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        timestamps: false
    });
    return CustomerProduct;
  }