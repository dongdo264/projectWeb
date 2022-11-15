module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes} = require('sequelize');
    const DistributionAgent = db.define('distributionagents', {
      // Model attributes are defined here
      agentCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
      },
      agentAdress: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        timestamps: false
    });
    return DistributionAgent;
  }