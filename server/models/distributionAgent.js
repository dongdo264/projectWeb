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
      agentName : {
        type: DataTypes.STRING,
        allowNull: false
      }
      ,
      agentAdress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      agentCity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      agentPhone: {
        type: DataTypes.STRING
      },
      avatar: {
        type: DataTypes.BLOB('long'),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N/A'
      }
    }, {
        timestamps: false
    });
    return DistributionAgent;
  }