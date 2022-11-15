module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes} = require('sequelize');
    const WarrantyCenter = db.define('warrantycenters', {
      // Model attributes are defined here
      wcCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
      },
      wcAdress: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        timestamps: false
    });
    return WarrantyCenter;
  }