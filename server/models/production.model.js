module.exports = (db) => {
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
        allowNull: false
      },
      MFG: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Đen',
        primaryKey: true
      },
      quantityProduced: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Active"
      },
      quantitySold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
        timestamps: false
    });
    return Production;
  }