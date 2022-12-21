module.exports = (db) => {
    const {DataTypes, NOW} = require('sequelize');
    const Order = db.define('orders', {
      // Model attributes are defined here
      orderNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
      },
      agentCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
      factoryCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      orderDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
      }
    }, {
        timestamps: false
    });
    return Order;
  }