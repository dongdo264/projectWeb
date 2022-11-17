module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes} = require('sequelize');
    const OrderDetail = db.define('orderdetails', {
      // Model attributes are defined here
      orderCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantityOrdered: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
        timestamps: false
    });
    return OrderDetail;
  }