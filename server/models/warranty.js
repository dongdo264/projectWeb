module.exports = (db) => {
    const {DataTypes, NOW} = require('sequelize');
    const Warranty = db.define('warranty', {
      // Model attributes are defined here
      warrantyCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      wcCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      model: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
      },
      finishAt: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      warrantyStatus: {
        type: DataTypes.STRING(4000),
        allowNull: true
      }
    }, {
        timestamps: false
    });
    return Warranty;
  }