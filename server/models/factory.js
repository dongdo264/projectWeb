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
      factoryName: {
        type: DataTypes.STRING,
        defaultValue: 'Nhà Máy'
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
    return Factory;
  }