module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes, DATE, NOW} = require('sequelize');
    const Order = db.define('orders', {
      // Model attributes are defined here
      orderCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      orderDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
      },
      comments: {
        type: DataTypes.STRING(4000),
        allowNull: true
      }, 
      orderStatus: {
        type: DataTypes.STRING,
        defaultValue: 'Đang xử lý'
      }
    }, {
        timestamps: false
    });
    return Order;
  }