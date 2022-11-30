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
      wcName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      wcAdress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      wcCity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      wcPhone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.BLOB('long'),
      }
    }, {
        timestamps: false
    });
    return WarrantyCenter;
  }