module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes} = require('sequelize');
    const Factory = db.define('factories', {
      // Model attributes are defined here
      factoryCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      factoryAdress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      factoryCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      factoryPhone: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        timestamps: false
    });
    return Factory;
  }