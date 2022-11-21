module.exports = (db = require('../config/connectDB')) => {
    const {DataTypes, NOW} = require('sequelize');
    const Production = db.define('production', {
      // Model attributes are defined here
      batchCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      factoryCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      MFG: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Đen'
      },
      quantityInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
        timestamps: false
    });
    return Production;
  }