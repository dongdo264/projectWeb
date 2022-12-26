module.exports = (db) => {
    const {DataTypes, NOW} = require('sequelize');
    const FaultyProduct = db.define('faultyproducts', {
      // Model attributes are defined here
      errCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      model: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      wcCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      factoryCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
      },
      status: {
        type: DataTypes.STRING(4000),
        allowNull: true
      },
      note: {
        type: DataTypes.STRING(4000),
        allowNull: false,
        defaultValue: 'Không'
      },
    }, {
        timestamps: false
    });
    return FaultyProduct;
  }