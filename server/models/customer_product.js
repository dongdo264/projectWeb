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
      agentCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      dateOfPurchase: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW
      },
      productStatus: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        timestamps: false
    });
    return CustomerProduct;
  }