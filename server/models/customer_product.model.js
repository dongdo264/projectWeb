module.exports = (db) => {
    const {DataTypes, NOW } = require('sequelize');
    const CustomerProduct = db.define('customer_products', {
      
      // Model attributes are defined here
      model: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      customerCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      batchCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateOfPurchase: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active'
      }
    }, {
        timestamps: false
    });
    return CustomerProduct;
  }