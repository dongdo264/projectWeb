module.exports = (db) => {
    const {DataTypes} = require('sequelize');
    const ProductLine = db.define('productlines', {
      // Model attributes are defined here
      productLine: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      textDescription: {
        type: DataTypes.STRING(4000),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active'
      }
    }, {
        timestamps: false
    });
    return ProductLine;
  }