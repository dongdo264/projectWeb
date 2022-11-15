module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes} = require('sequelize');
    const AgentWarehouse = db.define('agentwarehouse', {
      // Model attributes are defined here
      agentCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
      },
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      }, 
      quantityInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
        timestamps: false
    });
    return AgentWarehouse;
  }